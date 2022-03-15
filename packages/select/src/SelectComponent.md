---
group:
  title: 选择器
  path: /select-component
---

# 下拉选择器

继承自 Ant.Design Select 组件  
封装公共选择组件，同时具有远程请求获取选项及初始化选项功能

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## 自动生成选项

```jsx
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
```

## 远程加载选项

`loadData` 可以是一个返回Promise对象的函数，`searchKeyword` 会在 `showSearch`参数传入且发生输入事件时传递给回调函数，如：

```tsx
import React from 'react';
import { DynamicSelectComponent } from '@tf-magic/select';

const loadSearchData = (searchKeyword, isFirstLoaded) => (
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
```

## 自定义渲染
很多情况下接口给予的数据或本地定义的数据并不能符合本组件数据结构的需要，特提供一系列快捷方法进行操作。

### 对象 -> 组件需要的数据结构
```tsx
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
```

### 对象数组 -> 组件需要的数据结构

```tsx
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
```

<API src="./index.ts"></API>

更多API文档请查看 https://3x.ant.design/components/select-cn/#API
