import React from 'react';
import SelectComponent from '@tf-magic/select';
import 'antd/dist/antd.css';

const options = [
  {
    name: '选项一',
    value: 1
  },
  {
    name: '选项二',
    value: 2
  }
]

export default () => (
  <SelectComponent
    placeholder="请输入"
    showSearch={ true }
    options={ options }
  />
)
