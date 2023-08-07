import {
  Avatar,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "../../utils/Api";
import { useGlobalContext } from "../../contexts/InstaContext";
import Results from "./Results";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { user } = useGlobalContext();

  const handleChange = async (e) => {
    setSearch(e.target.value);

    try {
      const res = await fetch(
        `${api}/api/user/searchUser?search=${e.target.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <div className="container">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
          <OutlinedInput
            id="outlined-adornment-search"
            type="text"
            endAdornment={
              <InputAdornment position="start">
                <IconButton edge="start">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
            autoFocus
            value={search}
            onChange={handleChange}
          />
        </FormControl>

        <div className="results">
          <Results users={users} />
        </div>
      </div>
    </Container>
  );
};

export default Search;
