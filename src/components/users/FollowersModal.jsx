import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Results from "../search/Results";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "95%",
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

const FollowersModal = ({ users, id, title, length }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography className="Typography len">{length}</Typography>
      <Typography className="Typography title" onClick={handleOpen}>
        {title}
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Results users={users} />
        </Box>
      </Modal>
    </div>
  );
};

export default FollowersModal;
