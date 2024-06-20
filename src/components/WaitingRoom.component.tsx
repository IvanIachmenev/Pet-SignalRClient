"use client"
import { Button, Heading, Input, Text } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";

type Props = {
    joinChat: (userName: string, chatName: string) => Promise<void>,
}

export default function WaitingRoom({ joinChat }: Props) {
    const [userName, setUserName] = useState("");
    const [chatName, setChatName] = useState("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinChat(userName, chatName);
    }

    return (
        <form
            onSubmit={onSubmit}
            className="max-w-sm w-full bg-white p-8 rounded shadow-lg">
            <Heading>Online chat</Heading>
            <div className="mb-4">
                <Text fontSize={"sm"}>User Name</Text>    
                <Input name="userName" placeholder="Enter you name" onChange={(e) => setUserName(e.target.value)}></Input>
            </div>
            <div className="mb-4">
                <Text fontSize={"sm"}>Chat Name</Text>
                <Input name="chatRoom" placeholder="Enter chat name" onChange={(e) => setChatName(e.target.value)}></Input>
            </div>
            <Button type="submit" colorScheme="blue"> 
                Join chat
            </Button>
        </form>
    )
}