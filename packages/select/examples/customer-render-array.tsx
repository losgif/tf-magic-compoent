import React from 'react';
import { SelectComponent, selectTypeConverter, selectTypeConverterFromArray } from '@tf-magic/select';
import 'antd/dist/antd.css';

const options = [
  {
    userName: '张三',
    id: 1
  },
  {
    userName: '李四',
    id: 2
  }
]

export default () => (
  <SelectComponent
    placeholder="请输入"
    showSearch={ true }
    options={ selectTypeConverterFromArray(options, {
      valueRender: (item) => item.id,
      nameRender: (item) => item.userName
    }) }
  />
)
