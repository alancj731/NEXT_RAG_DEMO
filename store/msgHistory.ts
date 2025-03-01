import { UIMessage } from "ai";
import { v4 as uuidv4 } from "uuid";

export class MsgHistory {
  static instance: MsgHistory;
  static getInstance() {
    if (!MsgHistory.instance) {
      MsgHistory.instance = new MsgHistory();
    }
    return MsgHistory.instance;
  }

  public getMsgHistory() : UIMessage[] {
    return this.msgHistory as UIMessage[];
  }

  public constructor() {
    const id = uuidv4();
    console.log('construct MsgHistory:', id)
    this.msgHistory = [{
      id,
      role: "assistant" as const,
      content: "Hello, how can I help you?",
      parts: [],
    }];
  }

  public msgHistory = null as UIMessage[] | null;

  public setMsgHistory(messages: UIMessage[]) {
    console.log('setMsgHistory touched:', messages)
    this.msgHistory = [...messages];
    console.log('msgHistory changed:', this.msgHistory)
  }
}
