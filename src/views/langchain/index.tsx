import { useState, useRef, useEffect } from "react";
import { Input, Button, Layout, List, Avatar, Spin, Flex } from "antd";
import { SendOutlined, UserOutlined, RobotOutlined } from "@ant-design/icons";
import sendMessage from "./basic";


interface Message {
  role: "user" | "assistant";
  content: string;
}

function Langchain() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello, how can I help you today?" },
    { role: "user", content: "Hello, how are you?" },
    { role: "assistant", content: "I'm doing great, thank you!" },
    { role: "user", content: "What is the weather like in Tokyo?" },
    { role: "assistant", content: "The weather in Tokyo is sunny and warm." },
    { role: "user", content: "What is the weather like in Tokyo?" },
    { role: "assistant", content: "The weather in Tokyo is sunny and warm." },
    { role: "user", content: "What is the weather like in Tokyo?" },
    { role: "assistant", content: "The weather in Tokyo is sunny and warm." },
    { role: "user", content: "What is the weather like in Tokyo?" },
    { role: "assistant", content: "The weather in Tokyo is sunny and warm." },
    { role: "user", content: "What is the weather like in Tokyo?" },
    { role: "assistant", content: "The weather in Tokyo is sunny and warm." },
    { role: "user", content: "What is the weather like in Tokyo?" },
    { role: "assistant", content: "The weather in Tokyo is sunny and warm." },
    { role: "user", content: "What is the weather like in Tokyo?" },
    { role: "assistant", content: "The weather in Tokyo is sunny and warm." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    try {
      await sendMessage(inputValue, (chunk) => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === "assistant") {
            lastMessage.content += chunk;
          }
          return newMessages;
        });
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.content = "Sorry, something went wrong.";
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <div className="flex-1 overflow-y-auto">
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item, index: number) => (
            <List.Item
              style={{
                justifyContent: item.role === "user" ? "flex-end" : "flex-start",
                borderBottom: "none",
                padding: "8px 0",
              }}
            >
              <Flex
                gap="middle"
                align="start"
                style={{ flexDirection: item.role === "user" ? "row-reverse" : "row" }}
              >
                <Avatar icon={item.role === "user" ? <UserOutlined /> : <RobotOutlined />} />
                <div
                  style={{
                    backgroundColor: item.role === "user" ? "#1890ff" : "#fff",
                    color: item.role === "user" ? "#fff" : "#000",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    maxWidth: "600px",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {item.content}
                </div>
              </Flex>
              {isLoading && index === messages.length - 1 && (
                <Flex gap="middle" align="start">
                  <div style={{ padding: "10px 15px", borderRadius: "10px" }}>
                    <Spin />
                  </div>
                </Flex>
              )}
            </List.Item>
          )}
        />
        <div ref={messageEndRef} />
      </div>
      <div className="pt-4">
        <Flex gap="middle">
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... (Shift + Enter for new line)"
            autoSize={{ minRows: 1, maxRows: 5 }}
            disabled={isLoading}
            style={{ flex: 1 }}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} loading={isLoading}>
            Send
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default Langchain;
