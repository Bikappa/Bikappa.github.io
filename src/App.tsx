import React, { createRef, RefObject } from 'react'
import logo from './logo.png'
import './App.css'
import { Spacer, IntroductionSlide } from './components'

import { Fab, makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { createMuiTheme, darken, easing, ThemeProvider } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import '@fontsource/oxygen'
import { ArrowDownward } from '@material-ui/icons'
import { Element } from 'react-scroll'
import { slide } from './styles'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { joinClasses } from './utils'
import gsap from 'gsap'

const theme = createMuiTheme({
  palette: {
    mode: 'dark',
    background: {
      default: grey[900],
      paper: darken(grey[900], 0.1),
    },
  },
  typography: {
    fontFamily: 'Oxygen',
    fontSize: 15,
  },
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    fontFamily: theme.typography.fontFamily
  },
  appHeader: {
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
  },
  logo: {
    height: '30vh',
    '& > img': {
      maxHeight: '90%',
      maxWidth: '90%',
    }
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

  const [lastScrollDirection, setLastScrollDirection] = useState(0)
  const handleScroll = useCallback((e: WheelEvent | Event) => {

    if (e instanceof WheelEvent) {
      if (window.scrollY === 0 && e.deltaY < 0) {
        setScrolled(false)
      } else {
        setLastScrollDirection(e.deltaY > 0 ? 1 : (e.deltaY < 0 ? -1 : 0))
      }

    } else {
      setScrolled((prev) => {
        console.log(document.body.scrollTop,  document.documentElement.scrollTop )
        return document.body.scrollTop > 40 || document.documentElement.scrollTop  > 40;
        if (window.scrollY > 0) {
          return true
        } else if (window.scrollY === 0 && lastScrollDirection === -1) {
          return false
        }
        return prev

      })
    }

  }, [setScrolled, lastScrollDirection])

  useEffect(() => {

    document.addEventListener('scroll', handleScroll)

   // document.addEventListener('wheel', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
     // document.removeEventListener('wheel', handleScroll)
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
      .to(targets, { height: 0, margin: '0px', duration: 0.3 }, 0.5)
      .to(targets, { display: 'none', duration: 0 }, 0.8);
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
  const refs: RefObject<HTMLElement>[] = new Array(7).fill(null).map(() => createRef())
  const [[
    nameRef,
    titleRef,
    headerRef,
    nextButtonRef,
    spacerRef,
    spaceHolderRef,
    logoRef]] = useState(refs)

  const [tween] = useState(gsap.timeline({ repeat: 0 }).pause())
  useEffect(() => {

    tween.to(nameRef.current, {
      duration: 0.5,
      height: 0,
      margin: 0,
    }, 0)
      .to(nameRef.current, {
        display: 'none',
        duration: 0
      }, 0.5)
      .fade(titleRef.current, {}, 0)
      .fade(nextButtonRef.current, {
        duration: 0.3
      }, 0)
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
      //reduce the space held by the header, so next slide enter the view
      .to(spaceHolderRef.current, {
        duration: 0.8,
        marginTop: '-93vh',
        ease: 'power2'
      }, 0.5)

  }, [nameRef, titleRef, headerRef, nextButtonRef, logoRef, spacerRef, spaceHolderRef, tween])

  useEffect(() => {

    if (collapsed) {
      tween.play();
    }
    if (!collapsed) {
      tween.reverse();
    }

  }, [collapsed, tween])

  return <>
    <Box
      component='header'
      ref={headerRef}
      {...joinClasses(classes.slide, classes.appHeader)}
      height='100vh'
      width='100vw'
      position='fixed'
      top='0px'
      justifyContent='stretch'
    >
      <Box flexGrow={1} minHeight='1vh' />
      <Box>
        <Box className={classes.logo} ref={logoRef} >
          <img src={logo} alt='logo' />
        </Box>

        <Typography ref={nameRef} {...joinClasses(classes.name)} variant='h4'>
          Luca Bianconi
        </Typography>
        <Box ref={spacerRef}>
          <Spacer />
        </Box>
        <Typography ref={titleRef} className={classes.title} variant='h5'>
          Software Engineer &middot; Technology enthusiast &middot; Creative individual
        </Typography>
      </Box>
      <Box flexGrow={1} />
      <Box m={3} {...{ ref: nextButtonRef }}>
        <Fab color='primary' aria-label='edit' className='' onClick={onNext}>
          <ArrowDownward />
        </Fab>
      </Box>
    </Box>
    <Box height='100vh' ref={spaceHolderRef} />
  </>
}

export default App
