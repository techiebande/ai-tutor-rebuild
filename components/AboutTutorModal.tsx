import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipItem } from "./ToolTip";
import { useContext } from "react";
import Info from "@/public/info.svg";
import { AgentContext } from "@/contexts/agent";

export function AboutTutorModal() {
  const context = useContext(AgentContext);

  if (!context) {
    throw new Error("ChatSidebar must be used within a ChatProvider");
  }

  const { agent } = context;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TooltipItem icon={Info} content="About" />
      </DialogTrigger>
      <DialogContent className="w-[100vw] md:w-[80vw] overflow-auto top-[30%]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <p>{agent?.name}</p>
          </DialogTitle>
          <hr />
        </DialogHeader>

        <div className="rounded-lg ">
          <p>{agent?.display_description}</p>
        </div>

        <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
