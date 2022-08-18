import { Skeleton } from 'antd'
import type { District } from '../types'
import { ActiveKey, fetchDistricts, PopupAddressContext } from '../constants'
import React, { MouseEvent, useContext, useEffect } from 'react'

interface IProps {
  onTabChange: (tab: ActiveKey, event?: MouseEvent<HTMLLIElement>) => void
  onSelect: (...args) => void
  activeKey: ActiveKey
  activeValue: District[]
}

const TYPE: ActiveKey = 'area'

const Area: React.FC<IProps> = (props) => {
  const { onTabChange, onSelect, activeKey, activeValue } = props
  const [options, setOptions] = React.useState<District[]>([])
  const [loading, setLoading] = React.useState(false)

  const { filterMunicipal } = useContext(PopupAddressContext)

  const handleSelect = (value = {}, valueType = 2) => {
    onSelect && onSelect(value, valueType)
  }

  useEffect(() => {
    if (TYPE === activeKey && activeValue[1]) {
      setLoading(true)
      fetchDistricts(activeValue[1].districtCode, filterMunicipal)
        .then((data) => {
          setLoading(false)
          setOptions(data)
          if (!data.length) {
            onTabChange && onTabChange('city')
          }
        })
        .catch((err) => {
          setLoading(false)
          throw err
        })
    }
  }, [activeKey, activeValue[1]])

  const renderTemplate = (options: District[]) => {
    return (
      <Skeleton title={false} loading={loading}>
        <ul className="lj-fe-address-menu lj-fe-address-menu2">
          {options.map((element, index) => {
            const classSelect =
              element.districtCode === activeValue[2]?.districtCode
                ? 'lj-fe-address-item  lj-fe-address-item-select'
                : 'lj-fe-address-item'
            return (
              <li
                key={index}
                className={classSelect}
                onClick={() => handleSelect(element)}
                data-key={element.districtCode}
                data-code={element.districtCode}
              >
                {element.fullName}
              </li>
            )
          })}
        </ul>
      </Skeleton>
    )
  }

  return activeKey !== TYPE ? null : <div className="lj-fe-address-content">{renderTemplate(options)}</div>
}

export default Area
