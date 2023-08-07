import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader } from "@mui/material";
import { useGlobalContext } from "../../contexts/InstaContext";
import styled from "@emotion/styled";
import { api } from "../../utils/Api";
import { Link } from "react-router-dom";

const Heading = styled(Typography)`
  color: #213555;
  font-weight: bold;
  font-size: 24px;
`;

const InstaId = styled(Typography)`
  color: #61677a;
`;

const BookmarkCard = ({ p, fromLikes }) => {
  const { user } = useGlobalContext();
  const { image, postType, heading } = p;
  const [postUser, setPostUser] = React.useState();

  const fetchUser = async () => {
    try {
      const res = await fetch(
        `${api}/api/user/user/${fromLikes ? p?.user?._id : p?.user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) setPostUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, [p]);

  return (
    <Card className="Card post-card book-card">
      <CardHeader
        avatar={<Avatar src={postUser?.profile} />}
        title={postUser?.name}
        subheader={
          <Link
            to={
              fromLikes
                ? p?.user?._id !== user?.user?._id && `../user/${p?.user?._id}`
                : p?.user !== user?.user?._id && `../user/${p?.user}`
            }
            className="text-decoration-none"
          >
            <InstaId>{postUser?.instaId}</InstaId>
            <Heading>{heading}</Heading>
          </Link>
        }
      />
      <CardMedia
        component={postType === "image/jpeg" ? "img" : "video"}
        className="CardMedia post-image"
        title={heading}
        image={image}
        autoPlay
        controls
        loop
      />
    </Card>
  );
};

export default BookmarkCard;
