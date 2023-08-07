import React from "react";
import { useGlobalContext } from "../contexts/InstaContext";
import Posts from "./posts/Posts";

const FrontPage = () => {
  const { user } = useGlobalContext();
  return <Posts />;
};

export default FrontPage;
