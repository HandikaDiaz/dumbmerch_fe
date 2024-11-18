import { ProfileEntity } from "./profile-entity";

export interface MessageEntity {
    id: number;
    content: string;
    createdAt: Date;
    senderId: number;
    sender: { profile: ProfileEntity };
    conversation: ConversationEntity;
    conversationId: number;
}

export interface ConversationEntity {
    id: number
    adminId: number
    userId: number
    messages: MessageEntity[]
}