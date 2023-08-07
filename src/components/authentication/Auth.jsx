import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import loginImg from "../../images/login.jpeg";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import ForgotModal from "./ForgotModal";

const initialState = {
  name: "",
  email: "",
  instaId: "",
  password: "",
  cpassword: "",
  profile: "",
};

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cred, setCred] = useState(initialState);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setCred({ ...cred, [e.target.name]: e.target.value });

  /* const regex = /^[a-zA-Z0-9]+@[a-zA-Z]+[a-z]{2,4}/; */

  const handlePassword = (e) => {
    var pswd = e.target.value;
    setCred({ ...cred, password: pswd });

    const lowercase = /[a-z]/g;
    const uppercase = /[A-Z]/g;
    const digits = /[0-9]/g;
    const special = /[!@#$%^&*]/g;

    if (
      !pswd.match(lowercase) ||
      !pswd.match(uppercase) ||
      !pswd.match(digits) ||
      !pswd.match(special) ||
      pswd.length < 8
    ) {
      setError(true);
      setErrorMessage(
        "Password must contain atleast one lower case letter, one upper case letter, one digit and one special character such @, $ etc. Minimum Length 8"
      );
    } else {
      setError(false);
      setErrorMessage("Valid Password");
    }
  };

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
        toast.success("Profile Pic Uploaded", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setCred({ ...cred, profile: resp.url });
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

  const handleShow = () => setShow(!show);
  const handleLogin = () => setLogin(!login);

  const handleSignup = async () => {
    setLoading(true);

    if (cred.cpassword !== cred.password) {
      setLoading(false);
      return toast.error("Mismatch Passwords", {
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

    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cred),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Successfully registered!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLogin(true);
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
      return toast.error(error.message, {
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

  const handleSignin = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instaId: cred.instaId,
          password: cred.password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Successfully loggedin!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("insta-user", JSON.stringify(data.user));
        navigate("/");
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

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item md={7} xs={12}>
          <Box>
            <img src={loginImg} alt="login" className="login-image" />
          </Box>
        </Grid>
        <Grid item md={5} xs={12} p={4}>
          <div className="auth-header">
            <Typography component="h2" className="Typography h2">
              Instagram Clone
            </Typography>
          </div>

          <div className={!login && "reg-form"}>
            {!login && (
              <>
                <Grid container spacing={2} alignItems="center" mb={4}>
                  <Grid item md={2}>
                    <PermIdentityIcon />
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        label="Name"
                        name="name"
                        value={cred.name}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center" mb={4}>
                  <Grid item md={2}>
                    <EmailIcon />
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        type="email"
                        label="Email Address"
                        name="email"
                        value={cred.email}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            )}

            <Grid container spacing={2} alignItems="center" mb={4}>
              <Grid item md={2}>
                <PermIdentityIcon />
              </Grid>
              <Grid item md={10} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    label={login ? "Insta ID" : "Create your own Insta ID"}
                    name="instaId"
                    value={cred.instaId}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" mb={4}>
              <Grid item md={2}>
                {!show ? (
                  <VisibilityIcon onClick={handleShow} className="icon" />
                ) : (
                  <VisibilityOffIcon onClick={handleShow} className="icon" />
                )}
              </Grid>
              <Grid item md={10} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    type={show ? "text" : "password"}
                    label="Password"
                    name="password"
                    value={cred.password}
                    onChange={handlePassword}
                    required
                  />
                  {errorMessage && !login && (
                    <Alert
                      severity={error ? "error" : "success"}
                      className="Alert alert"
                    >
                      {errorMessage}
                    </Alert>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {!login && (
              <>
                <Grid container spacing={2} alignItems="center" mb={4}>
                  <Grid item md={2}>
                    {!show ? (
                      <VisibilityIcon onClick={handleShow} className="icon" />
                    ) : (
                      <VisibilityOffIcon
                        onClick={handleShow}
                        className="icon"
                      />
                    )}
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        type={show ? "text" : "password"}
                        label="Confirm Password"
                        name="cpassword"
                        value={cred.cpassword}
                        onChange={handlePassword}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center" mb={4}>
                  <Grid item md={2}>
                    <FormLabel>Profile Pic</FormLabel>
                  </Grid>
                  <Grid item md={10}>
                    <FormControl fullWidth>
                      <TextField
                        type="file"
                        name="cpassword"
                        accept="image/*"
                        onChange={(e) => handleUpload(e.target.files[0])}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            )}
          </div>

          {login ? (
            <>
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleSignin}
              >
                Sign in
              </Button>

              <Grid
                container
                alignItems="center"
                mt={4}
                justifyContent="space-between"
              >
                <Grid item md={6} xs={12}>
                  <ForgotModal />
                </Grid>
                <Grid item md={6} xs={12} className="Grid acc" textAlign="end">
                  <Typography className="Typography acc" onClick={handleLogin}>
                    Don't have an account <span>Register?</span>
                  </Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item md={6}>
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={handleSignup}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item md={6} textAlign="end">
                <Typography className="Typography acc" onClick={handleLogin}>
                  Account exists <span>Login?</span>
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
