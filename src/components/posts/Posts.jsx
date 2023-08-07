import { Container, Grid } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../contexts/InstaContext";
import PostCard from "./PostCard";

const Posts = () => {
  const { posts } = useGlobalContext();

  return (
    <Container maxWidth="lg">
      <div className="container posts-container">
        <Grid container spacing={2}>
          {posts.length > 0 &&
            posts.map((p) => {
              return (
                <Grid item md={4} xs={12} key={p._id}>
                  <PostCard post={p} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </Container>
  );
};

export default Posts;
