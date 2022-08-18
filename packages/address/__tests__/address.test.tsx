import React from 'react'
import { render } from 'react-dom'
import PopupAddress from '..'

describe('@tf-magic/address', () => {
  test('popup address component renders correctly', () => {
    const { container } = render(<PopupAddress/>)

    expect(container).toMatchSnapshot()
  })
})
