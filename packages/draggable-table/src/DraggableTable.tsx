import { TableProps } from 'antd/lib/table'
import { cloneDeep } from 'lodash'
import * as React from 'react';
import { useEffect, useState } from 'react';
// @ts-ignore
import ReactDragListView from 'react-drag-listview';
import Table from './Table'

let defaultGetUniqueKeys = (storageKey): Promise<string[]> => {
  return Promise.resolve(JSON.parse(localStorage.getItem(storageKey)))
}

let defaultSetUniqueKeys = (storageKey, uniqueKeys: string[]) => {
  localStorage.setItem(storageKey, JSON.stringify(uniqueKeys))
}

const setGlobalConfig =
  ({
     getColumnsKeys: getUniqueKeys = defaultGetUniqueKeys,
     setColumnsKeys: setUniqueKeys = defaultSetUniqueKeys
   }) => {
    defaultGetUniqueKeys = getUniqueKeys
    defaultSetUniqueKeys = setUniqueKeys
  }

/**
 * 可拖拽表格组件Props
 * 注意，Columns参数中，key 必须唯一且必传
 */
type DraggableTableProps<RecordType> = TableProps<RecordType> & {
  /**
   * 存储键名
   */
  storageKey: string,

  /**
   * 唯一列标识
   */
  uniqueKey?: string
}

/**
 * 可拖拽表格组件
 *
 * @param storageKey 持久化标识Key
 * @param uniqueKey 唯一列标识
 * @param props
 * @constructor
 */
function DraggableTable<RecordType extends object>
({
   storageKey,
   uniqueKey = 'key',
   ...props
 }: DraggableTableProps<RecordType>) {
  const [columns, setColumns] = useState<typeof props.columns>()

  /**
   * 获取持久化保存表格排序数据
   */
  const getUniqueKeys = defaultGetUniqueKeys

  /**
   * 持久化保存表头排序数据
   *
   * @param storageKey
   * @param columnKeys
   */
  const setUniqueKeys = defaultSetUniqueKeys

  useEffect(() => {
    console.log('useEffect', columns)
  }, [columns])

  /**
   * 初始化表头
   */
  useEffect(() => {
    if (!storageKey) {
      throw new Error("持久化标识必须传入")
    }

    // 获取表头排序数据
    getUniqueKeys(storageKey).then((uniqueKeys) => {
      const fixedColumns = props.columns.filter(item => item.fixed)
      const normalColumns = props.columns.filter(item => !item.fixed)
      const cloneColumns = fixedColumns

      // 处理新增列情况
      for (const column of normalColumns) {
        const hasColumnKeyInStorage = uniqueKeys.findIndex(key => key === column[uniqueKey]) > -1

        // 如果持久存储中不存在新增列，则添加到表头中
        if (!hasColumnKeyInStorage) {
          cloneColumns.push(column)
        }
      }

      // 处理删除列情况并重新排序
      for (const columnKey of uniqueKeys) {
        const column = normalColumns.find((column) => column?.[uniqueKey] === columnKey)

        // 如果持久存储中存在删除列，则从表头中移除
        if (!column) {
          delete uniqueKeys[columnKey]
        } else {
          cloneColumns.push(column)
        }
      }

      setColumns(cloneColumns)
    }).catch(() => {
      setColumns(props.columns)
    })
  }, [
    storageKey,
    props.columns
  ])

  /**
   * 响应拖拽事件
   *
   * @param fromIndex
   * @param toIndex
   */
  const handleDragColumnsEnd = (fromIndex: number, toIndex: number) => {
    const cloneColumns = cloneDeep(columns)
    const item = cloneColumns.splice(fromIndex - +!!props.rowSelection, 1)[0];
    cloneColumns.splice(toIndex - +!!props.rowSelection, 0, item);

    const uniqueKeys: any[] = []
    cloneColumns.forEach((column) => {
      if (column.fixed) {
        return
      }

      if (!column?.[uniqueKey]) {
        throw new Error(`属性${ uniqueKey }必须指定值`)
      }

      if (uniqueKeys.includes(column?.[uniqueKey])) {
        throw new Error(`属性${ uniqueKey }必须唯一`)
      }

      uniqueKeys.push(column?.[uniqueKey])
    })

    setUniqueKeys(storageKey, uniqueKeys)
    setColumns(cloneColumns);
  }

  return (
    <ReactDragListView.DragColumn
      onDragEnd={ handleDragColumnsEnd }
      nodeSelector="th"
    >
      <Table { ...props } columns={ columns }/>
    </ReactDragListView.DragColumn>
  );
}

DraggableTable.config = setGlobalConfig

export default DraggableTable;
