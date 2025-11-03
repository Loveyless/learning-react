import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

async function sendMessage(text: string, onUpdate: (chunk: string) => void) {
  console.log(import.meta.env.VITE_OPENAI_API_KEY, import.meta.env.VITE_OPENAI_BASICURL);
  // 1. Instantiate the model
  const model = new ChatOpenAI({
    model: import.meta.env.VITE_OPENAI_MODEL_NAME,
    temperature: 0.7,
    timeout: 10000,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    configuration: {
      baseURL: import.meta.env.VITE_OPENAI_BASICURL,
      defaultHeaders: {},
      // 还可以尝试阻止库发送凭据
      dangerouslyAllowBrowser: true, // 有些情况下需要这个
    },
  });

  // 2. post messages to the model
  const messages = [new SystemMessage("和你对话的是一个使用中文的人，所以你也要用中文回答"), new HumanMessage(text)];
  // await model.invoke("Hello");
  // await model.invoke([{ role: "user", content: "Hello" }]);
  // await model.invoke([new HumanMessage("hi!")]);
  // 3. Streaming
  const stream = await model.stream(messages);
  for await (const chunk of stream) {
    onUpdate(chunk.content as string);
    console.log(`${chunk.content}|`);
  }
}

export default sendMessage;
