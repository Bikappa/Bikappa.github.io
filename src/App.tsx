import React, { createRef, RefObject, useRef } from 'react'
import logo from './logo.png'
import './App.css'
import { Spacer, IntroductionSlide } from './components'

import { Fab, makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import '@fontsource/oxygen'
import { ArrowDownward } from '@material-ui/icons'
import { Element, scroller } from 'react-scroll'
import { slide } from './styles'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { joinClasses } from './utils'
import gsap from 'gsap/all'

const theme = createMuiTheme({
  palette: {
    background: {
      default: grey[900],
    },
  },
  typography: {
    fontFamily: 'Oxygen',
    fontSize: 15
  },
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    fontFamily: theme.typography.fontFamily
  },
  appHeader: {
    textAlign: 'center',
  },
  logo: {
    height: '30vh'
  },
  name: {
    color: grey[800],
    '&::before': {
      content: '"("'
    },
    '&::after': {
      content: '")"'
    },
    margin: theme.spacing(3),
    overflow: 'hidden',
    '&.collapsed': {
      height: '0px !important',
    }
  },
  title: {
    color: grey[500],
    margin: theme.spacing(3),
  },
  slide
}))


function App() {
  return (
    <ThemeProvider theme={theme}>
      <InsideTheme />
    </ThemeProvider>
  )
}

function InsideTheme() {
  const classes = useStyles()

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback((e: WheelEvent) => {
    setScrolled((prev) => {

      if (window.scrollY < 20 && e.deltaY < 0) {
        return false
      } else if (e.deltaY > 0 && window.scrollY >= 20) {
        return true
      }

      return prev
    })
  }, [setScrolled])

  useEffect(() => {

    document.addEventListener('wheel', handleScroll)

    return () => {
      document.removeEventListener('wheel', handleScroll)
    }
  })

  const nextHandler = () => {
    // scroller.scrollTo('introduction', {
    //   smooth: 'true'
    // })
  }

  return (
    <div className={classes.root}>
      <Landing onNext={nextHandler} collapsed={scrolled} />
      <Element name='introduction'>
        <IntroductionSlide />
      </Element>
    </div >
  )
}


// register the effect with GSAP:
gsap.registerEffect({
  name: 'fade',
  effect: (targets: gsap.TweenTarget, config: gsap.TweenVars) => {
    return gsap.timeline().to(targets, { duration: config.duration, opacity: 0 })
      .to(targets, { height: 0, margin: '0px', duration: 0.3}, 0.5)
      .to(targets, { display: 'none' }, 0.8);
  },
  defaults: { duration: 0.8 },
  extendTimeline: true,
});

function Landing(props: {
  onNext: () => void,
  collapsed: boolean,
}) {

  const { onNext, collapsed } = props
  const classes = useStyles()
  const refs: RefObject<HTMLElement>[] = new Array(6).fill(null).map(() => createRef())
  const [[
    nameRef,
    titleRef,
    headerRef,
    nextButtonRef,
    spacerRef,
    logoRef]] = useState(refs)

  const [tween] = useState(gsap.timeline({ repeat: 0 }).pause())
  useEffect(() => {

    tween.to(nameRef.current, {
      duration: 0.5,
      height: 0,
      margin: 0,
    }, 0)
      .fade(titleRef.current, {}, 0)
      .fade(nextButtonRef.current, {}, 0)
      .to(headerRef.current, {
        duration: 0.8,
        height: '7vh',
        minHeight: '7vh'
      }, 0.2)
      .to(logoRef.current, {
        duration: 0.8,
        height: '6vh'
      }, 0)
      .fade(spacerRef.current)
      .to(spacerRef.current, {
        duration: 0.4,
        x: '60vw'
      }, 0)

  }, [nameRef, titleRef, headerRef, nextButtonRef, logoRef, spacerRef, tween])

  useEffect(() => {

    if (collapsed) {
      tween.play();
    }
    if (!collapsed) {
      tween.reverse();
    }

  }, [collapsed, tween])

  return <Box component='header' {...{ ref: headerRef }}  {...joinClasses(classes.slide, classes.appHeader)} height='100vh'>
    {/* <Box flexGrow={1} /> */}
    <Box>
      <img ref={logoRef} src={logo} className={classes.logo} alt='logo' />
      <Typography ref={nameRef} {...joinClasses(classes.name)} variant='h4'>
        Luca Bianconi
      </Typography>
      <Box {...{ ref: spacerRef }}>
        <Spacer />
      </Box>
      <Typography ref={titleRef} className={classes.title} variant='h5'>
        Software Engineer &middot; Technology enthusiast &middot; Creative individual
      </Typography>
    </Box>
    {/* <Box flexGrow={1} /> */}
    <Box m={3} {...{ ref: nextButtonRef }}>
      <Fab color='primary' aria-label='edit' className='' onClick={onNext}>
        <ArrowDownward />
      </Fab>
    </Box>
  </Box>
}

export default App
