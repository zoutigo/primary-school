import { Grid, styled } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'

import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import BackspaceIcon from '@material-ui/icons/Backspace'

import ButtonComponent from '../../../components/others.js/ButtonComponent'

import {
  setShowPapersForm,
  setShowPapersItems,
  setShowPapersList,
} from '../../../redux'

import EventsForm from './EventsForm'
import NewsLettersForm from './NewsLettersForm'
import MenusForm from './MenusForm'
import BrevesForm from './BrevesForm'
import ArticlesForm from './ArticleForm'
import PagesForm from './PagesForm'

const StyledButtonGrid = styled(Grid)(() => ({
  margin: '1rem 0 !important',
}))

function PaperForm({ paper: { queryKey, poster, def, entity, type } }) {
  const dispatch = useDispatch()

  const { currentPaperItem } = useSelector((state) => state.papers)
  const currentDatas = !currentPaperItem ? null : currentPaperItem.datas
  const theme = useTheme()

  const values = {
    initialdatas: currentDatas,
    poster: poster,
    def: def,
    queryKey: queryKey,
    type: type,
    entity: entity,
  }

  return (
    <Grid container>
      <StyledButtonGrid item container alignItems="center">
        <ButtonComponent
          icon={<BackspaceIcon />}
          background={theme.palette.info.main}
          width="200px"
          text="retour"
          onClick={() => {
            dispatch(setShowPapersForm(false))
            dispatch(setShowPapersList(true))
            dispatch(setShowPapersItems(true))
          }}
        />
      </StyledButtonGrid>

      {def === 'page' && <PagesForm {...values} />}

      {def === 'events' && <EventsForm {...values} />}
      {(type === 'activite' || type === 'info') && <ArticlesForm {...values} />}
      {type === 'newsletter' && <NewsLettersForm {...values} />}
      {type === 'menu' && <MenusForm {...values} />}
      {type === 'breve' && <BrevesForm {...values} />}
    </Grid>
  )
}

PaperForm.defaultProps = null
PaperForm.propTypes = {
  paper: PropTypes.shape({
    queryKey: PropTypes.arrayOf(PropTypes.string),
    poster: PropTypes.func,
    def: PropTypes.string,
    entity: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default PaperForm
