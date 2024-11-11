import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipItem } from "./ToolTip";
import { useContext } from "react";
import { ChatContext } from "./Chat";
import Bulb from "@/public/bulb.svg";
import { ArrowRight, Lightbulb } from "lucide-react";
import { AgentContext } from "@/contexts/agent";

export function SuggestionsModal({
  setInput,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const context = useContext(AgentContext);

  if (!context) {
    throw new Error("ChatSidebar must be used within a ChatProvider");
  }

  const { agent } = context;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TooltipItem icon={Bulb} content="Suggestions" />
      </DialogTrigger>
      <DialogContent className="w-[100vw] md:w-[80vw] h-[80vh] overflow-auto ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-black" />
            <p>Automated Learning</p>
          </DialogTitle>
          <hr />
        </DialogHeader>

        <div className="rounded-lg border">
          {agent?.suggestions && agent.suggestions.length > 0 ? (
            agent?.suggestions?.map((suggestion: string, i: number) => (
              <div
                key={i}
                className="p-2 flex items-center justify-between rounded border-t"
              >
                <p>{suggestion}</p>
                <DialogClose asChild>
                  <Button
                    onClick={() => setInput(suggestion)}
                    className="bg-blue-500 hover:bg-blue-500 gap-2 flex items-center"
                  >
                    <span className="flex items-center justify-center border rounded w-6 h-6 ">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                    AI Teaching Mode
                  </Button>
                </DialogClose>
              </div>
            ))
          ) : (
            <p className="text-center w-full">No suggestions from this AI</p>
          )}
        </div>
        <DialogClose asChild>
          <DialogFooter>
            <Button type="submit">Close</Button>
          </DialogFooter>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
