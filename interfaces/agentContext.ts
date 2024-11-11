import { AIAgentProps } from "@/components/Chat";
import { AIAgentProp } from "./ai-agent";

export interface AgentContextProps {
  agent: AIAgentProp | null;
  agentLoading: boolean;
  agentError: boolean | null;
  agents: AIAgentProps[] | [];
  agentsLoading: boolean;
  agentsError: boolean | null;
}
