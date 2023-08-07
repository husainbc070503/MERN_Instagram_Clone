import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/InstaContext";
import { useParams } from "react-router-dom";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Comments from "./Comments";

const SinglePost = () => {
  const { getSinglePost, singlePost } = useGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    getSinglePost(id);
  }, [id, singlePost?.comments]);

  return (
    <Container maxWidth="md">
      <div className="container">
        <Grid container spacing={5} mt={5}>
          <Grid item md={4} xs={12}>
            {singlePost?.postType === "image/jpeg" ? (
              <img
                src={singlePost?.image}
                alt="single-post-image"
                className="single-post-image"
              />
            ) : (
              <video autoPlay controls loop className="single-post-image">
                <source
                  src={singlePost?.image}
                  type={singlePost?.postType}
                ></source>
              </video>
            )}
          </Grid>
          <Grid item md={8} xs={12}>
            <div className="post-profile">
              <Avatar
                src={singlePost?.user?.profile}
                alt={singlePost?.user?.name}
              />
              <div className="name">
                <Typography className="Typography name" color="primary">
                  {singlePost?.user?.name}
                </Typography>
                <Typography className="Typography id">
                  {singlePost?.user?.instaId}
                </Typography>
              </div>
            </div>
            <Typography className="Typography heading">
              {singlePost?.heading}
            </Typography>
            <Typography className="Typography body">
              {singlePost?.body}
            </Typography>
          </Grid>
        </Grid>
        <Comments comments={singlePost?.comments} id={singlePost?._id} />
      </div>
    </Container>
  );
};

export default SinglePost;
