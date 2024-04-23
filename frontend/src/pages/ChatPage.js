import { Box } from '@chakra-ui/react'
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../context/ChatContext";

export const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (

    <div className='ml-[60px]'>
      <h1>Chat Page</h1>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

