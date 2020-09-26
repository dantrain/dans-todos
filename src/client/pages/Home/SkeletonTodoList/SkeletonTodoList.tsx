import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const SkeletonTodoList = () => {
  const s = useStyles();

  return (
    <>
      <Divider />
      <List>
        {Array.from({ length: 3 }).map((_, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Box mx="11px">
                <Skeleton width={20} height={34} animation="wave" />
              </Box>
            </ListItemIcon>
            <ListItemText>
              <Skeleton
                height={34}
                width={80 + 20 * (((index + 1) % 2) * ((index + 1) % 5))}
                animation="wave"
              />
            </ListItemText>
            <ListItemSecondaryAction>
              <Box mx="14px">
                <Skeleton width={20} height={34} animation="wave" />
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Toolbar className={s.toolbar}>
        <Skeleton width={90} height={34} animation="wave" />
        <Skeleton width={210} height={34} animation="wave" />
        <Skeleton width={140} height={34} animation="wave" />
      </Toolbar>
    </>
  );
};

export default SkeletonTodoList;
