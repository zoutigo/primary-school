import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, TextField } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'

import React from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import BackspaceIcon from '@material-ui/icons/Backspace'

import ButtonComponent from '../../../components/others.js/ButtonComponent'
import { paperSchema } from '../../forms/validators'

import {
  setCurrentPaperItem,
  setFormAction,
  setShowPapersForm,
  setShowPapersInnerForm,
  setShowPapersItems,
  setShowPapersList,
} from '../../../redux'

import PagesFields from './fields/PagesFields'
import PapersFields from './fields/PapersFields'
import paperparams from '../paperparams'
import EventsForm from './EventsForm'
import NewsLettersForm from './NewsLettersForm'
import MenusForm from './MenusForm'
import BrevesForm from './BrevesForm'

function PaperForm({ paper: { queryKey, poster, def, entity, type } }) {
  const dispatch = useDispatch()
  const { submitButtonText } = paperparams(def)

  const { formAction: action, currentPaperItem } = useSelector(
    (state) => state.papers
  )
  const currentDatas = !currentPaperItem ? null : currentPaperItem.datas
  const theme = useTheme()
  const token = useSelector((state) => state.user.Token.token)

  const {
    register,
    control,
    errors,
    setValue,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    // mode: 'onChange',
    //   resolver: yupResolver(paperSchema),
  })

  return (
    <Grid container>
      {action === 'create' && (
        <Grid item container alignItems="center">
          <ButtonComponent
            disabled={isSubmitting}
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
        </Grid>
      )}
      {def === 'page' && (
        <PagesFields control={control} initialdatas={currentDatas} />
      )}
      {def === 'activites' && (
        <PapersFields
          control={control}
          initialdatas={action === 'create' ? null : currentDatas}
        />
      )}
      {def === 'events' && (
        <EventsForm
          initialdatas={currentDatas}
          def={def}
          poster={poster}
          queryKey={queryKey}
        />
      )}
      {type === 'newsletter' && (
        <NewsLettersForm
          def={def}
          queryKey={queryKey}
          poster={poster}
          type={type}
        />
      )}
      {type === 'menu' && (
        <MenusForm
          initialdatas={currentDatas}
          def={def}
          queryKey={queryKey}
          poster={poster}
          type={type}
        />
      )}
      {type === 'breve' && (
        <BrevesForm
          initialdatas={currentDatas}
          def={def}
          queryKey={queryKey}
          poster={poster}
          type={type}
        />
      )}
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
