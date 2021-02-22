import React from 'react'
import ReactDom from 'react-dom'
import { render, cleanup } from '@testing-library/react'

import Department from './Department'

describe('TEAM DEPARTMENT Component', () => {
  afterEach(cleanup)

  it('render without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<Department />, div)
  })

  it('renders correctly', () => {
    const department = 'Les enseignants'
    const { getByTestId } = render(<Department department={department} />)
    expect(getByTestId('team-department')).toHaveTextContent(department)
    expect(getByTestId('team-department-spacer')).toHaveTextContent('')
    expect(getByTestId('team-department-spacer')).toHaveStyle(`margin-top: 1em`)
  })
})
