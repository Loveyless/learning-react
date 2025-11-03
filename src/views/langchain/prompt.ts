import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// 1. Instantiate the model
const model = new ChatOpenAI({ model: "gpt-4" });

// 2. Create a prompt template
const systemTemplate = "Translate the following from English into {language}";
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

// 3. Invoke the prompt template
const promptValue = await promptTemplate.invoke({
  language: "chinese",
  text: "你好",
});

// 4. Invoke the model
const response = await model.invoke(promptValue);
console.log(`${response.content}`);

// 5. Streaming
const stream = await model.stream(promptValue);
const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk);
  console.log(`${chunk.content}|`);
}
