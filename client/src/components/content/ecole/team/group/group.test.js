import React from 'react'
import ReactDom from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import faker from 'faker'
import Group from './Group'

describe('TEAM Group Component', () => {
  afterEach(cleanup)

  const department = faker.name.jobArea()

  const members = [
    {
      name: 'Hello',
      firstname: 'Madrid',
      gender: 'monsieur',
      position: 'cadre',
    },
  ]
  const props = { department, members }

  it('render without crashing', () => {
    const members = [1, 2, 3]
    const div = document.createElement('div')
    ReactDom.render(<Group members={members} />, div)
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
