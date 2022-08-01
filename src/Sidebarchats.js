import { Avatar } from "@material-ui/core";
import React from "react";
import "./sidebarchats.css";
import { IconButton } from "@material-ui/core";

export default function Sidebarchats() {
  return (
    <div className="sidebarchats">
      <IconButton >
        <Avatar />
      </IconButton>

      <div  className="sidebar_chatinfo">
        <h2>Room Name</h2>
        <p>This is Last Msg</p>
      </div>
    </div>
  );
}
 