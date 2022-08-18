import { Button } from 'antd'
import type { District } from '../types'
import { ActiveKey } from '../constants'
import React, { MouseEvent } from 'react'

interface HeaderProps {
  onTabChange: (tab?: ActiveKey, event?: MouseEvent<HTMLLIElement>) => void
  activeKey: ActiveKey
  activeValue: District[]
  showCommon: boolean
  depth: number
}

const Header: React.FC<HeaderProps> = (props) => {
  const { onTabChange, activeKey, activeValue, showCommon, depth } = props
  const html: Array<{ key: string; value: ActiveKey }> = [
    { key: '常用', value: 'common' },
    { key: '省', value: 'province' },
    { key: '市', value: 'city' },
    { key: '区', value: 'area' }
  ]
  html.slice(0, depth + 1)

  if (!showCommon) {
    html.shift()
  }

  const compileDisabled = (index: number) => {
    /**
     * 选择全国时，下一级tab不可点击
     */
    if (activeValue.length === 1 && activeValue[0].levels === 0 && index > 1) {
      return true
    }

    /**
     * 优先根据当前值进行计算是否禁用
     */
    if (activeValue.length >= index - 1) {
      return false
    }

    /**
     * 如果当前值不存在，则根据当前激活的tab进行计算
     */
    return index > 1 && index > html.findIndex((i) => i.value === activeKey)
  }

  return (
    <div>
      <ul className="lj-fe-address-head">
        {html.slice(0, depth + 1).map((t, index) => (
          <li
            key={t.key}
            className={activeKey === t.value ? 'select' : ''}
            onClick={(e) => {
              onTabChange(t.value, e)
            }}
          >
            <Button type="link" disabled={compileDisabled(index)}>
              {t.key}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Header
