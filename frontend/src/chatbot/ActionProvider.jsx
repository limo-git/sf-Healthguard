import { createChatBotMessage } from "react-chatbot-kit";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, stateRef) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.stateRef = stateRef;
  }

  handleCovid = () => {
    const msg = this.createChatBotMessage(
      "COVID-19 symptoms include fever, cough, breathlessness, loss of smell, and fatigue. If you suspect COVID-19, isolate and consult a doctor."
    );
    this.addMessageToState(msg);
  };

  handleFlu = () => {
    const msg = this.createChatBotMessage(
      "Common flu symptoms are fever, runny nose, sneezing, sore throat, and body aches. Rest and hydration are important."
    );
    this.addMessageToState(msg);
  };

  handleFever = () => {
    const msg = this.createChatBotMessage(
      "Fever can be a sign of infection. Monitor your temperature, stay hydrated, and consult a doctor if it persists."
    );
    this.addMessageToState(msg);
  };

  handleCough = () => {
    const msg = this.createChatBotMessage(
      "Cough can be due to flu, COVID-19, or other causes. If it's severe or persistent, seek medical advice."
    );
    this.addMessageToState(msg);
  };

  handleAdvice = () => {
    const msg = this.createChatBotMessage(
      "For health advice, describe your symptoms or ask about a specific disease. Always consult a healthcare professional for emergencies."
    );
    this.addMessageToState(msg);
  };

  handleDefault = () => {
    const msg = this.createChatBotMessage(
      "I'm here to help with health and disease queries. Please ask about symptoms, diseases, or health advice."
    );
    this.addMessageToState(msg);
  };

  handleGemini = async (userMessage) => {
    const history = this.stateRef.current.messages
      .map(msg => (msg.type === "user" ? `User: ${msg.message}` : `Bot: ${msg.message}`))
      .join("\n");
    const prompt = `${history}\nUser: ${userMessage}\nBot:`;

    try {
      const response = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await response.json();
      const msg = this.createChatBotMessage(data.reply);
      this.addMessageToState(msg);
    } catch (error) {
      const msg = this.createChatBotMessage(
        "Sorry, I couldn't get a response from Gemini."
      );
      this.addMessageToState(msg);
    }
  };

  addMessageToState = (msg) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, msg],
    }));
  };
}

export default ActionProvider; 