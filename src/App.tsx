import React from 'react'
import logo from './logo.png'
import './App.css'
import { Spacer } from './components'


import { Fab, makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import '@fontsource/oxygen'
import { ArrowDownward } from '@material-ui/icons'
import { Element, scroller } from 'react-scroll'


const theme = createMuiTheme({
  palette: {
    background: {
      default: grey[900],
    },
  },
  typography: {
    fontFamily: 'Oxygen'
  },
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    fontFamily: theme.typography.fontFamily
  },
  appHeader: {
    textAlign: 'center'
  },
  logo: {
    width: '300px'
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
  },
  title: {
    color: grey[500],
    margin: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  slide: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)'
  }
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

  const nextHandler = () => {
    scroller.scrollTo('introduction', {
      smooth: 'true'
    })
  }
  return (
    <div className={classes.root}>
      <Landing onNext={nextHandler} />
      <Element name='introduction'>
        <Introduction />
      </Element>
    </div >
  )
}


function Introduction() {
  const classes = useStyles()
  return <div className={`${classes.slide} ${classes.appHeader}`}> <h1>Introduction</h1></div>
}

function Landing({
  onNext
}: {
  onNext: () => void
}) {
  const classes = useStyles()
  return (<header className={classes.slide + ' ' + classes.appHeader}>
    <div className={classes.grow} />
    <Box>
      <img src={logo} className={classes.logo} alt='logo' />
      <Typography className={classes.name} variant='h4'>
        Luca Bianconi
      </Typography>
      <Spacer />
      <Typography className={classes.title} variant='h5'>
        Software Engineer &middot; Technology enthusiast &middot; Creative individual
      </Typography>
    </Box>
    <div className={classes.grow} />
    <Box m={3}>
      <Fab color='primary' aria-label='edit' className='' onClick={onNext}>
        <ArrowDownward />
      </Fab>
    </Box>
  </header>)
}

export default App
