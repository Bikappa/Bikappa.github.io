import {
  makeStyles,
  Theme,
  Paper,
  darken,
  Box,
  BoxProps
} from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import {
  AccessTime,
  ExploreOutlined,
  FaceOutlined,
  LocationOnOutlined,
  SchoolOutlined,
  AccountBalance,
  HomeOutlined
} from "@material-ui/icons";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { slide } from '../styles'
import { Spacer } from "./spacer";

const useStyles = makeStyles((theme: Theme) => {
  const cardBgColor = darken(theme.palette.background.default, 0.1)
  const cardColor = theme.palette.getContrastText(cardBgColor)
  const darkText = darken(cardColor, 0.7)

  const staticButton: CSSProperties = {
    color: darkText,
    fontWeight: theme.typography.fontWeightBold,
    cursor: 'pointer',
    textDecoration: 'none',
  }

  return {
    slide,
    age: {
      cursor: 'pointer'
    },
    card: {
      backgroundColor: cardBgColor,
      color: cardColor,
      /*height: '25vh',*/
      width: '100%',
      padding: '20px',
      boxSizing: 'border-box'
    },
    cardHeader: {
      color: darkText
    },
    introCardGrid: {
      flexGrow: 1,
      fontSize: theme.typography.fontSize,
      paddingLeft: '10vw',
      paddingRight: '10vw',
    },
    connection: {
      flexGrow: 1,
      borderRight: '0.5em dashed ' + cardBgColor
    },
    factButton: {
      ...staticButton,
      '& > a': {
        ...staticButton,
        '&:visited': {
          ...staticButton
        }
      },
    }
  }
})

const ageUnitRotation = [{
  format: 'y',
  name: 'years',
}, {
  format: 'd',
  name: 'days',
}, {
  format: 's',
  name: 'seconds',
}]

