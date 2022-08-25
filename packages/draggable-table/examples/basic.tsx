import { useState } from 'react'
import * as React from 'react';
import DraggableTable from '@tf-magic/draggable-table';
import 'antd/dist/antd.css';

const Basic = () => {
  const [loading] = useState(false)
  const [data] = useState([
    {
      id: 1,
      name: '张三',
      phone: '13333333333',
      age: 18,
      amount: 500
    },
    {
      id: 2,
      name: '李四',
      phone: '14444444444',
      age: 32,
      amount: 1000
    }
  ])

  return (
    <DraggableTable
      loading={ loading }
      rowKey={ (record) => record.phone }
      dataSource={ data }
      columns={ [
        {
          title: '编号',
          fixed: 'left',
          render: (_, __, index) => (index)
        },
        {
          key: 'id',
          dataIndex: 'id',
          title: 'ID'
        },
        {
          key: 'name',
          dataIndex: 'name',
          title: '姓名'
        },
        {
          key: 'age',
          dataIndex: 'age',
          title: '年龄'
        },
        {
          key: 'phone',
          dataIndex: 'phone',
          title: '手机号'
        },
        {
          key: 'amount',
          dataIndex: 'amount',
          title: '身价'
        },
        {
          title: '操作',
          fixed: 'right',
          render: () => (<a>添加</a>)
        }
      ] }
      pagination={ false }
      storageKey={ 'OTHER_RESOURCE_COLUMN_KEYS' }
    />
  )
}

export default Basic
