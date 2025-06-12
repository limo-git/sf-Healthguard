import { createChatBotMessage } from "react-chatbot-kit";
import HealthBotAvatar from "./HealthBotAvatar";

const botName = "HealthBot";

const config = (stateRef) => ({
  botName,
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. Ask me anything about symptoms, diseases, or health advice.`)
  ],
  customComponents: {
    botAvatar: (props) => <HealthBotAvatar {...props} />,
    header: () => (
      <div className="flex items-center gap-2 px-4 py-3 bg-blue-600 rounded-t-2xl shadow text-white font-bold text-lg">
        <span role="img" aria-label="health">🩺</span> HealthBot
      </div>
    ),
  },
  customStyles: {
    botMessageBox: { backgroundColor: "#2563eb", borderRadius: "1.25rem", color: "white", fontWeight: "500", fontSize: "1rem", padding: "0.75rem 1.25rem", margin: "0.5rem 0" },
    chatButton: { backgroundColor: "#2563eb", borderRadius: "9999px" },
    userMessageBox: { backgroundColor: "#e0e7ff", color: "#1e293b", borderRadius: "1.25rem", fontWeight: "500", fontSize: "1rem", padding: "0.75rem 1.25rem", margin: "0.5rem 0" }
  },
  stateRef
});

export default config; 