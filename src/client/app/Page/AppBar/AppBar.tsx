import {
  AppBar as MaterialAppBar,
  Avatar,
  Container,
  css,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Progress from '../../../components/Progress/Progress';
import signOut from '../../../utils/signOut';
import { Context } from '../../App';

const AppBar = () => {
  const context = useContext(Context);
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'account-menu',
  });

  const handleSignOut = useCallback(() => {
    signOut({ destroySession: true, disableAuto: true });
  }, []);

  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setInstallPrompt(e as BeforeInstallPromptEvent);
      });

      window.addEventListener('appinstalled', () => {
        setInstallPrompt(null);
      });
    }
  }, []);

  const handleInstall = useCallback(() => {
    installPrompt?.prompt();
  }, [installPrompt]);

  const theme = useTheme();

  return (
    <MaterialAppBar position="sticky">
      <div
        css={css`
          height: env(safe-area-inset-top);
          background-color: ${theme.palette.primary.dark};
        `}
      />
      <Container maxWidth="sm">
        <Toolbar tw="justify-between">
          <a
            tw="no-underline"
            css={css`
              color: inherit;
            `}
            title="Home"
            href="/"
          >
            <Typography variant="h5" component="h1">
              {context.name ? `${context.name}'s Todos` : "Dan's Todos"}
            </Typography>
          </a>
          {context.avatar && context.name ? (
            <>
              <IconButton
                tw="hover:bg-[rgba(0,0,0,0.1)]"
                color="inherit"
                size="small"
                disableRipple
                {...bindTrigger(popupState)}
              >
                <Avatar tw="w-8 h-8 bg-[#4791db]" src={context.avatar} />
              </IconButton>
              <Menu
                {...bindMenu(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {!!installPrompt && (
                  <MenuItem onClick={handleInstall}>Install app</MenuItem>
                )}
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
