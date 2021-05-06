import { makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        textAlign: 'center',
        display: 'block'
    },
    colored: {
        backgroundColor: theme.palette.primary.dark,
        height: theme.spacing(1),
        width: theme.spacing(8),
        display: 'inline-block'
    }
}));

export function Spacer() {
    const classes = useStyles();
    return <div className={classes.root}>
        <span className={classes.colored}/>
    </div>
}