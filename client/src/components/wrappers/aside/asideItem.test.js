import React from 'react'
import ReactDom from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import faker from 'faker'
import deepPurple from '@material-ui/core/colors/deepPurple'

import AsideItem from './AsideItem'

describe('WRAPPER - AsideItem component', () => {
  afterEach(cleanup)
  const subtitle = faker.company.catchPhrase()
  const text = faker.company.catchPhraseDescriptor()
  const item = { subtitle, text }
  const rubricColors = {
    ligth: deepPurple[50],
    main: deepPurple[300],
    dark: deepPurple[900],
  }
  const datas = { item, rubricColors }

  it('render without crashing', () => {
    const div = document.createElement('div')
    ReactDom.render(<AsideItem {...datas} />, div)
  })

  it('renders props correctly', () => {
    const { getByTestId } = render(<AsideItem {...datas} />)
    expect(getByTestId('wrapper-aside-item')).toHaveTextContent(subtitle)
    expect(getByTestId('wrapper-aside-item')).toHaveTextContent(text)
    expect(getByTestId('wrapper-aside-item')).toHaveStyle(
      `background:${rubricColors.ligth};width:100%;text-align:center`
    )
  })
})
