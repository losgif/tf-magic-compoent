import * as React from 'react'
import { LabeledValue, SelectValue } from 'antd/es/select'

/**
 * 选项类型声明
 */
export interface SelectComponentOption {
  /**
   * @description 选项展示用名称
   */
  name: React.ReactNode,

  /**
   * @description 选项值
   */
  value: React.ReactText,

  /**
   * @description 其他选项
   */
  [key: string]: any
}

/**
 * 选择框选项类型转换器
 *
 * @param type
 */
export const selectTypeConverter = (type: { [key: number]: string }) => {
  const result: SelectComponentOption[] = []

  for (const e in type) {
    if (type.hasOwnProperty(e)) {
      const name = type[e]
      const r: SelectComponentOption = {
        name: name,
        value: e
      }

      result.push(r)
    }
  }

  return result
}

type ConverterOption<T> = {
  nameRender?: (item: T) => React.ReactNode
  valueRender?: (item: T) => React.ReactText,
  optionParametersRender?: (item: T) => any
}

/**
 * 选择框选项类型转换器
 *
 * @param type
 * @param options
 */
export const selectTypeConverterFromArray: <T extends OriginOptionValueType>(type: (React.ReactText | T)[], options?: ConverterOption<T>) => SelectComponentOption[] = <T>(type, options) => {
  const result: SelectComponentOption[] = []

  type?.forEach(t => {
    let name = `${ t }` as React.ReactNode
    let value = t as React.ReactText
    let optionParameters = {}

    if (t instanceof Object) {
      let nameRender = options?.nameRender
      if (!nameRender) {
        nameRender = item => item.name
      }

      let valueRender = options?.valueRender
      if (!valueRender) {
        valueRender = item => item.value
      }

      if (options?.optionParametersRender) {
        optionParameters = options.optionParametersRender(t)
      }

      name = nameRender(t as T)
      value = valueRender(t as T)
    }

    const r: SelectComponentOption = {
      name,
      value,
      ...optionParameters
    }

    result.push(r)
  })

  return result
}

/**
 * 原始选项值类型
 */
type OriginOptionValueType = {
  [key: string]: any
}

/**
 * 判断是否有效下拉值
 *
 * @param value
 * @param originValuesRange 原始选项值
 * @param valueRender 转换方法, 仅在原始选项类型为 T[] 时生效
 */
export const computeValidOptionValue = <T extends OriginOptionValueType> (value: SelectValue, originValuesRange: { [key: number]: string } | (React.ReactText | T)[], valueRender?: (item: T) => React.ReactText): SelectValue => {
  let values: React.ReactText[] = []

  /**
   * 空选项时直接返回
   */
  if (!originValuesRange) {
    return value
  }

  if (Array.isArray(originValuesRange)) {
    /**
     * 将原始选项值转换为 React.ReactText[] 选项类型
     */
    originValuesRange.forEach(t => {
      let value = t as React.ReactText
      if (t instanceof Object) {
        if (!valueRender) {
          valueRender = item => item.value
        }

        value = valueRender(t as T)
      }

      values.push(value)
    })
  } else if (originValuesRange instanceof Object) {
    values = Object.keys(originValuesRange).map(key => !isNaN(Number(key)) ? Number(key) : key)
  } else {
    values = []
  }

  /**
   * 空选项时直接返回
   */
  if (values.length === 0) {
    return undefined
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return undefined
    }

    const filtratedValue = []

    value.forEach((v: React.ReactText | LabeledValue) => {
      if (v instanceof Object) {
        filtratedValue.push(v)
      } else {
        if (values.includes(v)) {
          filtratedValue.push(v)
        }
      }
    })

    return filtratedValue
  } else {
    // value instanceof LabeledValue
    if (value instanceof Object) {
      return value
    }

    return values.includes(value) ? value : undefined
  }
}
