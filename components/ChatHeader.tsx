import Image from "next/image";
import SubjectTag from "./SubjectTag";
import { TooltipItem } from "./ToolTip";
import Users from "@/public/users.svg";

import React, { useContext } from "react";
import { ChatConfigDropdown } from "./DropdownMenu";
import { ChatContext } from "./Chat";
import { SuggestionsModal } from "./SuggestionsModal";
import { AboutTutorModal } from "./AboutTutorModal";
import { AgentContext } from "@/contexts/agent";

const ChatHeader = ({
  setInput,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("ChatSidebar must be used within a ChatProvider");
  }

  const { toggleSidebar } = context;

  const agentContext = useContext(AgentContext);

  if (!agentContext) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }

  const { agent, agentLoading } = agentContext;

  return (
    <header className="row-span-2 pr-5 bg-gradient-to-r text-black flex flex-col lg:flex-row  lg:justify-between lg:items-center rounded-tl-xl rounded-tr-xl from-[#5e6147] to-[#9c6e5f] p-2">
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 relative ">
        <div className="flex items-start lg:items-center gap-4">
          <div className="flex items-start relative">
            <div className="flex items-center justify-center w-[50px] min-w-[50px] h-[50px] rounded-full overflow-hidden bg-wisdom-blue-2 p-[4px]">
              {agent && (
                <Image
                  src={agent.image}
                  alt="chatbot image"
                  width={40}
                  height={40}
                  className="max-w-full self-start"
                />
              )}
            </div>
            <div className="flex lg:hidden gap-1 items-center absolute right-0 bottom-0">
              <div className="w-3 h-3 bg-wisdom-green-2 rounded-full"></div>
            </div>
          </div>

          <div className="flex flex-col lg:hidden">
            <p className="text-black">{agent?.expert}</p>
            <div className="w-[230px] sm:w-[350px] md:w-[450px] lg:w-full  flex items-center gap-2 overflow-x-auto">
              {agent?.specialties
                ? agent.specialties.map((specialty: any) => {
                    return (
                      <SubjectTag
                        key={specialty.id}
                        subject={specialty.name}
                        slug={specialty.slug}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col space-y-1">
          <div className="hidden lg:flex gap-1 items-center">
            <h1 className="text-white font-bold">{agent?.name}</h1>
            <div className="w-4 h-4 bg-wisdom-green-2 rounded-full"></div>
          </div>
          <p className="text-black">{agent?.expert}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {agent?.specialties
              ? agent.specialties.map((specialty: any) => {
                  return (
                    <SubjectTag
                      slug={specialty.slug}
                      key={specialty.id}
                      subject={specialty.name}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <div className="flex gap-5 items-center mt-1 lg:mt-0">
        <SuggestionsModal setInput={setInput} />
        <TooltipItem
          onClick={toggleSidebar}
          icon={Users}
          content="List of AI Tutors"
        />
        <AboutTutorModal />

        <ChatConfigDropdown />
      </div>
    </header>
  );
};

export default ChatHeader;
