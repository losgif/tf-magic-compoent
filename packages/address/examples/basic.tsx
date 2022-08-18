import { useCallback } from 'react'
import * as React from 'react';
import PopupAddress from '@tf-magic/address'
import 'antd/dist/antd.css';

const Basic = () => {
  const handleChange = useCallback((value) => {
    console.log(value)
  }, [])

  return (
    <PopupAddress
      valueType="complex"
      onChange={ handleChange }
      depth={ 2 }
      placeholder="请选择目的地"
      partyId={ 0 }
    />
  )
}

export default Basic
