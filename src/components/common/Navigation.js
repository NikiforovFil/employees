import {makeStyles} from '@material-ui/core/styles'
import React, {useCallback, useState} from "react";
import {Hidden} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import ServiceItem from 'components/common/NavigationItem'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100%-${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    }
}))

export default function Navigation({loading, services, title = ''}) {
    const classes = useStyles()
    const [mobileOpen, setMobileOpen] = useState(false)
    const handlerDrawerToggle = useCallback(() => {
        setMobileOpen(!mobileOpen)
    }, [mobileOpen])

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {loading || !services ? (
                    <Grid container justifyContent='center'>
                        <CircularProgress/>
                    </Grid>
                ) : (
                    services.map(({id, jobId, title}) => (
                        <ServiceItem key={id} jobId={jobId} title={title}/>
                    ))

                )}
            </List>
        </div>
    )

    return (
        <>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handlerDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant={'h6'} noWrap style={{marginLeft:"auto"}}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label={'mailbox folders'}>
                <Hidden smUp implementation={'css'}>
                    <Drawer
                        container={() => document.body}
                        open={mobileOpen}
                        onClose={handlerDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation={'css'}>
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant={'permanent'}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    )
}
