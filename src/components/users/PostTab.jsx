import React from "react";
import { Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/InstaContext";
import { api } from "../../utils/Api";
import { toast } from "react-toastify";

const PostTab = ({ posts }) => {
  const { user } = useGlobalContext();

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

  return (
    <Grid container>
      {posts?.map((p) => {
        const { image, likes, comments, _id, postType } = p;
        return (  
          <Grid item md={4} xs={12} key={_id}>
            <div className="insta-user-post-image">
              {postType === "image/jpeg" ? (
                <img src={image} alt={_id} />
              ) : (
                <video autoPlay controls loop>
                  <source src={image} type={postType}></source>
                </video>
              )}
              <div className="overlay">
                <Grid container textAlign="center">
                  <Grid item md={6} xs={6}>
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
                    <Typography className="Typography overlay-text">
                      {likes.length} likes
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <Link
                      className="text-decoration-none"
                      to={`../post/${_id}`}
                    >
                      <ChatBubbleIcon className="icon" color="warning" />
                      <Typography className="Typography overlay-text">
                        {comments.length} comments
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostTab;
