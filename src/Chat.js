import React from "react";
import "./chat.css";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import MicIcon from "@material-ui/icons/Mic";

export default function Chat({ socket }) {
  const [flagcheck, setFlagcheck] = useState(false);
  const [allmessage, setAllmessage] = useState([]);
  const [auther, setAuther] = useState("");
  const [roominfo, setRoominfo] = useState();
  const [chatmsg, setChatmsg] = useState("");

  socket.on("room_info", (data) => {
    setRoominfo(data.room);
  });
  socket.on("chatauther", (data) => {
    setAuther(data);
  });
  console.log(roominfo);

  const sendmsg = (e) => {
    e.preventDefault();
    socket.emit("sendmsg", {
      room: roominfo,
      msg: chatmsg,
      auther: auther,
    });
    if (flagcheck) {
      setFlagcheck(false);
    } else {
      setFlagcheck(true);
    }
  };
  useEffect(() => {
  
    socket.emit("recive_msg");

    socket.on("done", (data) => {
      setAllmessage(data);
    });
  });

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chatheader_info">
          <h3>{roominfo}</h3>
          <p>Online</p>
        </div>
        <div className="chatheader_icons">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chats">
        {allmessage.map((val, key) => {
          return val.room === roominfo ? (
            <div className="chatbody">
              <p className="chat_send">
                <span className="chat_name">{val.Auther}</span>
                <p className={auther === val.Auther ? "send" : "recive"}>
                  {" "}
                  {val.msg}{" "}
                </p>
                <span className="chat_timestamp">
                  {new Date().toDateString()}
                </span>
              </p>
            </div>
          ) : (
            ""
          );
        })}
      </div>
      <div className="chat_foo">
        <IconButton>
          <SentimentDissatisfiedIcon />
        </IconButton>

        <form action="">
          <input
            type="text"
            placeholder="type a message"
            onChange={(e) => setChatmsg(e.target.value)}
          />
          <IconButton>
            {" "}
            <button onClick={sendmsg} className="chat_btn">
              Submit
            </button>
          </IconButton>
        </form>
        <IconButton>
          <MicIcon></MicIcon>
        </IconButton>
      </div>
    </div>
  );
}
