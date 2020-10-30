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
} from "@material-ui/core";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import Progress from "../../components/Progress/Progress";
import { AppContext } from "../App";

declare global {
  interface Window {
    google: any;
  }
}

const useStyles = makeStyles((theme) => ({
  titleLink: { flexGrow: 1, textDecoration: "none", color: "inherit" },
  avatarButton: { "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" } },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: "#4791db",
  },
}));

const AppBar = () => {
  const context = useContext(AppContext);
  const popupState = usePopupState({
    variant: "popover",
    popupId: "account-menu",
  });

  const handleSignOut = useCallback(async () => {
    window.google?.accounts?.id?.disableAutoSelect();
    await fetch("/signout", { method: "POST" });
    window.location.href = "/signin";
  }, []);

  const s = useStyles();

  return (
    <MaterialAppBar position="sticky">
      <Container maxWidth="sm">
        <Toolbar>
          <Link className={s.titleLink} title="Home" to="/">
            <Typography variant="h5" component="h1">
              {context.name ? `${context.name}'s Todos` : "Dan's Todos"}
            </Typography>
          </Link>
          {context.avatar && context.name ? (
            <>
              <IconButton
                className={s.avatarButton}
                color="inherit"
                size="small"
                {...bindTrigger(popupState)}
              >
                <Avatar className={s.avatar} src={context.avatar} />
              </IconButton>
              <Menu
                {...bindMenu(popupState)}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
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
