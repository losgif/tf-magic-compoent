import React from 'react';
import { DynamicSelectComponent } from '@tf-magic/select';

const loadSearchData = (searchKeyword) => (
  Promise.resolve([
    {
      name: '选项一',
      value: 1
    },
    {
      name: '选项二',
      value: 2
    }
  ])
)

export default () => (
  <DynamicSelectComponent
    placeholder="请选择"
    loadData={ loadSearchData }
  />
)
