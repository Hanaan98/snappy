import React from "react";
import { useEffect, useRef } from "react";
import Loader from "../components/Loader";
import UserContext from "../state/UserContext";
import { useContext } from "react";
import Logo from "../../src/assets/logo.svg";
import DefaultScreen from "../components/DefaultScreen";
import UserTab from "../components/UserTab";
import FriendTabs from "../components/FriendTabs";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
function Chat() {
  const socket = useRef();
  const [showLoader, setShowLoader] = React.useState(true);
  const [chat, setChat] = React.useState();
  const Ctx = useContext(UserContext);
  const [users, setUsers] = React.useState([]);

  const clickHandler = (username) => {
    const currentUser = users.find((user) => user.username === username);
    setChat(currentUser);
  };
  const fetchUsers = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${Ctx.user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUsers(data);
  };
  useEffect(() => {
    if (chat) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", chat._id);
    }
  }, [chat]);

  useEffect(() => {
    fetchUsers(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);
  return showLoader ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center w-screen h-screen bg-[#131324]">
      <div className="bg-[#00000076] w-[85vw] h-[85vh] grid grid-flow-col grid-cols-4">
        <div className="col-span-1 bg-[#080420] relative">
          <div className="flex gap-3 items-center justify-center mt-2">
            <img src={Logo} alt="logo" width={30} height={30} />
            <h1 className="font-extrabold text-white text-md">SNAPPY</h1>
          </div>
          <FriendTabs users={users} onClick={clickHandler} />
          <UserTab username={Ctx.user.username} />
        </div>
        {!chat ? (
          <DefaultScreen username={Ctx.user.username} />
        ) : (
          socket && <ChatContainer currentUser={chat} socket={socket} />
        )}
      </div>
    </div>
  );
}

export default Chat;
