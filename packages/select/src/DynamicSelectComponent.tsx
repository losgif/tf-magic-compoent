import * as React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Empty, Icon, Select, Spin } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select'
import styles from './index.less'
import _ from 'lodash'
import { SelectComponentOption } from './constants'

/**
 * 选项组件Props类型声明
 */
type DynamicSelectComponentProps = {
  options?: SelectComponentOption[]
  loadData?: ((text: SelectValue) => Promise<SelectComponentOption[]>)
  value?: SelectValue
} & SelectProps

const NotFoundComponent = (props: { loading: boolean }) => (
  props.loading ? (
    <div className={ styles.loading }>
      <Spin tip={ '加载中...' } indicator={ (<Icon type="loading" style={ { fontSize: 24 } } spin/>) }/>
    </div>
  ) : <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE }/>
)

const DynamicSelectComponent: React.FC<DynamicSelectComponentProps> = (props) => {
  /**
   * 默认配置
   */
  const defaultConfig: SelectProps = {
    allowClear: true,
    style: {
      height: '32px',
      width: '100%'
    }
  }

  let { loadData: propsLoadData, options: propsOptions, showSearch, ...restProps } = props;

  const [config, setConfig] = useState<SelectProps>()
  const [options, setOptions] = useState<SelectComponentOption[]>()
  const loadingRef = useRef<boolean>(false)

  useEffect(() => {
    setOptions(propsOptions)
  }, [])

  useEffect(() => {
    /**
     * 动态搜索组件特殊配置
     */
    if (propsLoadData) {
      let dynamicConfig: any = {
        ...defaultConfig,
        ...restProps,
        loading: loadingRef.current,
        notFoundContent: (<NotFoundComponent loading={ loadingRef.current }/>)
      }

      if (showSearch) {
        // 搜索组件对应配置
        dynamicConfig = {
          ...dynamicConfig,
          defaultActiveFirstOption: false,
          filterOption: false,
          showArrow: false,
          showSearch,
          onSearch
        }
      } else {
        // 非搜索组件直接加载数据
        loadData()
      }
      setConfig(dynamicConfig)
    }
  }, [
    propsLoadData,
    showSearch
  ])

  /**
   * 搜索选择组件onSearch处理方法
   *
   * @param text
   */
  const onSearch = (text: string) => (_.debounce(() => loadData(text), 500) as Function)()

  /**
   * 动态搜索组件获取可选项方法
   *
   * @param text
   */
  const loadData = (text = undefined) => {
    if (!props.loadData) {
      return
    }

    setOptions([])
    loadingRef.current = true

    props.loadData(text).then((options) => {
      loadingRef.current = false

      if (options !== undefined) {
        options = [...options]
        setOptions(options)
      }
    }).catch(() => {
      loadingRef.current = false
    })
  }

  return (
    <Select { ...config } >
      {
        options && options.map((option, index) => (
          <Select.Option
            value={ option.value }
          >
            { option.name }
          </Select.Option>)
        )
      }
    </Select>
  )
}

export default DynamicSelectComponent;
