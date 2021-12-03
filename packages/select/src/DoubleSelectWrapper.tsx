import React from "react"
import { Col, Row } from 'antd'

type DoubleSelectWrapperProps = {
  leftChildren: React.ReactNode
  rightChildren: React.ReactNode
  lineHeight?: any
}

const DoubleSelectWrapper: React.FC<DoubleSelectWrapperProps> = (props) => {
  return (
    <Row gutter={ 6 }>
      <Col span={ 11 }>
        { props.leftChildren }
      </Col>
      <Col span={ 2 } style={ { textAlign: 'center' } }>
        <span style={ { lineHeight: props.lineHeight } }>-</span>
      </Col>
      <Col span={ 11 }>
        { props.rightChildren }
      </Col>
    </Row>
  )
}

DoubleSelectWrapper.defaultProps = {
  lineHeight: '32px'
}

export default DoubleSelectWrapper
