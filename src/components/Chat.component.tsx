import { Button, CloseButton, Heading, Input } from "@chakra-ui/react";
import Message from "./Message.component";
import { FormEvent, useEffect, useRef, useState } from "react";

export interface MessageInfo {
    userName: string;
    message: string;
}

type Props = {
    messages: MessageInfo[],
    chatName: string,
    closeChat: () => void,
    sendMessage: (message: string) => void
}

export default function Chat({ messages, chatName, closeChat, sendMessage }: Props) {
    const [message, setMessage] = useState("");
    const messageRef = useRef<HTMLDivElement>();

    useEffect(() => {
        messageRef?.current?.scrollIntoView
    }, [messages])

    const onSendMessage = () => {
        sendMessage(message);
        setMessage("");
    }

    return(
        <div className="w-1/2 bg-white p-8 rounded shadow-lg">
            <div className="flex flex-row justify-between mb-5">
                <Heading>{chatName}</Heading>
                <CloseButton onClick={closeChat}/>
            </div>
            <div className="flex flex-col overflow-auto scroll-smooth h-96 gap-3 pb-3">
                {messages.map((messageInfo, index) => {
                    return (
                        <Message key={index} userName={messageInfo.userName} message={messageInfo.message} />
                    )
                })}
            </div>
            <div className="flex gap-3">
                <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter the message" />
                <Button colorScheme="blue" onClick={onSendMessage}>Send</Button>
            </div>
        </div>
    );
}