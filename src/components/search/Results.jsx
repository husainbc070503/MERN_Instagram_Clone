import styled from "@emotion/styled";
import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/InstaContext";

const Name = styled(Typography)`
  font-size: 18px;
  color: #322653;
`;

const ID = styled(Typography)`
  font-size: 14px;
  color: #2d4356;
`;

const Card = styled(Grid)`
  ${'' /* box-shadow: 0 10px 30px #8b92aa65; */}
  border-radius: 4px;
  cursor: pointer;
`;

const Results = ({ users }) => {
  const { user } = useGlobalContext();

  return (
    users.length > 0 &&
    users.map((u) => {
      const { profile, _id, name, instaId } = u;
      return (
        <Link
          to={user?.user?._id !== _id && `../user/${_id}`}
          key={_id}
          style={{ textDecoration: "none" }}
        >
          <Card
            container
            alignItems="center"
            p={2}
          >
            <Grid item md={1}>
              <Avatar src={profile} alt={name} />
            </Grid>
            <Grid item md={10} ml={1}>
              <Name>{name}</Name>
              <ID>{instaId}</ID>
            </Grid>
          </Card>
        </Link>
      );
    })
  );
};

export default Results;
