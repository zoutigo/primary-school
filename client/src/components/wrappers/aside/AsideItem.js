import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Paper,
  styled,
  Typography,
} from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'

export const StyledAsideItem = styled(Grid)(({ theme, rubriccolors }) => ({
  boxSizing: 'border-box',
  width: '100%',
  textAlign: 'center',
  minHeight: '5em',
  background: rubriccolors.ligth,
  '& >div': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    '& :div': {
      display: 'flex',
    },
  },
}))

const StyledAsideItemAction = styled(Box)(({ theme, rubriccolors }) => ({
  display: 'flex',
  width: '100%',
  boxSizing: 'border-box',
  background: rubriccolors.ligth,
  paddingTop: '2em !important',
  paddingBottom: '1em !important',
  '& div': {
    flex: 3,
  },
  '& .MuiIconButton-root': {
    color: rubriccolors.main,
    width: '35%',
  },
}))

function AsideItem({ item, rubricColors }) {
  const { subtitle, text } = item

  const [isEmail, setIsEmail] = useState(false)
  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    if (subtitle && subtitle.props && subtitle.props.subtitle) {
      setIsEmail(subtitle.props.subtitle === 'Email')
      setIsPhone(subtitle.props.subtitle === 'Telephone')
    }
    return () => {
      setIsEmail(false)
      setIsPhone(false)
    }
  }, [subtitle])

  if (isPhone || isEmail) {
    return (
      <StyledAsideItemAction rubriccolors={rubricColors}>
        {isPhone && (
          <IconButton href="tel:0474907880">
            <PhoneIcon style={{ fontSize: 70 }} />
          </IconButton>
        )}
        {isEmail && (
          <IconButton href="mailto: ogec-cremieu@yahoo.fr">
            <EmailIcon style={{ fontSize: 70 }} />
          </IconButton>
        )}
        <Box>
          {subtitle}
          {text}
        </Box>
      </StyledAsideItemAction>
    )
  }

  return (
    <StyledAsideItem rubriccolors={rubricColors} container>
      <Grid item container>
        <Grid item>{subtitle}</Grid>
        <Grid item>{text}</Grid>
      </Grid>
    </StyledAsideItem>
  )
}

export default AsideItem
