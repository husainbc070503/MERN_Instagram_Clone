import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Grid, Menu, MenuItem } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./Posts.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useGlobalContext } from "../../contexts/InstaContext";
import LikeModal from "./LikeModal";

const PostCard = ({ post }) => {
  const { user } = useGlobalContext();

  const {
    location,
    likes,
    _id,
    image,
    heading,
    postType,
    user: { instaId, profile, name },
  } = post;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenUserMenu = (e) => setAnchorEl(e.target);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const like = async (id) => {
    try {
      const res = await fetch(`${api}/api/post/like/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await res.json();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const dislike = async (id) => {
    try {
      const res = await fetch(`${api}/api/post/dislike/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await res.json();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const addToBookmark = async (id) => {
    try {
      const res = await fetch(`${api}/api/user/addBookmark`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ post: id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Post Bookmarked", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem(
          "insta-user",
          JSON.stringify({ token: user?.token, user: data.bookmark })
        );
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const removeFromBookmark = async (id) => {
    try {
      const res = await fetch(`${api}/api/user/removeBookmark`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ post: id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.info("Post Unbooked", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.setItem(
          "insta-user",
          JSON.stringify({ token: user?.token, user: data.bookmark })
        );
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await fetch(`${api}/api/post/deletePost/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Post Deleted", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Card
      className="Card post-card"
      onDoubleClick={() =>
        !likes?.find((p) => p._id === user?.user?._id) && like(_id)
      }
    >
      <CardMedia
        component={postType === "image/jpeg" ? "img" : "video"}
        className="CardMedia post-image"
        image={image}
        title={heading}
        autoPlay
        controls
        loop
      />
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item md={6}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item md={4} xs={2}>
                <Avatar src={profile} alt={name} />
              </Grid>
              <Grid item md={8} xs={8} className="Grid ml">
                <Typography className="Typography instaId">
                  <Link
                    className="text-decoration-none"
                    to={
                      post?.user?._id !== user?.user?._id &&
                      `user/${post?.user?._id}`
                    }
                  >
                    {instaId}
                  </Link>
                </Typography>
                <Typography className="Typography location">
                  {location}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <div className="post-right-content">
              <LikeModal likes={likes} />

              {likes?.find((p) => p._id === user?.user?._id) ? (
                <FavoriteIcon
                  className="post-icon"
                  color="error"
                  onClick={() => dislike(_id)}
                />
              ) : (
                <FavoriteBorderIcon
                  className="post-icon"
                  onClick={() => like(_id)}
                />
              )}

              <Box>
                <MoreHorizIcon
                  className="post-icon"
                  onClick={handleOpenUserMenu}
                />
                <Menu
                  className="Menu dropdown-menu"
                  id="menu-appbar"
                  anchorEl={anchorEl}
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={`post/${_id}`} className="dropdown-link">
                      <Typography color="primary">View Post</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link className="dropdown-link">
                      {user?.user?.bookmarks.find((post) => post === _id) ? (
                        <Typography
                          color="primary"
                          onClick={() => removeFromBookmark(_id)}
                        >
                          Remove Bookmark
                        </Typography>
                      ) : (
                        <Typography
                          color="primary"
                          onClick={() => addToBookmark(_id)}
                        >
                          Bookmark
                        </Typography>
                      )}
                    </Link>
                  </MenuItem>
                  {post?.user?._id === user?.user?._id && (
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        color="primary"
                        onClick={() => deletePost(_id)}
                      >
                        Delete Post
                      </Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostCard;
