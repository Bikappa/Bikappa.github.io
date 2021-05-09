import { makeStyles, Theme, Box, BoxProps } from '@material-ui/core'
import { RefObject } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        textAlign: 'center',
        display: 'block'
    },
    colored: {
        backgroundColor: theme.palette.primary.dark,
        width: theme.spacing(8),
        display: 'inline-block',
        height: theme.spacing(1),
        borderRadius: theme.shape.borderRadius
    }
}));

export function Spacer(props: BoxProps) {
    const classes = useStyles();
    return <Box className={classes.root} {...props}>
        <span className={classes.colored}/>
    </Box>
}