import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import logo from "../../images/insta-icon.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/InstaContext";
import "./Header.css";

// Material UI Icons
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

const Header = () => {
  const { user } = useGlobalContext();
  const [open, setOpen] = React.useState(false);
  const [stick, setStick] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenUserMenu = () => setOpen(!open);
  const handleCloseUserMenu = () => setOpen(!open);

  const LinkIcon = [
    {
      id: 1,
      link: "/",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      link: "search",
      icon: <SearchIcon />,
    },
    {
      id: 3,
      link: "createPost",
      icon: <AddAPhotoIcon />,
    },
    {
      id: 4,
      link: "likes",
      icon: <FavoriteBorderIcon />,
    },
    {
      id: 5,
      link: "bookmarks",
      icon: <BookmarksIcon />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("insta-user");
    navigate("auth");
  };

  const scrollHandler = () => {
    if (window.scrollY >= 10) setStick(true);
    else setStick(false);
  };

  React.useEffect(() => {
    window.onscroll = () => scrollHandler();

    return () => (window.onscroll = () => scrollHandler());
  }, []);

  return (
    <Box>
      <AppBar position={stick ? "fixed" : "static"}>
        <Toolbar className="Toolbar nav">
          <div className="header-logo">
            <Avatar src={logo} alt="logo" />
            <Typography className="Typography logo-name" color="primary">
              Instagram
            </Typography>
          </div>
          <div className="links">
            {LinkIcon.map((item) => {
              const { id, link, icon } = item;
              return (
                <Link to={link} className="nav-link" key={id}>
                  <Typography color="primary">{icon}</Typography>
                </Link>
              );
            })}
          </div>
          {user.user && (
            <div className="profile">
              <Typography
                color="primary"
                className="Typography logout"
                onClick={handleLogout}
              >
                <LogoutIcon className="icon" />
              </Typography>
              <Box>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ cursor: "pointer" }}
                  >
                    <Avatar alt={user?.user?.name} src={user?.user?.profile} />
                  </IconButton>
                </Tooltip>
                <Menu
                  className="Menu profile-menu"
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleCloseUserMenu}
                >
                  {[
                    {
                      id: 1,
                      link: "account",
                      heading: "Account",
                    },
                    {
                      id: 2,
                      link: "updateProfile",
                      heading: "Edit Profile",
                    },
                  ].map((item) => {
                    const { id, link, heading } = item;
                    return (
                      <MenuItem onClick={handleCloseUserMenu} key={id}>
                        <Link className="profile-navlink" to={link}>
                          <Typography color="primary">{heading}</Typography>
                        </Link>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
