import * as React from 'react';
import { Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select'
import { SelectComponentOption } from './constants'

/**
 * 选项组件Props类型声明
 */
type SelectComponentProps = {
  options?: SelectComponentOption[]
  value?: SelectValue
  valueConverter?: (value: React.ReactText) => React.ReactText
} & SelectProps

const defaultProps: SelectComponentProps = {
  valueConverter: undefined
}

const SelectComponent: React.FC<SelectComponentProps> = (props) => {
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

  let { options, ...config } = props;

  return (
    <Select { ...defaultConfig} { ...config } >
      {
        options && options.map((option, index) => (
          <Select.Option
            value={ props.valueConverter ? props.valueConverter(option.value) : option.value }
          >
            { option.name }
          </Select.Option>)
        )
      }
    </Select>
  )
}

SelectComponent.defaultProps = defaultProps

export default SelectComponent;
