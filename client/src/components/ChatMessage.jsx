import React from "react";

function ChatMessage(props) {
  const dateTimeString = props.time;
  const date = new Date(dateTimeString);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let classname;
  if (props.sender) {
    classname = "flex  gap-2 items-center  justify-end my-2 ";
  } else {
    classname = "flex  gap-2 items-center  justify-start my-2 ";
  }
  return (
    props.time && (
      <div className={classname}>
        <div
          className={`p-2 flex  items-end gap-2 rounded-xl max-w-[40%] flex-wrap ${
            props.sender ? "bg-[#4f04ff21]" : "bg-[#bdbbbb7e]"
          }`}
        >
          <p className="text-white text-md">{props.message}</p>
          <p className="text-gray-400 text-xs">{time}</p>
        </div>
      </div>
    )
  );
}

export default ChatMessage;
