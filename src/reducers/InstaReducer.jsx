export const InstaReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    case "SET_SINGLE_POST":
      return {
        ...state,
        singlePost: action.payload,
      };

    case "SET_INSTA_USER":
      return {
        ...state,
        instaUser: action.payload,
      };

    case "SET_INSTA_USER_POSTS":
      return {
        ...state,
        instaUserPosts: action.payload,
      };

    case "SET_BOOKMARKS":
      return {
        ...state,
        bookmarks: action.payload,
      };

    case "SET_MY_POSTS":
      return {
        ...state,
        myPosts: action.payload,
      };

    case "REMOVE_USER":
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
};
