import Chat from "./Chat.js";
import "./App.css";
import Sidebar from "./Sidebar.js";
import { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("https://chatwebpage.herokuapp.com/");

function App() {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
 
  const [authername, setAuthername] = useState("");
  const handle = () => {
    setSecond(true);
    setFirst(false);
    socket.emit("authername", authername);
 
  };
  return (
    <div>
      {first ? (
        <div className="autherdetails">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZeqICL87E32V6pF7u62ARLZXGEfA7GFHLkA&usqp=CAU"
            alt=""
          />
          <h2>Enter Your Details</h2>
          <div className="aboutauther">
            <input
              type="text"
              onChange={(e) => setAuthername(e.target.value)}
              placeholder="Enter Your Name"
            />
            <button onClick={handle}>Add</button>{" "}
          </div>
        
        </div>
      ) : (
        ""
      )}
      {second ? (
        <div className="App">
          <div className="app_body">
            <Sidebar socket={socket} />
            <Chat socket={socket} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
