import { alpha, Button, colors } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { NavLink, NavLinkProps, useNavigate } from "react-router-dom";

const FilterLink = ({ to, ...rest }: NavLinkProps) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [showPending, setShowPending] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (isPending) {
      timeout = setTimeout(() => {
        setShowPending(true);
      }, 10);
    } else {
      clearTimeout(timeout);
      setShowPending(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isPending]);

  const activeStyle = {
    border: `1px solid ${colors.indigo[500]}`,
    backgroundColor: alpha(colors.indigo[500], 0.12),
  };

  return (
    <Button
      {...rest}
      to={to}
      component={NavLink}
      // @ts-ignore
      style={({ isActive }) =>
        isActive || showPending ? activeStyle : undefined
      }
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          navigate(to);
        });
      }}
    />
  );
};

export default FilterLink;
