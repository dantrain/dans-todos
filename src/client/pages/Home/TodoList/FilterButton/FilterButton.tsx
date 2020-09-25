import { Button, ButtonProps, fade, makeStyles } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import React, { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

const useStyles = makeStyles({
  active: {
    border: `1px solid ${indigo[500]} !important`,
    backgroundColor: fade(indigo[500], 0.04),
  },
});

type FilterButtonProps = ButtonProps & NavLinkProps;

const FilterButton: FC<FilterButtonProps> = ({ children, ...rest }) => {
  const s = useStyles();

  return (
    <Button component={NavLink} activeClassName={s.active} {...rest}>
      {children}
    </Button>
  );
};

export default FilterButton;
