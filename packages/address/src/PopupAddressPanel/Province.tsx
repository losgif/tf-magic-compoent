import type { District } from '../types'
import { ActiveKey, PopupAddressContext, queryAllProvince } from '../constants'
import React, { useContext, useEffect } from 'react'
import styles from '../index.less'

interface IProps {
  onSelect: (value: District, index: number) => void
  activeKey: ActiveKey
  activeValue: District[]
}

const TYPE: ActiveKey = 'province'

const Province: React.FC<IProps> = (props) => {
  const { activeKey, activeValue, onSelect } = props

  const [options, setOptions] = React.useState<Record<string, District[]>>({})

  const { showNationalButton } = useContext(PopupAddressContext)

  const handleSelect = (value = {}, valueType = 0) => {
    onSelect && onSelect(value, valueType)
  }

  useEffect(() => {
    if (TYPE === activeKey) {
      queryAllProvince(showNationalButton).then((data) => {
        setOptions(data)
      })
    }
  }, [activeKey])

  const renderTemplate = (options: District[]) => {
    return (
      <ul className="lj-fe-address-menu">
        {options.map((element, index) => {
          const classSelect =
            element.districtCode === activeValue[0]?.districtCode
              ? 'lj-fe-address-item lj-fe-address-item-select'
              : 'lj-fe-address-item'
          return (
            <li
              key={index}
              className={classSelect}
              onClick={(e) => handleSelect(element)}
              data-key={element.districtCode}
              data-code={element.districtCode}
            >
              {element.shortName}
            </li>
          )
        })}
      </ul>
    )
  }

  return activeKey !== TYPE ? null : (
    <div className="lj-fe-address-content">
      {Object.keys(options).map((i) => (
        <div className="lj-fe-address-menubox">
          <h3 className={styles.protitle}>{i}</h3>
          {renderTemplate(options[i])}
        </div>
      ))}
    </div>
  )
}

export default Province
