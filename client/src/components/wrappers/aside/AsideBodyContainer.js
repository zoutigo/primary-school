import { withStyles } from '@material-ui/styles'
import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import AsideItem from './AsideItem'
import randomkey from '../../../utils/randomkey'

const styles = (theme) => ({
  root: {
    background: 'yellow',
    width: '50%',
    // marginLeft: '20%',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      marginLeft: '0px',
    },
  },
})

function AsideBodyContainer({ items, rubricColors }) {
  const BodyContainer = withStyles(styles)(({ classes, elements, colors }) => (
    <Grid item container className={classes.root}>
      {elements.map((element) => (
        <AsideItem
          item={element}
          rubricColors={colors}
          key={randomkey(9876543)}
        />
      ))}
    </Grid>
  ))
  return <BodyContainer elements={items} colors={rubricColors} />
}

AsideBodyContainer.propTypes = {
  rubricColors: PropTypes.shape({
    ligth: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.element, PropTypes.string).isRequired,
}

export default AsideBodyContainer
