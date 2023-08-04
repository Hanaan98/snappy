import React from "react";
import Friends from "../components/Friends";

function FriendTabs(props) {
  const [isSelected, setIsSelected] = React.useState(false);
  const clickHandler = (username) => {
    setIsSelected(username);
    props.onClick(username);
  };
  return (
    <div className="max-h-[25rem] overflow-y-scroll px-2 chat flex flex-col gap-2 mt-5">
      {props.users &&
        props.users.map((user) => (
          <Friends
            key={user._id}
            username={user.username}
            Selected={isSelected === user.username}
            onClick={clickHandler}
          />
        ))}
    </div>
  );
}

export default FriendTabs;
