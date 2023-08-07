import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/InstaContext";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import { api } from "../../utils/Api";
import { toast } from "react-toastify";

const InputGroup = styled(FormControl)`
  margin-bottom: 18px;
`;

const Label = styled(FormLabel)`
  color: #2979ff;
`;

const UpdateProfile = () => {
  const { user } = useGlobalContext();
  const [updateUser, setUpdateUser] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload profile pic", {
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

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setLoading(false);
      return toast.error("Only JPEG/PNG images are accepted.", {
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
      const url = "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";

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
        toast.success("Profile Pic Updated", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setUpdateUser({ ...updateUser, profile: resp.url });
      } else {
        toast.error("Failed to upload pic!", {
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
      return toast.error(error.message, {
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
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(updateUser),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile Updated", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem(
          "insta-user",
          JSON.stringify({ token: user?.token, user: data.user })
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
          theme: "colored",
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
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    setUpdateUser({ ...user.user, bio: user.user?.bio ? user.user?.bio : "" });
  }, [user.user]);

  return (
    <Container maxWidth="md">
      <div className="container">
        <Typography color="primary" className="Typography header">
          Edit Profile
        </Typography>
        <div className="update-form">
          <Grid container justifyContent="space-between" spacing={10}>
            <Grid item md={6}>
              <InputGroup fullWidth>
                <Label>Insta ID</Label>
                <TextField
                  type="text"
                  name="instaId"
                  value={updateUser?.instaId}
                  onChange={handleChange}
                ></TextField>
              </InputGroup>
              <InputGroup fullWidth>
                <Label>Name</Label>
                <TextField
                  type="text"
                  name="name"
                  value={updateUser?.name}
                  onChange={handleChange}
                ></TextField>
              </InputGroup>
            </Grid>
            <Grid item md={6}>
              <div className="image">
                <img src={updateUser?.profile} alt={updateUser?.name} />
                <label htmlFor="update-pic" className="edit-label">
                  <EditIcon sx={{ cursor: "pointer" }} color="primary" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="update-pic"
                  onChange={(e) => handleUpload(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </Grid>
          </Grid>
          <InputGroup fullWidth>
            <Label>Email</Label>
            <TextField
              type="email"
              name="email"
              value={updateUser?.email}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup fullWidth>
            <Label>Bio</Label>
            <TextField
              type="text"
              multiline
              rows={5}
              name="bio"
              value={updateUser?.bio}
              onChange={handleChange}
            />
          </InputGroup>
          <Button
            variant="contained"
            color="secondary"
            disabled={loading}
            onClick={handleSubmit}
          >
            Update Profile
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default UpdateProfile;
