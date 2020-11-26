import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useSelector} from 'react-redux';
import ProfileContainer from '../../profile/ProfileContainer';

const drawerWidth = '22%';

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      fontFamily: 'IBM Plex Sans'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: props => ({
      width: drawerWidth,
      top: props.topHeight,
      background: theme.palette.neutral.darkNavy,
      color: theme.palette.neutral.white,
      borderRight: 0
    }),
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      overflowX: 'hidden'
      //padding: theme.spacing(3)
    }
  };
});

export default function PermanentDrawerLeft(props) {
  const {headerHeight} = useSelector(state => state.layout);
  const [topHeight, setTopHeight] = useState(headerHeight);
  const classes = useStyles({topHeight});

  useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop < headerHeight)
        setTopHeight(headerHeight - e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [headerHeight]);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left">
        <ProfileContainer />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
