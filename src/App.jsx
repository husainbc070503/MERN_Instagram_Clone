import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/authentication/Auth";
import { ThemeProvider, createTheme } from "@mui/material";
import { InstaContext } from "./contexts/InstaContext";
import { blue, indigo } from "@mui/material/colors";
import Index from "./components/Index";
import FrontPage from "./components/FrontPage";
import UpdateProfile from "./components/authentication/UpdateProfile";
import CreatePost from "./components/posts/CreatePost.jsx";
import SinglePost from "./components/posts/SinglePost";
import Search from "./components/search/Search";
import User from "./components/users/User";
import Bookmarks from "./components/bookmarks/Bookmarks";
import Account from "./components/authentication/Account";
import Likes from "./components/authentication/Likes";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: indigo[600],
      },
      secondary: {
        main: blue[600],
      },
    },

    typography: {
      fontFamily: "Kanit",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <InstaContext>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Index />}>
              <Route path="/" element={<FrontPage />} index />
              <Route path="/updateProfile" element={<UpdateProfile />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/account" element={<Account />} />
              <Route path="/likes" element={<Likes />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/search" element={<Search />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route path="/user/:id" element={<User />} />
            </Route>
          </Routes>
        </InstaContext>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
