class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lower = message.toLowerCase();
    if (lower.includes("covid")) {
      this.actionProvider.handleCovid();
    } else if (lower.includes("flu")) {
      this.actionProvider.handleFlu();
    } else if (lower.includes("fever") || lower.includes("temperature")) {
      this.actionProvider.handleFever();
    } else if (lower.includes("cough")) {
      this.actionProvider.handleCough();
    } else if (lower.includes("help") || lower.includes("advice")) {
      this.actionProvider.handleAdvice();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser; 