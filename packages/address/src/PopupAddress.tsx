import { Icon, Input } from 'antd'
import { InputProps } from 'antd/lib/input/Input'
import type { District } from './types'
import classNames from 'classnames'
import { fetchDistricts, PopupAddressProvider, setCommonOptions, setGlobalConfig } from './constants'
import PopupAddressTrigger from './PopupAddressTrigger'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'

interface PopupAddressProps extends Omit<InputProps, 'onChange' | 'value'> {
  inputPrefixCls?: string
  transitionName?: string
  popupPlacement?: string
  changeOnSelect?: boolean
  showSearch?: boolean
  depth?: 1 | 2 | 3
  value?: District[] | string | string[]

  valueType?: 'simple' | 'complex'

  /**
   * 地址选择完成后的回调
   */
  onChange?: (value: string[] | District[], options: District[]) => void

  /**
   * 触发地址值变化的时机，onChange：所有选择完成后触发，onSelect：任意选择完成后触发，默认为onSelect
   */
  triggerChange?: 'onChange' | 'onSelect'

  /**
   * 展示模式
   */
  displayMode?: 'view' | 'edit'

  /**
   * 是否显示市辖区
   */
  filterMunicipal?: 1 | 0

  /**
   * 是否显示全国
   */
  showNationalButton?: boolean

  partyId: number

  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
}

function PopupAddress (props: PopupAddressProps) {
  const {
    style,
    className,
    placeholder,
    prefixCls,
    inputPrefixCls,
    showSearch,
    depth,
    onChange,
    value,
    valueType,
    triggerChange,
    displayMode,
    filterMunicipal,
    showNationalButton,
    partyId,
    getPopupContainer,
    ...otherProps
  } = props

  const [innerValue, setInnerValue] = useState<District[]>([])
  const [displayValue, setDisplayValue] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [popupVisible, setPopupVisible] = useState(false)
  const [mode, setMode] = useState<'search' | 'select'>('select')

  const handleTriggerChange = (values: District[]) => {
    setMode('select')

    // 选择全国时，直接触发onChange
    if (values && values.length === 1 && values[0].levels === 0) {
      setInnerValue(values)
      onChange && onChange(valueType === 'simple' ? values.map((item) => item.districtCode) : values, values)
    }

    if (triggerChange === 'onChange') {
      if (values.length >= depth) {
        setInnerValue(values)
        onChange && onChange(valueType === 'simple' ? values.map((item) => item.districtCode) : values, values)
      }
    } else if (triggerChange === 'onSelect') {
      setInnerValue(values)
      onChange && onChange(valueType === 'simple' ? values.map((item) => item.districtCode) : values, values)
    }
  }

  const handleSelect = (values: District[]) => {
    handleTriggerChange(values)

    if (values.length > 1) {
      setCommonOptions(partyId, values[1].districtCode, values[1].shortName).then(({ data }) => data)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setDisplayValue(e.target.value)

    if (e.target.value === '') {
      setMode('select')
    }

    if (e.target.value && /^[\u4e00-\u9fa5]+$/.test(e.target.value)) {
      setMode('search')
    }
  }

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    // Prevent `Trigger` behaviour.
    if (popupVisible) {
      e.stopPropagation()
      if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation()
      }
    }
  }

  const handleClearIconClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setInnerValue([])
    setMode('select')

    // Prevent `Trigger` behaviour.
    if (popupVisible) {
      e.stopPropagation()
      if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation()
      }
    }
  }

  const getDistrict = useCallback(
    (value: string[], index: number) =>
      fetchDistricts(value[index - 1]).then((districts) =>
        districts.find((item) => item.districtCode === value[index])
      ),
    []
  )
  /**
   * 处理输入值变化
   */
  useEffect(() => {
    if (typeof value === 'string' && value.length > 0) {
      const textValueList: string[] = []
      for (let i = 0; i < value.length - 1; i += 2) {
        if (value[i] === '0' && value[i + 1] === '0') {
          break
        }
        textValueList.push(value.slice(0, i + 2).padEnd(6, '0'))
      }

      if (textValueList.length > 0) {
        const promises: Promise<District>[] = []

        textValueList.forEach((item, index) => promises.push(getDistrict(textValueList, index)))

        Promise.all(promises).then((districts) => {
          setInnerValue(districts)
        })
      }
    } else if (Array.isArray(value) && value.length > 0) {
      if (typeof value[0] !== 'string') {
        setInnerValue(value as District[])
      }
    }
  }, [value])

  useEffect(() => {
    if (innerValue.length) {
      setDisplayValue(innerValue?.map((i) => i.shortName || i.fullName)?.join(' / '))
    } else {
      setDisplayValue(undefined)
    }
  }, [innerValue])

  const sizeCls = classNames({
    [`${inputPrefixCls}-lg`]: props.size === 'large',
    [`${inputPrefixCls}-sm`]: props.size === 'small'
  })

  const pickerCls = classNames(className, `${prefixCls}-picker`, {
    [`${prefixCls}-picker-with-value`]: innerValue,
    [`${prefixCls}-picker-disabled`]: props.disabled,
    [`${prefixCls}-picker-${props.size}`]: !!props.size,
    [`${prefixCls}-picker-show-search`]: !!showSearch,
    [`${prefixCls}-picker-focused`]: popupVisible
  })

  const clearIcon =
    (props.allowClear && !props.disabled && value?.length) || innerValue ? (
      <Icon type="close-circle" theme="filled" className={`${prefixCls}-picker-clear`} onClick={handleClearIconClick} />
    ) : null

  const inputIcon = <Icon type={popupVisible ? 'up' : 'down'} className={`${prefixCls}-picker-arrow`} />

  const renderInput = () => (
    <span style={style} className={pickerCls}>
      <Input
        {...otherProps}
        prefixCls={inputPrefixCls}
        placeholder={innerValue && innerValue.length > 0 ? undefined : placeholder}
        className={`${prefixCls}-input ${sizeCls}`}
        value={displayValue}
        onChange={handleInputChange}
        readOnly={!showSearch}
        autoComplete="off"
        onClick={handleInputClick}
      />
      {clearIcon}
      {inputIcon}
    </span>
  )

  if (displayMode === 'view') {
    return <span>{displayValue}</span>
  }

  return (
    <PopupAddressProvider value={{ filterMunicipal, showNationalButton, partyId, mode, depth, inputValue }}>
      <PopupAddressTrigger
        onSelect={handleSelect}
        getPopupContainer={getPopupContainer}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        value={innerValue}
        depth={depth}
      >
        {renderInput()}
      </PopupAddressTrigger>
    </PopupAddressProvider>
  )
}

PopupAddress.defaultProps = {
  prefixCls: 'ant-cascader',
  inputPrefixCls: 'ant-input',
  placeholder: 'Please select',
  transitionName: 'slide-up',
  popupPlacement: 'bottomLeft',
  changeOnSelect: true,
  showSearch: false,
  disabled: false,
  allowClear: true,
  depth: 3, // 地址层级（默认3级 省、市、区）
  triggerChange: 'onSelect',
  valueType: 'simple',
  showNationalButton: false
}

PopupAddress.config = setGlobalConfig

export default PopupAddress
