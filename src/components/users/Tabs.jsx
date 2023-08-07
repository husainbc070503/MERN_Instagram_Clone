import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PostTab from "./PostTab";

const Tabs = ({ posts }) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (_event, newValue) => setValue(newValue);

  return (
    posts?.length > 0 && (
      <Box sx={{ width: "90%", margin: "auto" }}>
        <TabContext value={value}>
          <Box sx={{ mt: 3 }}>
            <TabList onChange={handleChange}>
              <Tab label={<ImageIcon />} value="1" className="Tab tab" />
              <Tab label={<VideoLibraryIcon />} value="2" className="Tab tab" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <PostTab
              posts={posts?.filter((p) => p.postType === "image/jpeg")}
            />
          </TabPanel>
          <TabPanel value="2">
            <PostTab posts={posts?.filter((p) => p.postType === "video/mp4")} />
          </TabPanel>
        </TabContext>
      </Box>
    )
  );
};

export default Tabs;
