import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../contexts/InstaContext";
import {
  Button,
  Container,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import "./User.css";
import Tabs from "./Tabs";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import FollowersModal from "./FollowersModal";

const User = () => {
  const { getUser, getUserPosts, instaUser, instaUserPosts, user } =
    useGlobalContext();
  const { id } = useParams();

  const { profile, name, instaId, bio, followers, following, _id } =
    instaUser;

  const follow = async (id) => {
    try {
      const res = await fetch(`${api}/api/user/follow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ user: id }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem(
          "insta-user",
          JSON.stringify({ token: user?.token, user: data.res.followed })
        );
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
        theme: "colored",
      });
    }
  };

  const unfollow = async (id) => {
    try {
      const res = await fetch(`${api}/api/user/unfollow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ user: id }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem(
          "insta-user",
          JSON.stringify({ token: user?.token, user: data.res.unfollowed })
        );
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
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    getUser(id);
    getUserPosts(id);
  }, [id, instaUser]);

  return (
    <Container maxWidth="md">
      <div className="container">
        <div className="top-heading">
          <Typography className="Typography name">{name}</Typography>
          <Typography className="Typography id">{instaId}</Typography>
        </div>
        <Grid container spacing={4}>
          <Grid item md={3}>
            <div className="user-image">
              <img src={profile} alt={name} />
            </div>
          </Grid>
          <Grid item md={9}>
            <Grid container spacing={2} mb={4}>
              {[
                {
                  id: 1,
                  length: instaUserPosts?.length,
                  title: "Posts",
                },
                {
                  id: 2,
                  length: followers?.length,
                  title: "Followers",
                  modal: true,
                },
                {
                  id: 3,
                  length: following?.length,
                  title: "Following",
                },
              ].map((item) => {
                const { id, length, title, modal } = item;
                return modal && length > 0 ? (
                  <Grid
                    item
                    md={4}
                    xs={4}
                    textAlign="center"
                    key={id}
                    className="Grid pff"
                  >
                    <FollowersModal
                      users={followers}
                      id={id}
                      length={length}
                      title={title}
                    />
                  </Grid>
                ) : (
                  <Grid
                    item
                    md={4}
                    xs={4}
                    textAlign="center"
                    key={id}
                    className="Grid pff"
                  >
                    <Typography className="Typography len">{length}</Typography>
                    <Typography className="Typography title">
                      {title}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            <FormControl fullWidth>
              {user?.user?.following?.find((u) => u._id === _id) ? (
                <Button
                  color="primary"
                  variant="contained"
                  className="Button follow"
                  onClick={() => unfollow(id)}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => follow(id)}
                >
                  Follow
                </Button>
              )}
            </FormControl>
            <Typography className="Typography bio">{bio}</Typography>
          </Grid>
        </Grid>

        <Tabs posts={instaUserPosts} />
      </div>
    </Container>
  );
};

export default User;
