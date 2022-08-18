import type { District } from './types'
import PopupAddressMenus from './PopupAddressMenus'
import PopupAddressPanel from './PopupAddressPanel'
import { ActiveKey, ActiveKeyOptions, PopupAddressContext } from './constants'
import Trigger from 'rc-trigger'
import React, { useCallback, useContext, useEffect, useRef } from 'react'

const builtinPlacements = {
  left: {
    points: ['cr', 'cl'],
    overflow: {
      adjustX: true,
      adjustY: true
    }
  },
  right: {
    points: ['cl', 'cr'],
    overflow: {
      adjustX: true,
      adjustY: true
    }
  },
  top: {
    points: ['bc', 'tc'],
    overflow: {
      adjustX: true,
      adjustY: true
    }
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: {
      adjustX: true,
      adjustY: true
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: {
      adjustX: true,
      adjustY: true
    }
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: {
      adjustX: true,
      adjustY: true
    }
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: {
      adjustX: true,
      adjustY: true
    }
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: {
      adjustX: true,
      adjustY: true
    }
  }
}

interface PopupAddressTriggerProps {
  children?: React.ReactElement
  onSelect: (value: District[]) => void
  value: District[]
  popupVisible: boolean
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
  depth: 1 | 2 | 3
  popupAlign?: any
  popupPlacement?: string
  builtinPlacements?: { [key: string]: any }
  transitionName?: string
  prefixCls?: string
  popupClassName?: string
  expandTrigger?: 'click' | 'hover'
  expandIcon?: React.ReactNode
  getPopupContainer?: any
}

const PopupAddressTrigger: React.FC<PopupAddressTriggerProps> = (props) => {
  const {
    children,
    depth,
    popupAlign,
    popupPlacement,
    builtinPlacements,
    onSelect,
    popupVisible,
    setPopupVisible,
    transitionName,
    prefixCls,
    popupClassName,
    ...restProps
  } = props

  const [activeKey, setActiveKey] = React.useState<ActiveKey>('province')
  const [activeValue, setActiveValue] = React.useState([])

  const { mode } = useContext(PopupAddressContext)

  const triggerRef = useRef()

  const handleSelect = useCallback(
    (values: District[]) => {
      setActiveValue(values)
      onSelect && onSelect(values)

      if (values && values.length === 1 && values[0].levels === 0) {
        setPopupVisible(false)
      } else if (values.length < props.depth) {
        setActiveKey(ActiveKeyOptions[values.length + 1])
      } else {
        setPopupVisible(false)
      }
    },
    [props.depth]
  )

  const handleActiveKeyChange = (key) => {
    setActiveKey(key ?? ActiveKeyOptions[activeValue.length + 1])
  }

  useEffect(() => {
    if (!props.value?.length || (props.value.length === 1 && props.value[0].levels === 0)) {
      setActiveKey('province')
    } else if (props.value.length < props.depth) {
      setActiveKey(ActiveKeyOptions[props.value.length + 1])
    } else {
      setActiveKey(ActiveKeyOptions[props.value.length])
    }

    setActiveValue(props.value)
  }, [props.value])

  const renderPopElement = () => {
    if (mode === 'search') {
      return (
        <PopupAddressMenus prefixCls={prefixCls} onSelect={handleSelect} dropdownMenuColumnStyle={{ width: '100%' }} />
      )
    }

    return (
      <PopupAddressPanel
        activeValue={activeValue}
        activeKey={activeKey}
        onActiveKeyChange={handleActiveKeyChange}
        onSelect={handleSelect}
        showCommon
      />
    )
  }

  return (
    <Trigger
      {...restProps}
      ref={triggerRef}
      popupAlign={{
        overflow: {
          adjustX: true,
          adjustY: true
        }
      }}
      popupPlacement={popupPlacement}
      builtinPlacements={builtinPlacements}
      popupTransitionName={transitionName}
      action={['click']}
      popupVisible={popupVisible}
      onPopupVisibleChange={setPopupVisible}
      prefixCls={`${prefixCls}-menus`}
      popupClassName={popupClassName}
      stretch="width"
      popup={renderPopElement()}
    >
      {children}
    </Trigger>
  )
}

PopupAddressTrigger.defaultProps = {
  transitionName: '',
  prefixCls: 'ant-cascader',
  popupClassName: '',
  popupAlign: {
    overflow: {
      adjustX: 1,
      adjustY: 0
    }
  },
  popupPlacement: 'bottomLeft',
  builtinPlacements,
  expandTrigger: 'click',
  expandIcon: '>'
}

export default PopupAddressTrigger
