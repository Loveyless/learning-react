import { useState } from "react";
import { Input } from "antd";
import sendMessage from "./basic";

function Langchain() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const handleSendMessage = async () => {
    const result = await sendMessage(text);
    setResult(result);
  };
  return (
    <div>
      <h1>Langchain</h1>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSendMessage}>Send Message</button>
      <div>{result}</div>
    </div>
  );
}

export default Langchain;
