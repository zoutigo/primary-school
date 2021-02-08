import React from 'react'
import ReactDom from 'react-dom'
import FakeButton from '../FakeButton'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'

import renderer from 'react-test-renderer'

describe('FAKE BUTTON', () => {
  afterEach(cleanup)
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<FakeButton></FakeButton>, div)
  })
  it('renders button correctly', () => {
    const { getByTestId } = render(<FakeButton label="Click Me"></FakeButton>)
    expect(getByTestId('button')).toHaveTextContent('Click Me')
  })
  it('renders button correctly', () => {
    const { getByTestId } = render(<FakeButton label="Hello"></FakeButton>)
    expect(getByTestId('button')).toHaveTextContent('Hello')
  })
  it('matches snapshot 1', () => {
    const tree = renderer
      .create(<FakeButton label="Save"></FakeButton>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('matches snapshot 2', () => {
    const tree = renderer
      .create(<FakeButton label="Click Me Now"></FakeButton>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn()
    render(<FakeButton onClick={handleClick} label="Hello"></FakeButton>)
    fireEvent.click(screen.getByText(/Hello/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
