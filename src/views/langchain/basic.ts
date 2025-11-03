import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 1. Instantiate the model
const model = new ChatOpenAI({ model: "gpt-4" });

// 2. post messages to the model
const messages = [new SystemMessage("Translate the following from English into Italian"), new HumanMessage("hi!")];
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
