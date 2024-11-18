import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AllConversationEntity } from "../../../entities/conversation-entity";
import { ConversationEntity, MessageEntity } from "../../../entities/message-entity";
import { apiV1 } from "../../../utils/api";

export function useMessage() {
    const queryClient = useQueryClient();
    const [socket] = useState(() => io("http://localhost:3000"));
    const [_, setMessages] = useState<MessageEntity[]>([]);

    async function getMessage() {
        const res = await apiV1.get<null, { data: MessageEntity[] }>('/message/history', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });
        return res.data;
    }

    const { data, isLoading } = useQuery<MessageEntity[], null, MessageEntity[]>({
        queryKey: ['message'],
        queryFn: getMessage,
        refetchOnWindowFocus: true,
    });

    const lastMessages = data?.reduce((acc, message) => {
        const userId = message.senderId;
        if (!acc[userId] || acc[userId].createdAt < message.createdAt) {
            acc[userId] = message;
        }
        return acc;
    }, {} as Record<number, MessageEntity>);

    const sendMessage = (fromUserId: number, content: string) => {
        socket.emit("sendMessage", { fromUserId, content });
        queryClient.invalidateQueries({ queryKey: ['message-admin'] });
        queryClient.invalidateQueries({ queryKey: ['message'] });
    };

    const replyMessage = (toUserId: number, content: string, conversationId: number) => {
        socket.emit("replyMessage", { toUserId, content, conversationId });
        queryClient.invalidateQueries({ queryKey: ['message'] });
        queryClient.invalidateQueries({ queryKey: ['message-admin', toUserId] });
        queryClient.setQueryData<MessageEntity[]>(['message-admin'], (oldMessages = []) => [
            ...oldMessages,
            { toUserId, content, conversationId, createdAt: new Date() } as unknown as MessageEntity
        ]);
    };

    useEffect(() => {
        const handleReceiveMessage = (newMessage: MessageEntity) => {
            queryClient.setQueryData<MessageEntity[]>(['message'], (oldMessages = []) => [
                ...oldMessages,
                newMessage,
            ]);
        };
        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage");
        };
    }, [socket, queryClient]);

    return {
        data,
        lastMessages: lastMessages ? Object.values(lastMessages) : [],
        isLoading,
        sendMessage,
        replyMessage
    };
}

export function useAllMessage() {
    async function getAllMessage() {
        const res = await apiV1.get<null, { data: AllConversationEntity[] }>(`/message/all-user`);
        return res.data;
    }
    const { data, isLoading } = useQuery<AllConversationEntity[], null, AllConversationEntity[]>({
        queryKey: ['all-message'],
        queryFn: getAllMessage,
        refetchOnWindowFocus: true,
    });

    return {
        data,
        isLoading
    };
}

export function useMessageByUserId(userId: number) {
    async function getMessageByUserId() {
        const res = await apiV1.get<null, { data: ConversationEntity[] }>(`/message/by-user/${userId}`);
        return res.data;
    }
    const { data, isLoading, refetch } = useQuery<ConversationEntity[], null, ConversationEntity[]>({
        queryKey: ['message-admin', userId],
        queryFn: getMessageByUserId,
        refetchOnWindowFocus: true,
    });

    return {
        data,
        isLoading,
        refetch
    };
}
