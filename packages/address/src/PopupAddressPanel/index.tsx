import 'antd/lib/cascader/style/index.css'
import type { District } from '../types'
import { ActiveKey, PopupAddressContext } from '../constants'
import React, { useContext } from 'react'
import styles from '../index.less'
import Area from './Area'
import City from './City'
import Common from './Common'
import Header from './Header'
import Province from './Province'

interface PopupAddressPanelProps {
  showCommon: boolean
  activeKey: ActiveKey
  activeValue: District[]
  onSelect: (vales: District[]) => void
  onActiveKeyChange: (tab: ActiveKey) => void
}

const PopupAddressPanel: React.FC<PopupAddressPanelProps> = (props) => {
  const { showCommon, activeValue, activeKey, onSelect, onActiveKeyChange } = props

  const { depth } = useContext(PopupAddressContext)

  const onTabChange = (tab: ActiveKey) => {
    onActiveKeyChange && onActiveKeyChange(tab)
  }

  const handleSelect = (addressValue: District | District[], index: number) => {
    if (!Array.isArray(addressValue)) {
      const values = activeValue.slice(0, index)
      values.push(addressValue)
      onSelect && onSelect(values)
    } else {
      onSelect && onSelect(addressValue)
    }
  }

  return (
    <div className={styles.addressBox}>
      <Header
        activeKey={activeKey}
        onTabChange={onTabChange}
        activeValue={activeValue}
        depth={depth}
        showCommon={showCommon}
      />
      <Common activeKey={activeKey} onSelect={handleSelect} />
      <Province activeKey={activeKey} activeValue={activeValue} onSelect={handleSelect} />
      <City activeKey={activeKey} activeValue={activeValue} onSelect={handleSelect} />
      <Area activeKey={activeKey} onTabChange={onTabChange} activeValue={activeValue} onSelect={handleSelect} />
    </div>
  )
}

export default PopupAddressPanel
