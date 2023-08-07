import React, { createContext, useContext, useEffect, useReducer } from "react";
import { InstaReducer } from "../reducers/InstaReducer";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/Api";

const Context = createContext();

const initialState = {
  user: {},
  posts: [],
  singlePost: {},
  instaUser: {},
  instaUserPosts: [],
  bookmarks: [],
  myPosts: [],
};

const InstaContext = ({ children }) => {
  const [state, dispatch] = useReducer(InstaReducer, initialState);
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      const res = await fetch(`${api}/api/post/allPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_POSTS", payload: data.posts });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSinglePost = async (id) => {
    try {
      const res = await fetch(`${api}/api/post/singlePost/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_SINGLE_POST", payload: data.post });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await fetch(`${api}/api/user/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_INSTA_USER", payload: data.user });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserPosts = async (id) => {
    try {
      const res = await fetch(`${api}/api/post/userPosts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_INSTA_USER_POSTS", payload: data.posts });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBookmarks = async () => {
    try {
      const res = await fetch(`${api}/api/user/getBookmarks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_BOOKMARKS", payload: data.marks.bookmarks });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMyPosts = async () => {
    try {
      const res = await fetch(`${api}/api/post/myPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_MY_POSTS", payload: data.posts });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
    getBookmarks();
    getMyPosts();
  }, [state.posts, state.user, state.bookmarks, state.myPosts]);

  useEffect(() => {
    const instaUser = localStorage.getItem("insta-user");
    if (instaUser)
      dispatch({ type: "SET_USER", payload: JSON.parse(instaUser) });
    else {
      navigate("auth");
      dispatch({ type: "REMOVE_USER", payload: JSON.parse(instaUser) });
    }
  }, [localStorage.getItem("insta-user")]);

  return (
    <Context.Provider
      value={{
        ...state,
        dispatch,
        getSinglePost,
        getUser,
        getUserPosts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);

export { InstaContext, useGlobalContext };
