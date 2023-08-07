import React from "react";
import { useGlobalContext } from "../../contexts/InstaContext";
import { Container, Typography } from "@mui/material";
import BookmarkCard from "../bookmarks/BookmarkCard";

const Likes = () => {
  var { posts, user } = useGlobalContext();
  posts = posts?.filter((post) =>
    post.likes.find((p) => p._id === user?.user?._id)
  );

  return (
    <Container maxWidth="sm">
      <div className="container">
        <Typography color="primary" className="Typography header">
          Like Posts
        </Typography>
        {posts?.length > 0 ? (
          posts?.map((post) => {
            return <BookmarkCard p={post} fromLikes={true} />;
          })
        ) : (
          <Typography>No post liked till now</Typography>
        )}
      </div>
    </Container>
  );
};

export default Likes;
