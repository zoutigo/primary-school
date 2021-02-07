// import React from 'react'
import { render, cleanup } from '@testing-library/react'
// import App from './App'

// test('renders learn react link', () => {
//   const { getByText } = render(<App />)
//   const linkElement = getByText(/learn react/i)
//   expect(linkElement).toBeInTheDocument()
// })
afterEach(cleanup)

test('scenario example', () => {
  expect(1).toBe(1)
})

// test('my app title', ()=>{
//   render(<App />)
// })
