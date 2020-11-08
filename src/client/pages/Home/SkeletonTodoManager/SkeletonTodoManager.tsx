import {
  Box,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import hasTouchScreen from '../../../utils/hasTouchScreen';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  buttonGroup: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-flex',
      order: -1,
      flex: '1 0 100%',
      justifyContent: 'center',
      padding: '4px 0 16px',
      margin: '0 -24px 8px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
}));

const SkeletonTodoManager = () => {
  const s = useStyles();

  return (
    <>
      <CardHeader
        avatar={
          <Box mx="11px" py="7px">
            <Skeleton width={20} height={34} animation="wave" />
          </Box>
        }
      />
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
              {hasTouchScreen && (
                <Box mx="14px">
                  <Skeleton width={20} height={34} animation="wave" />
                </Box>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Toolbar className={s.toolbar} style={{ padding: '8px 16px 10px' }}>
        <Skeleton width={90} height={34} animation="wave" />
        <div className={s.buttonGroup}>
          <Skeleton width={210} height={34} animation="wave" />
        </div>
        <Skeleton width={140} height={34} animation="wave" />
      </Toolbar>
    </>
  );
};

export default SkeletonTodoManager;
