import React, { useEffect, useRef } from "react";
import { FaPowerOff } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../state/UserContext";
import ChatMessage from "./ChatMessage";
function ChatContainer(props) {
  const chatContainerRef = useRef(null);
  const Ctx = useContext(UserContext);
  const [message, setMessage] = React.useState("");
  const [chat, setChat] = React.useState([]);

  const sendMessage = async () => {
    const response = await fetch("http://localhost:5000/chat/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
        users: [Ctx.user._id, props.currentUser._id],
        sender: Ctx.user._id,
      }),
    });

    if (!response.ok) {
      console.log("Error sending message");
    } else {
      fetchMessages();
    }
  };

  const fetchMessages = async () => {
    const response = await fetch(
      `http://localhost:5000/chat/get/${Ctx.user._id}/${props.currentUser._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
    } else {
      setChat(data.chat);
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
    const newmessage = {
      sender: Ctx.user._id,
      text: message,
      users: [Ctx.user._id, props.currentUser._id],
    };
    props.socket.current.emit("send-message", newmessage);
  };
  useEffect(() => {
    if (props.socket.current) {
      props.socket.current.on("receive-message", (data) => {
        fetchMessages();
      });
    }
  }, [props.socket.current]);
  const logoutClickHandler = () => {
    Ctx.logout();
  };
  useEffect(() => {
    fetchMessages();
  }, [props.currentUser]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chat]);

  return (
    <div className="col-span-3 w-full h-full flex flex-col  items-center px-5 py-3 relative">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <h3 className="text-white text-xl font-bold">
            {props.currentUser.username}
          </h3>
        </div>
        <button
          className="h-8 w-8 bg-[#9a86f3] flex items-center justify-center rounded-md"
          onClick={logoutClickHandler}
        >
          <FaPowerOff color="white" />
        </button>
      </div>
      <div
        className="p-5 w-full overflow-y-scroll message h-[27rem]"
        ref={chatContainerRef}
      >
        {chat &&
          chat.map((message) => (
            <ChatMessage
              key={message._id}
              sender={message.sender === Ctx.user._id}
              message={message.text}
              time={message.createdAt}
            />
          ))}
      </div>
      <form
        className="w-full absolute bottom-0 flex rounded-md"
        onSubmit={formSubmitHandler}
      >
        <input
          type="text"
          className="w-full h-12 px-5 outline-none bg-[#ffffff34] text-white text-md "
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type a message"
        />
        <button className="bg-[#9a86f3] h-auto w-14 flex items-center justify-center">
          <FaPaperPlane color="white" />
        </button>
      </form>
    </div>
  );
}

export default ChatContainer;
