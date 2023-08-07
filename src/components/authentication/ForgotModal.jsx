import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, FormControl, Grid, TextField } from "@mui/material";
import styled from "@emotion/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TokenIcon from "@mui/icons-material/Token";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "95%",
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

const Email = styled(Typography)`
  font-size: 22px;
  color: ##241468;
  margin-bottom: 6px;
`;

const SubmitBtn = styled(Button)`
  margin-top: 2rem;
`;

const initialState = {
  email: "",
  otp: "",
  password: "",
  cpassword: "",
};

const ForgotModal = () => {
  const [open, setOpen] = React.useState(false);
  const [openOtp, setOpenOtp] = React.useState(true);
  const [fields, setFields] = React.useState(initialState);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleShow = () => setShow(!show);

  const handleChange = (e) =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const handlePassword = (e) => {
    var pswd = e.target.value;
    setFields({ ...fields, password: pswd });

    const uppercase = /[A-Z]/g;
    const lowercase = /[a-z]/g;
    const numbers = /[0-9]/g;
    const special = /[!@#$%^&*]/g;

    if (
      !pswd.match(lowercase) ||
      !pswd.match(uppercase) ||
      !pswd.match(numbers) ||
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

  const handleSendLink = async () => {
    setLoading(true);

    if (!fields.email) {
      setLoading(false);
      return toast.error("Please enter your email address", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const res = await fetch(`${api}/api/user/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fields.email }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("OTP has been mailed.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setOpenOtp(false);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
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
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);

    if (!fields.otp || !fields.cpassword || !fields.password) {
      setLoading(false);
      return toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (!fields.cpassword !== !fields.password) {
      setLoading(false);
      return toast.error("Mismatch Password", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const res = await fetch(`${api}/api/user/changePassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Password Updated. Please Login", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setOpenOtp(true);
        setOpen(false);
        setFields(initialState);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
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
        autoClose: 2000,
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
    <div>
      <Button onClick={() => setOpen(true)} className="Button forget">
        Forgot Password
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {openOtp ? (
            <>
              <Email>Email Address</Email>
              <FormControl fullWidth>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  value={fields.email}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <SubmitBtn
                color="primary"
                variant="contained"
                onClick={handleSendLink}
              >
                Send OTP
              </SubmitBtn>
            </>
          ) : (
            <>
              <Grid mb={4} container spacing={1} alignItems="center">
                <Grid item md={1} xs={12}>
                  <TokenIcon />
                </Grid>
                <Grid item md={11} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      name="otp"
                      label="OTP"
                      value={fields.otp}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" mb={4}>
                <Grid item md={1} xs={12}>
                  {!show ? (
                    <VisibilityIcon onClick={handleShow} className="icon" />
                  ) : (
                    <VisibilityOffIcon onClick={handleShow} className="icon" />
                  )}
                </Grid>
                <Grid item md={11} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      type={show ? "text" : "password"}
                      label="Password"
                      name="password"
                      value={fields.password}
                      onChange={handlePassword}
                      required
                    />
                    {errorMessage && (
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
              <Grid mb={5} container alignItems="center">
                <Grid item md={1} xs={12} mb={2}>
                  {!show ? (
                    <VisibilityIcon onClick={handleShow} className="icon" />
                  ) : (
                    <VisibilityOffIcon onClick={handleShow} className="icon" />
                  )}
                </Grid>
                <Grid item md={11} xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      type={show ? "text" : "password"}
                      name="cpassword"
                      label="Confirm Password"
                      value={fields.cpassword}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                color="primary"
                variant="contained"
                onClick={handleChangePassword}
              >
                Update
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotModal;
