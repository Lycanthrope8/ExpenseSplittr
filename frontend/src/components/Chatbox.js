import {Box} from "@chakra-ui/react";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../context/ChatContext";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <>
    <h1>Chatbox</h1>
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /></>
    // <Box
    //   d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    //   alignItems="center"
    //   flexDir="column"
    //   p={3}
    //   bg="white"
    //   w={{ base: "100%", md: "68%" }}
    //   borderRadius="lg"
    //   borderWidth="1px"
    // >
    //   <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    // </Box>
  );
};

export default Chatbox;
