import React from 'react'
import { Box, Grid, styled } from '@material-ui/core'

import { useSelector } from 'react-redux'

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
  const { subtitle, text, icon } = item

  const Roles = useSelector((state) => state.settings.Roles)
  const userRole = useSelector((state) => state.user.Credentials.role)

  const alias = 'apel'
  let pageRoles = []

  for (const [page, roles] of Object.entries(Roles)) {
    if (page === alias) {
      pageRoles = roles
    }
  }

  const roleIsAllowedToModify = pageRoles.includes(userRole)

  if (icon) {
    return (
      <StyledAsideItemAction rubriccolors={rubricColors}>
        {icon}
        <Box>
          {subtitle}
          {text}
        </Box>
      </StyledAsideItemAction>
    )
  }

  return (
    <StyledAsideItem rubriccolors={rubricColors} container>
      <Grid item xs={roleIsAllowedToModify ? 10 : 12}>
        <Grid item>{subtitle}</Grid>
        <Grid item>{text}</Grid>
      </Grid>
      <Grid item xs={roleIsAllowedToModify ? 2 : false}></Grid>
    </StyledAsideItem>
  )
}

export default AsideItem
