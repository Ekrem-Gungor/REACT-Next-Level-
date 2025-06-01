import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../pages/account/accountSlice";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";

const links = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Products",
    to: "/products",
  },
  {
    title: "Errors",
    to: "/errors",
  },
];

const authLinks = [
  {
    title: "Login",
    to: "/login",
  },
  {
    title: "Register",
    to: "/register",
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const { cart } = useSelector((state) => state.cart);
  const itemCount = cart?.cartItems.reduce(
    (total, item) => total + item.product.quantity,
    0
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "error.dark" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton color="inherit">
            <ShoppingCartOutlinedIcon />
          </IconButton>
          {links.map((link) => (
            <Button
              key={link.title}
              component={NavLink}
              to={link.to}
              color="inherit"
            >
              {link.title}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            size="large"
            edge="start"
          >
            <Badge badgeContent={itemCount} color="error">
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>
          {user ? (
            <>
              <Button
                id="user-button"
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
                color="inherit"
              >
                {user.username}
              </Button>

              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to={"/orders"}>
                  Orders
                </MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {authLinks.map((link) => (
                <Button
                  key={link.title}
                  component={NavLink}
                  to={link.to}
                  color="inherit"
                >
                  {link.title}
                </Button>
              ))}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
