import React from "react";
import "./sidebar.css";
import { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import SearchIcon from "@material-ui/icons/Search";

export default function Sidebar({ socket }) {
  const [chatlist, setChatlist] = useState([]);
  const [dependroom, setDependroom] = useState(false);

  
  const [room, setRoom] = useState();

  const [flag, setFlag] = useState(false);
  const roominfo = () => {
    setDependroom(true);
  };
  const Khotu = () => {
    socket.emit("room_taken", {
      room: room,
    });
   

    setDependroom(false);
  };
  const sidebarchat = (roomdata) => {
    socket.emit("join_room", {
      room: roomdata,
      
    });
  };
 

  useEffect(() => {
    console.log(flag);
    socket.emit("chats");
    socket.on("okay", (data) => {
      setChatlist(data);
    });
  });

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton>
        <Avatar src="https://pps.whatsapp.net/v/t61.24694-24/294612203_709247400146412_2271253152259021661_n.jpg?ccb=11-4&oh=01_AVytlKWhpLnmNyRG8_q3EvcHN8lW7bz9c0ru9PTLtyXdPA&oe=62F147D9" />
        </IconButton>

        <div className="sidebar_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="serachicon">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <input type="text" placeholder="search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        {chatlist.map((val, key) => {
          return (
            <div className="sidebarchats" onClick={() => sidebarchat(val.room)}>
           

              <div className="sidebar_chatinfo">
                <h2>{val.room}</h2>
              </div>
            </div>
          );
        })}

        <button className="room_btn" onClick={roominfo}>
          Add Rooms
        </button>
        {dependroom ? (
          <div>
            <input
              className="room"
              type="Number"
              placeholder="type a room"
              onChange={(e) => setRoom(e.target.value)}
            />
           
            <button className="room_btn" onClick={Khotu}>
              Add
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
