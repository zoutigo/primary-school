import React from 'react'
import ReactDom from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import faker from 'faker'
import Member from './Member'

describe('TEAM MEMBER Component', () => {
  afterEach(cleanup)
  const gender = faker.name.gender()
  const firstname = faker.name.firstName()
  const lastname = faker.name.lastName()
  const position = faker.name.jobTitle()
  const member = {
    firstname,
    lastname,
    gender,
    position,
  }
  it('render without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<Member />, div)
  })

  it('renders props correctly', () => {
    const { getByTestId } = render(<Member {...member} />)
    expect(getByTestId('team-member')).toHaveTextContent(gender)
    expect(getByTestId('team-member')).toHaveTextContent(firstname)
    expect(getByTestId('team-member')).toHaveTextContent(lastname)
    expect(getByTestId('team-member')).toHaveTextContent(position)
  })
  it('is display grid', () => {
    const { getByTestId } = render(<Member {...member} />)
    expect(getByTestId('team-member')).toHaveClass('MuiGrid-root')
  })
})
