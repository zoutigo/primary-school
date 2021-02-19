import React from 'react'
import ReactDom from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import faker from 'faker'
import deepPurple from '@material-ui/core/colors/deepPurple'

import AsideTitle from './AsideTitle'

describe('WRAPPER - AsideTitle component', () => {
  afterEach(cleanup)
  const title = faker.company.catchPhrase()
  const rubricColors = {
    ligth: deepPurple[50],
    main: deepPurple[300],
    dark: deepPurple[900],
  }
  const datas = { title, rubricColors }

  it('render without crashing', () => {
    const colors = {
      main: 'hello',
    }
    const div = document.createElement('div')
    ReactDom.render(<AsideTitle rubricColors={colors} />, div)
  })

  it('renders props correctly', () => {
    const { getByTestId } = render(<AsideTitle {...datas} />)
    expect(getByTestId('wrapper-aside-title')).toHaveTextContent(title)
    expect(getByTestId('wrapper-aside-title')).toHaveStyle(
      `height: 2.8em;width: 100%`
    )
    expect(getByTestId('wrapper-aside-title')).toHaveStyle(`width: 100%`)
    expect(getByTestId('wrapper-aside-title-box')).toHaveTextContent(title)
    expect(getByTestId('wrapper-aside-title-box')).toHaveStyle(
      `background:${rubricColors.main};width:80%;margin-left:20%`
    )
  })
})
