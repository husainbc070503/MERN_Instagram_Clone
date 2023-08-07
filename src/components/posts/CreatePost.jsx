import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import noImage from "../../images/no-image.jpeg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styled from "@emotion/styled";
import "./Posts.css";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useGlobalContext } from "../../contexts/InstaContext";

const initialState = {
  image: noImage,
  heading: "",
  body: "",
  location: "",
  postType: "",
};

const InputGroup = styled(FormControl)`
  margin-bottom: 3rem;
`;

const Icon = styled(AddCircleIcon)`
  font-size: 2rem;
`;

const CreatePost = () => {
  const { user } = useGlobalContext();
  const [post, setPost] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload image or video", {
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

    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "video/mp4"
    ) {
      setLoading(false);
      return toast.error("Only JPEG/PNG images and mp4 videos are accepted.", {
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

    try {
      const url =
        file.type === "video/mp4"
          ? "https://api.cloudinary.com/v1_1/dztxhls16/video/upload"
          : "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "insta-clone");
      data.append("class", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (resp) {
        toast.success(
          "Post Image/Video Uploaded. Wait a minute to see the change.",
          {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );

        setPost({ ...post, image: resp.url, postType: file.type });
      } else {
        toast.error("Failed to upload image or video!", {
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

      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${api}/api/post/addPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(post),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Post Created", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setPost(initialState);
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

      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    <Container maxWidth="md">
      <div className="container">
        <Typography color="primary" className="Typography header">
          Create Post
        </Typography>
        <div className="post-header">
          <div className="post-pic">
            {post.postType == "video/mp4" ? (
              <video autoPlay muted loop>
                <source src={post.image} type={post.postType} />
              </video>
            ) : (
              <img src={post.image} alt="no-image" />
            )}
            <label htmlFor="post-pic">
              <Icon color="primary" />
            </label>
            <input
              type="file"
              id="post-pic"
              accept="image/*, video/*"
              onChange={(e) => handleUpload(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="post-form">
          <Grid container mb={6} spacing={2}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  name="heading"
                  value={post.heading}
                  onChange={handleChange}
                  label="Title"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  type="text"
                  name="location"
                  value={post.location}
                  onChange={handleChange}
                  label="Location"
                  required
                />
              </FormControl>
            </Grid>
          </Grid>

          <InputGroup fullWidth>
            <TextField
              type="text"
              name="body"
              value={post.body}
              onChange={handleChange}
              label="Body"
              multiline
              rows={5}
              required
            />
          </InputGroup>
          <Button
            color="secondary"
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CreatePost;
