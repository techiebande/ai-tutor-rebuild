import { AIAgentProps } from "@/components/Chat";
import { AIAgentProp } from "./ai-agent";

export interface AgentContextProps {
  agent: AIAgentProp | null;
  agentLoading: boolean;
  agentError: string | null;
  agents: AIAgentProps[] | [];
  agentsLoading: boolean;
  agentsError: string | null;
}
