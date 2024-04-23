import { Avatar } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react'
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../context/ChatContext";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  
  // Function to compute the style object based on message and user
  const getMessageStyle = (message, index) => {
    // Compute backgroundColor based on sender
    const backgroundColor = message.sender._id === user.userId ? "#BEE3F8" : "#B9F5D0";

    // Compute marginLeft based on sender
    const marginLeft = isSameSenderMargin(messages, message, index, user.userId);

    // Compute marginTop based on sender
    const marginTop = isSameUser(messages, message, index, user.userId) ? 3 : 10;

    // Return the style object
    return {
      backgroundColor,
      marginLeft,
      marginTop,
      borderRadius: "20px",
      padding: "5px 15px",
      maxWidth: "75%",
    };
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => {
          console.log("Message sender ID:", message.sender._id);
          console.log("User ID:", user.userId);
          const style = getMessageStyle(message, i);
          console.log("Computed style:", style);
          return (
            <div style={{ display: "flex" }} key={message._id}>
              {(isSameSender(messages, message, i, user.userId) ||
                isLastMessage(messages, i, user.userId)) && (
                <Tooltip label={message.sender.name} placement="bottom-start" hasArrow>
                  {/* <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={message.sender.name}
                    src={message.sender.pic}
                  /> */}
                  {<p>{message.sender.email}</p>}
                </Tooltip>
              )}
              <span style={style}>
                {message.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
