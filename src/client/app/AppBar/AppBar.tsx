import {
  AppBar as MaterialAppBar,
  Avatar,
  Container,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import React, { useCallback, useContext } from 'react';
import Progress from './Progress/Progress';
import signOut from '../../utils/signOut';
import { Context } from '../App';

const useStyles = makeStyles((theme) => ({
  toolbar: { justifyContent: 'space-between' },
  titleLink: { textDecoration: 'none', color: 'inherit' },
  avatarButton: { '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' } },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: '#4791db',
  },
}));

const AppBar = () => {
  const context = useContext(Context);
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'account-menu',
  });

  const handleSignOut = useCallback(() => {
    signOut({ destroySession: true, disableAuto: true });
  }, []);

  const s = useStyles();

  return (
    <MaterialAppBar position="sticky">
      <Container maxWidth="sm">
        <Toolbar className={s.toolbar}>
          <a className={s.titleLink} title="Home" href="/">
            <Typography variant="h5" component="h1">
              {context.name ? `${context.name}'s Todos` : "Dan's Todos"}
            </Typography>
          </a>
          {context.avatar && context.name ? (
            <>
              <IconButton
                className={s.avatarButton}
                color="inherit"
                size="small"
                disableRipple
                {...bindTrigger(popupState)}
              >
                <Avatar className={s.avatar} src={context.avatar} />
              </IconButton>
              <Menu
                {...bindMenu(popupState)}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </>
          ) : null}
        </Toolbar>
      </Container>
      <Progress />
    </MaterialAppBar>
  );
};

export default AppBar;
