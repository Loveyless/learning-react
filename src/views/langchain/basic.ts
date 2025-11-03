import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

async function sendMessage(text: string) {
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
  const messages = [new SystemMessage("Translate the following from English into Italian"), new HumanMessage(text)];
  // await model.invoke("Hello");
  // await model.invoke([{ role: "user", content: "Hello" }]);
  // await model.invoke([new HumanMessage("hi!")]);
  await model.invoke(messages);

  // 3. Streaming
  const stream = await model.stream(messages);
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
    console.log(`${chunk.content}|`);
  }
  return chunks.map((chunk) => chunk.content).join("");
}

export default sendMessage;
