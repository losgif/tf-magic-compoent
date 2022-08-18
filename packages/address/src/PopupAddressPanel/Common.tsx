import { Empty } from 'antd'
import {
  ActiveKey,
  CommonAddress,
  getCommonOptions,
  PopupAddressContext,
  queryCommonDistricts
} from '../constants'
import React, { useContext, useEffect, useState } from 'react'

interface CommonProps {
  dropdownMenuColumnStyle?: React.CSSProperties
  onSelect: (...args) => void
  activeKey: ActiveKey
}

const TYPE: ActiveKey = 'common'

const Common: React.FC<CommonProps> = (props) => {
  const { activeKey, dropdownMenuColumnStyle } = props

  const [options, setOptions] = useState<CommonAddress[]>([])

  const { partyId } = useContext(PopupAddressContext)

  useEffect(() => {
    if (activeKey !== TYPE) {
      return
    }

    getCommonOptions(partyId).then(({ data: { data } }) => {
      setOptions(data)
    })
  }, [activeKey])

  const renderOption = (option: CommonAddress) => {
    const onSelect = (e) => {
      queryCommonDistricts(option.districtCode).then((data) => {
        props.onSelect(data, -1, e)
      })
    }

    return (
      <li key={option.districtName} className={'lj-fe-address-item'} title={option.districtName} onClick={onSelect}>
        {option.districtName}
      </li>
    )
  }

  return activeKey === TYPE ? (
    <div className="lj-fe-address-content">
      <ul className={'lj-fe-address-menu'} style={dropdownMenuColumnStyle}>
        {options.length ? (
          options.map((option) => renderOption(option))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </ul>
    </div>
  ) : null
}

export default Common
