---
group:
  title: 表格
  path: /draggable-table
---

# 可拖拽Table

继承自 Ant.Design Table 组件  
提供表头可拖拽功能，提供自定义客制化表头能力，增强业务表格适应性

## 何时使用

提供一个列数据可拖拽表格，表格列排序数据存储在浏览器端。 需要批量展示数据时，且对数据有操作、过滤、排序需求时使用。

## 基本使用

```tsx
import { useState } from 'react'
import * as React from 'react';
import DraggableTable from '@tf-magic/draggable-table';

export default () => {
  const [loading] = useState(false)
  const [data] = useState([
    {
      id: 1,
      name: '张三',
      phone: '13333333333'
    },
    {
      id: 2,
      name: '李四',
      phone: '14444444444'
    }
  ])
  const [defaultColumns] = useState([
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
      key: 'phone',
      dataIndex: 'phone',
      title: '手机号'
    }
  ])
  
  return (
    <DraggableTable
      loading={ loading }
      rowKey={ (record) => record.resourceNo }
      dataSource={ data }
      columns={ defaultColumns }
      pagination={ false }
      storageKey={ 'OTHER_RESOURCE_COLUMN_KEYS' }
    />
  )
}
```

## API

|  参数   | 说明  | 类型 | 默认值 |
|  ----  | ----  | ----  | ---- |
| storageKey  | localStorage key | String | none |

更多API文档请查看 https://3x.ant.design/components/select-cn/#API
