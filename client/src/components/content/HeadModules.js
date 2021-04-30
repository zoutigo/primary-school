import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { TweenMax, Power3 } from 'gsap'
import { useLocation } from 'react-router-dom'
import SmallScreenToogleShow from './HighOrderComponents/SmallScreenToogleShow'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    background: 'transparent',
    // backgroundSize: 'cover',
    // background: `linear-gradient(to top, transparent 50%, white),
    //     url(${img})`,
    // backgroundPosition: 'bottom 25% left',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '28vh',
    maxHeight: '28vh',
    [theme.breakpoints.down('sm')]: {
      minHeight: '15vh',
      maxHeight: '15vh',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      minHeight: '22vh',
      maxHeight: '22vh',
    },
  },
  content: {
    fontFamily: "'Archivo Black', sans-serif",
    letterSpacing: '1px',
    fontSize: '6em',
    textAlign: 'center',
    lineHeight: '45vh',
    color: theme.palette.success.light,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5em',
      lineHeight: '80vh',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '2.5em',
      lineHeight: '38vh',
    },
  },
  mobileContent: {
    color: theme.palette.success.light,
    transition: '1000 ease',
  },
}))

function HeadModules(props) {
  const classes = useStyles()
  const { rubric, category, chapter } = useLocation()
  const { toogleHeadModulesClass } = props

  let slider = useRef(null)

  useEffect(() => {
    TweenMax.from(slider, 2.5, { y: -1000, opacity: 1, ease: Power3.easeOut })
  }, [rubric, category, chapter])

  return (
    <div
      className={`${classes.root} ${classes.content} ${toogleHeadModulesClass}`}
    >
      <div
        ref={(el) => {
          slider = el
        }}
      >
        {/* {' '}
        {contentText}{' '} */}
      </div>
    </div>
  )
}

HeadModules.propTypes = {
  toogleHeadModulesClass: PropTypes.object,
}

export default SmallScreenToogleShow(HeadModules)
