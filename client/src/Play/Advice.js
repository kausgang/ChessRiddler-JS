import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
// import InboxIcon from "@mui/icons-material/Inbox";
// import DraftsIcon from "@mui/icons-material/Drafts";

function Advice(props) {
  if (props.advice.length === 0 && props.analysisComplete)
    return (
      <ul>
        <li>No Errors Found</li>
      </ul>
    );
  const listItems = props.advice.map((advice, index) => (
    <li key={index}>{advice}</li>
  ));

  return <ul>{listItems}</ul>;
}

export default Advice;
