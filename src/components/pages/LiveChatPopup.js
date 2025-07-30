import React from "react";
import { useState, useEffect } from "react";
import { getSocket } from "../../services/socket";
import { fetchDataMessagesByRoomId } from "../../services/messageServices";
import { AuthContext } from "../../components/store/AuthContext";
import classes from "./LiveChatPopup.module.css";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showPopupLiveChatActions } from "../../components/store/store";

function LiveChatPopup() {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  let roomId = null;
  const socket = getSocket();

  if (user) {
    roomId = user._id;
  }

  useEffect(() => {
    try {
      const fetchAPI = async () => {
        const response = await fetchDataMessagesByRoomId(roomId);
        setMessages(response);
      };
      fetchAPI();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    if (!roomId) return;
    // Khi load trang, vào room
    socket.emit("joinRoom", { roomId, userType: user?.fullname });

    // Lắng nghe tin nhắn mới
    socket.on("message", ({ message, sender }) => {
      setMessages((prev) => [...prev, { content: message, sender }]);
    });

    // Lắng nghe kết thúc chat
    socket.on("chatEnded", () => {
      alert("Cuộc trò chuyện đã kết thúc");
    });

    // Cleanup
    return () => {
      socket.off("message");
      socket.off("chatEnded");
    };
  }, [socket]);

  useEffect(() => {}, [messages]);

  const sendMessage = () => {
    console.log("sendMessage", input);
    if (!roomId) return alert("Bạn cần đăng nhập để thực hiện chức năng này!");
    if (input.trim() === "/end") {
      dispatch(showPopupLiveChatActions.showPopupLiveChat());
    } else if (input.trim() !== "") {
      console.log("Sending emit message event:", input);
      socket.emit("message", { roomId, message: input, sender: "user" });
      setInput("");
    }
  };

  return (
    <div className={classes.box}>
      <div className={classes["top-box"]}>
        <div className={classes["top-box__left"]}>Customer Support</div>
        <div className={classes["top-box__right"]}>Let's Chat App</div>
      </div>
      <div className={classes["body-box"]}>
        {messages.map((msg, index) => {
          if (msg.sender === "admin") {
            return (
              <div key={index} className={classes["body-box__left"]}>
                <img src="/images/admin.png" alt="admin" />
                <div>{msg.content}</div>
              </div>
            );
          } else {
            return (
              <div key={index} className={classes["body-box__right"]}>
                <span>{msg.content}</span>
              </div>
            );
          }
        })}
      </div>
      <div className={classes["bottom-box"]}>
        <div className={classes["bottom-box__left"]}>
          <img src="/images/admin.png" alt="admin" />
          <input
            type="text"
            placeholder="Enter Message!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className={classes["bottom-box__icon"]}>
            <i className="fa fa-paperclip" aria-hidden="true"></i>
            <i className="fa fa-smile-o" aria-hidden="true"></i>
            <i
              className="fa fa-telegram"
              aria-hidden="true"
              onClick={sendMessage}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveChatPopup;
