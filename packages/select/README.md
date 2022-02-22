# 下拉选择器

继承自 Ant.Design Select 组件  
封装公共选择组件，同时具有远程请求获取选项及初始化选项功能

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## 远程请求获取选项

```jsx
import SelectComponent from '@tf-magic/select';

return (
  <SelectComponent
    placeholder="请输入"
    showSearch={true}
    loadData={(searchKeyword, isFirstLoaded) => new Promise.resolve(searchKeyword, isFirstLoaded)}
    onChange={(value, options) => {
      form.setFieldsValue({
        // @ts-ignore
        [`${record.id}.customerName`]: options?.props.children
      })
    }}
  />
)
```

## 初始化选项

```tsx
import { DynamicSelectComponent } from '@tf-magic/select';

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

return (
  <DynamicSelectComponent
    placeholder="请选择"
    options={options}{ data }
  />
)
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loadData | 选项动态查询功能回调函数，`showSearch`参数 同时传入情况下有效 | function([searchKeyword]) => Option[] | 无 |
| options | 静态选项初始化数组 | Option[] | 无 |

`loadData` 可以是一个返回Promise对象的函数，`searchKeyword` 会在 `showSearch`参数传入且发生输入事件时传递给回调函数，如：

```tsx
const loadSearchData = (searchKeyword, isFirstLoaded) => (
  new Promise.resolve([
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
```

`options` 是一个Option数组，用来初始化选项，如：

```ts
const options = () => (
  new Promise.resolve([
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
```

### Option

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 选项名称 | string | 无 |
| value | 选项值 | any | 无 |

更多API文档请查看 https://3x.ant.design/components/select-cn/#API
