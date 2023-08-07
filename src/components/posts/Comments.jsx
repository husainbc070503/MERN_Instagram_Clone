import {
  Avatar,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useGlobalContext } from "../../contexts/InstaContext";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import DeleteIcon from "@mui/icons-material/Delete";

const Comments = ({ comments, id }) => {
  const { user } = useGlobalContext();
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const addComment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/post/addComment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ comment: newComment }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Comment Added", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setNewComment("");
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

  const deleteComment = async (commId) => {
    try {
      const res = await fetch(`${api}/api/post/deleteComment/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ commId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Comment Deleted", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
    } catch (error) {
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
    <div className="comments">
      <Typography className="Typography comms">Comments</Typography>
      {comments?.length === 0 ? (
        <Typography>No Comments Yet</Typography>
      ) : (
        comments?.map((c) => {
          const {
            comment,
            user: { profile, instaId, name },
            _id,
          } = c;
          return (
            <Grid container alignItems="flex-start" mt={3} key={_id}>
              <Grid item md={1} xs={2}>
                <Avatar src={profile} alt={instaId} />
              </Grid>
              <Grid item md={9} xs={9}>
                <Typography className="Typography comm-name">{name}</Typography>
                <Typography className="Typography comm-id">
                  {instaId}
                </Typography>
                <Typography className="Typography comm-comment">
                  {comment}
                </Typography>
              </Grid>
              <Grid item md={1} xs={1} textAlign="center">
                {user?.user?._id === c?.user?._id && (
                  <DeleteIcon
                    color="error"
                    className="icon"
                    onClick={() => deleteComment(_id)}
                  />
                )}
              </Grid>
            </Grid>
          );
        })
      )}
      <Grid container spacing={2} alignItems="center" mt={4}>
        <Grid item md={1}>
          <Avatar src={user?.user?.profile} alt="profile" />
        </Grid>
        <Grid item md={9}>
          <FormControl fullWidth>
            <TextField
              type="text"
              name="comment"
              label="Add yours.."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item md={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={addComment}
            disabled={loading}
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comments;
