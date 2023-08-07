import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../contexts/InstaContext";
import Tabs from "../users/Tabs";
import FollowersModal from "../users/FollowersModal";

const Account = () => {
  const { user, myPosts } = useGlobalContext();
  const { name, instaId, profile, followers, following, bio } = user?.user;

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
                  length: myPosts?.length,
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
            {/* <FormControl fullWidth>
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
            </FormControl> */}
            <Typography className="Typography bio">{bio}</Typography>
          </Grid>
        </Grid>

        <Tabs posts={myPosts} />
      </div>
    </Container>
  );
};

export default Account;
