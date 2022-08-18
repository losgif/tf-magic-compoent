import { Empty, Spin } from 'antd'
import type { District } from './types'
import { PopupAddressContext, queryDistrict, queryPoiDistrict } from './constants'
import { debounce } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'

interface MenusProps {
  prefixCls?: string
  expandTrigger?: string
  onSelect?: (values: District[]) => void
  dropdownMenuColumnStyle?: React.CSSProperties
}

const PopupAddressMenus: React.FC<MenusProps> = (props) => {
  const { expandTrigger, prefixCls, dropdownMenuColumnStyle } = props

  const [options, setOptions] = useState<District[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { depth, inputValue, filterMunicipal } = useContext(PopupAddressContext)

  useEffect(() => {
    if (inputValue && /^[\u4e00-\u9fa5]+$/.test(inputValue)) {
      query(inputValue, depth)
    }
  }, [depth, inputValue])

  const query = (inputValue: string, depth: 1 | 2 | 3) => {
    setLoading(true)
    queryPoiDistrict(inputValue, depth)
      .then(({ data }) => {
        setOptions(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderOption = (option) => {
    const onSelect = () => {
      setLoading(true)

      const fullCodes = option.fullCode.split('/')

      queryDistrict({ filterMunicipal, keywords: fullCodes[0], subdistrict: fullCodes.length - 1 })
        .then(({ data }) => {
          const values = []

          let tempItem = data.find((i) => i.districtCode === fullCodes[0])
          for (let currentDeep = 1; currentDeep <= fullCodes.length; currentDeep++) {
            values.push(tempItem)

            if (tempItem?.subdistricts) {
              tempItem = tempItem.subdistricts.find((i) => i.districtCode === fullCodes[currentDeep])
            }
          }

          values.forEach((i) => delete i?.subdistricts)
          props.onSelect(values)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    let expandProps: any = {
      onClick: onSelect
    }
    let menuItemCls = `${prefixCls}-menu-item`

    if (expandTrigger === 'hover') {
      expandProps = {
        onMouseEnter: debounce(onSelect, 150),
        onClick: onSelect
      }
    }

    if (option.disabled) {
      menuItemCls += ` ${prefixCls}-menu-item-disabled`
    }

    const label = (option.fullName as string).replace(
      new RegExp(`[${inputValue}]`, 'g'),
      (word) => `<span class="${prefixCls}-menu-item-keyword">${word}</span>`
    )

    return (
      <li key={option.value} className={menuItemCls} title={option.address} {...expandProps}>
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </li>
    )
  }

  return (
    <Spin spinning={loading}>
      {options.length ? (
        <ul className={`${prefixCls}-menu`} style={dropdownMenuColumnStyle}>
          {options.map(renderOption)}
        </ul>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Spin>
  )
}

PopupAddressMenus.defaultProps = {
  prefixCls: 'rc-cascader-menus',
  expandTrigger: 'click'
}

export default PopupAddressMenus
