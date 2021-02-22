import React from 'react'
import ReactDom from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import faker from 'faker'
import { ThemeProvider } from '@material-ui/styles'

import PasswordInput from './PasswordInput'
import theme from '../theme'

describe('UTILS-FORMS-PasswordInput component', () => {
  afterEach(cleanup)
  const subtitle = faker.company.catchPhrase()
  const text = faker.company.catchPhraseDescriptor()
  const item = { subtitle, text }

  it('render without crashing', () => {
    const div = document.createElement('div')
    const datas = {
      name: 'password',
      label: 'Mot de pass',
      error: true,
      errors: '',
      name: 'password',
    }
    ReactDom.render(
      <ThemeProvider theme={theme}>
        <PasswordInput {...datas} />
      </ThemeProvider>,
      div
    )
  })

  it('renders props correctly', () => {
    const props = {
      name: 'password',
      label: 'Mot de pass',
      error: true,
      errors: '',
      name: 'password',
    }
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PasswordInput {...props} />
      </ThemeProvider>
    )
    expect(getByTestId('password-input')).toHaveTextContent('Mot de pass')
    // expect(getByTestId('wrapper-aside-item')).toHaveTextContent(text)
    // expect(getByTestId('wrapper-aside-item')).toHaveStyle(
    //   `background:${rubricColors.ligth};width:100%;text-align:center`
    // )
  })
})
