import React from 'react';
import { SelectComponent, selectTypeConverter } from '@tf-magic/select';
import 'antd/dist/antd.css';

const options = {
  10: '百度',
  20: '腾讯',
  30: '阿里巴巴'
}

export default () => (
  <SelectComponent
    placeholder="请输入"
    showSearch={ true }
    options={ selectTypeConverter(options) }
  />
)