export function IntroductionSlide() {
  const classes = useStyles();

  const [ageUnitIdx, setAgeUnitIdx] = useState(0);

  const handleAgeClick = () => {
    setAgeUnitIdx((prev) => {
      return ++prev % ageUnitRotation.length;
    })
  }
  const birthDate = DateTime.local(1992, 7, 20, 6, 14, 0).setZone('Europe/Rome')
  const localNow = DateTime.local()
  const age = localNow.diff(birthDate)

  const ageUnit = ageUnitRotation[ageUnitIdx]

  const IntroCard = ({ content, footer }: { content: React.ReactNode, footer?: React.ReactNode }) => {
    return (<Paper variant='outlined' elevation={1} className={classes.card}>
      <Box display='flex' flexDirection='column' height='100%'>
        <Box flexGrow={1}>
          {content}
        </Box>
        {footer}
      </Box>
    </Paper>)
  }


  const CardHeader = (props: BoxProps) => {
    const { children } = props;

    return <Box textAlign='center' className={classes.cardHeader}>
      {children}
      <Spacer mt={1} mb={3} />
    </Box>
  }
  return <Box display='flex' flexDirection='column' className={classes.slide} justifyContent='space-between' height='93vh'>
    <h1>Hi, I'm Luca</h1>

    <Box display='flex' className={classes.introCardGrid} justifyContent='space-around'>
      <Box display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' flexGrow={1} padding='1em' flexBasis='33.33%'>
        <Box mt={10} mb={3} >
          <IntroCard
            content={<>
              <CardHeader><FaceOutlined fontSize='large' /></CardHeader>
              I'm happy when I understand the world around me. I'm satisfied when I can use that knowledge to realize things
            </>
            }
            footer={<p>

            </p>}
          />
        </Box>
        <div className={classes.connection} />
        <Box mt={3} mb={3} display='flex' alignItems='center' className={classes.factButton}>
          <a href='https://goo.gl/maps/NdAcWEFFzw62KRzq5' target='blank' rel='noopener' >
            <LocationOnOutlined fontSize='large' style={{ verticalAlign: 'middle' }} />Born in Verona, Italy
          </a>
        </Box>

        <div className={classes.connection} />
        <Box mt={3} mb={6} display='flex' alignItems='center' onClick={handleAgeClick} className={classes.factButton}>
          <AccessTime fontSize='large' style={{ verticalAlign: 'middle' }} /> {`${age.toFormat(ageUnit.format)} ${ageUnit.name} ago`}
        </Box>
      </Box>

      <Box display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' flexGrow={1} padding='1em' flexBasis='33.33%'>
        <Box mt={16} mb={3} display='flex' alignItems='center' className={classes.factButton}>
          <AccountBalance fontSize='large' /> M.Sc. in Computer Engineering &middot; University of Padua
        </Box>
        <div className={classes.connection} />
        <Box mt={3} mb={13}>
          <IntroCard
            content={<>
              <CardHeader><SchoolOutlined fontSize='large' /></CardHeader>
              Some time ago I realized I like computer science, so I pursued a degree in computer science engineering, and got it
            </>}
          />
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' flexGrow={1} padding='1em' flexBasis='33.33%' maxWidth='33%'>
        <Box maxHeight='230px' overflow='hidden' borderRadius={5} mt={3} mb={3}>
          <Box mt='-115px'>
          <img alt='Travel' width='100%' src='https://lh3.googleusercontent.com/HGHrioS-mqNzMKvxoJwu7vrTj5K67ozuay6nVOmwuVDeSv7A82iUIaTkOkAk5Mnlycg0SMNOjlnVERcKILr7AQxn75bkHyXOfr9fUvGKS3p2QmoYR4ns95rOU-tsDgeo0W4kZR-tZRxcEtLBLKXGr2gTSKCR0YxwUMaz7d5-9peOQL4XUfl6zgYUlHsKVYLKrktP4TsoTYxBilNS1e7lKprayRYXiKF-chDjBpQFqBQUUstJkqCZowjfmmuvtF1uyj54kb_Vicui-O12fdRfp53eydTc-RiWmhPWaXMKdolzP8DiBxmV7cuBqaKsPrGNzH-gRCbHY7zFzf-aN7IL6DVf3IeTRCMMHWRptYwUJhogF22hhpiA3bSithHcUyc5xbXWuXSPcoVAnv3bGG4lpqfcxwRwPaaHoa5uosPU-k-gZ5n6UOSeYNFp-b_6Q9WgJvuPJOe0gQl0hKvd64U8pUeay7CcNhXV_Pv784pzHdzYBkmXJ89aRYb-Z3PyeDZpNlGXPsdS_qsw2jxgppl6NPHGyzee3l2g9utQJktnZKVdG2TSjvS7AUMTh2gmhLIoyu5nABcObVINTamWv0WH5nttOXu-8rTbVWZbTVmLU7XV7Ej8ZuFqbeHy0ZsL9yjvA1vwRmgxnWSeRZU3unjdtPoV1xss0RP5PNXmNIsrhvbnPrWpSjdMPCr1Y436UEwBPRQMbocxTzpv5DrMXKTHOAQq3Q=s937-no?authuser=0' ></img>
          </Box>
        </Box>


        <div className={classes.connection} />
        <Box mt={3} mb={3}>
          <IntroCard
            content={<>
              <CardHeader><ExploreOutlined fontSize='large' /></CardHeader>
              Besides work, I look for new things to enjoy, new places to discover, projects to start and never finish.
              I'm eager to learn science more and I'm especially affascinated by robototics as it connects 3 worlds I like,
              computer science, electronics and physics.
            </>}
          />
        </Box>
        <div className={classes.connection} />
        <Box mt={3} mb={3} display='flex' alignItems='center' className={classes.factButton}>
          <a href='https://goo.gl/maps/ACNzUbZdLYzJS93e6' target='blank' rel='noopener' >
            <HomeOutlined fontSize='large' style={{ verticalAlign: 'middle' }} />Located in Berlin, Germany
          </a>
        </Box>
      </Box>
    </Box>
  </Box >
}