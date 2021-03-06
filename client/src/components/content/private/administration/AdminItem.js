import { Box, Button, styled, Typography } from '@material-ui/core'
import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { Link, useRouteMatch } from 'react-router-dom'
import { useToggle } from '../../../../utils/hooks'

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: '0.8em 0.2em !important',
  width: '90%',
  background: theme.palette.primary.main,
}))
const StyledSubItemBox = styled(Box)(({ theme }) => ({
  height: '3em',
  width: '100%',
  color: 'white',
  background: theme.palette.primary.light,
}))

const StyledButton = styled(Button)(({ theme, active }) => ({
  height: '3em',
  width: '100%',
  padding: '0.5em ',
  textAlign: 'rigth',
}))

function AdminItem({ adminItem }) {
  let { url } = useRouteMatch()
  const { path, name, subitems } = adminItem

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box>
          <StyledButton
            style={{ justifyContent: 'space-between', paddingLeft: '8px' }}
          >
            {name}
          </StyledButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {
          <StyledSubItemBox>
            {subitems &&
              subitems.map((subitem) => (
                <Link
                  to={`${url}${subitem.path}`}
                  style={{ textDecoration: 'none' }}
                  key={subitem.id}
                >
                  <Box>
                    <Typography variant="button">{subitem.name}</Typography>
                  </Box>
                </Link>
              ))}
          </StyledSubItemBox>
        }
      </AccordionDetails>
    </StyledAccordion>
  )
}

export default AdminItem
