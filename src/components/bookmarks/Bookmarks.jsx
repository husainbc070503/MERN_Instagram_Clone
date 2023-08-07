import React from "react";
import { useGlobalContext } from "../../contexts/InstaContext";
import { Container, Grid, Typography } from "@mui/material";
import BookmarkCard from "./BookmarkCard";

const Bookmarks = () => {
  const { bookmarks } = useGlobalContext();

  return (
    <Container maxWidth="lg">
      <div className="container">
        <Typography color="primary" className="Typography header">
          Book Marks
        </Typography>
        {bookmarks?.length > 0 ? (
          <Grid container spacing={2}>
            {bookmarks?.map((mark) => {
              return (
                <Grid item md={4} key={mark._id} xs={12}>
                  <BookmarkCard p={mark} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography>No bookmarks</Typography>
        )}
      </div>
    </Container>
  );
};

export default Bookmarks;
