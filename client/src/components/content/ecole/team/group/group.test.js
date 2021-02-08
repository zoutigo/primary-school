import React from 'react'
import ReactDom from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import faker from 'faker'
import Group from './Group'

describe('TEAM Group Component', () => {
  afterEach(cleanup)

  const department = faker.name.jobArea()

  const props = { department }

  it('render without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<Group />, div)
  })

  it('renders correctly with props', () => {
    const { getByTestId } = render(<Group {...props} />)
    expect(getByTestId('team-group')).toHaveTextContent(department)
  })
  it('has grid property', () => {
    const { getByTestId } = render(<Group {...props} />)
    expect(getByTestId('team-group')).toHaveClass('MuiGrid-root')
  })
})
