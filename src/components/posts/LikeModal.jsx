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

const LikeModal = ({ likes }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography className="Typography likes" onClick={handleOpen}>
        {likes?.length} likes
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Liked By</Typography>
          <div className="modal-users">
            <Results users={likes} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LikeModal;
