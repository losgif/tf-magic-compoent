import { Skeleton } from 'antd'
import type { District } from '../types'
import { ActiveKey, fetchDistricts, PopupAddressContext } from '../constants'
import React, { useContext, useEffect } from 'react'

interface IProps {
  onSelect: (value: District, index: number) => void
  activeKey: ActiveKey
  activeValue: District[]
}

const TYPE: ActiveKey = 'city'

const City: React.FC<IProps> = (props) => {
  const { onSelect, activeKey, activeValue } = props
  const [options, setOptions] = React.useState<District[]>([])
  const [loading, setLoading] = React.useState(false)

  const { filterMunicipal } = useContext(PopupAddressContext)

  const handleSelect = (value = {}, valueType = 1) => {
    onSelect && onSelect(value, valueType)
  }

  useEffect(() => {
    if (TYPE === activeKey && activeValue[0]) {
      setLoading(true)
      fetchDistricts(activeValue[0].districtCode, filterMunicipal)
        .then((data) => {
          setLoading(false)
          setOptions(data)
        })
        .catch((err) => {
          setLoading(false)
          throw err
        })
    }
  }, [activeKey, activeValue[0]])

  const renderTemplate = (options: District[]) => {
    return (
      <Skeleton title={false} loading={loading}>
        <ul className="lj-fe-address-menu lj-fe-address-menu2">
          {options.map((element, index) => {
            const classSelect =
              element.districtCode === activeValue[1]?.districtCode
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
                {element.shortName}
              </li>
            )
          })}
        </ul>
      </Skeleton>
    )
  }

  return TYPE !== activeKey ? null : <div className="lj-fe-address-content">{renderTemplate(options)}</div>
}

export default City
