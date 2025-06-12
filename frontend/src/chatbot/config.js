import { createChatBotMessage } from "react-chatbot-kit";

const botName = "HealthBot";

const config = {
  botName,
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. Ask me anything about symptoms, diseases, or health advice.`)
  ],
  customStyles: {
    botMessageBox: { backgroundColor: "#2563eb" },
    chatButton: { backgroundColor: "#2563eb" }
  }
};

export default config; 