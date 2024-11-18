import { MessageEntity } from "./message-entity"
import { ProfileEntity } from "./profile-entity"

export interface AllConversationEntity {
    message: MessageEntity[]
    user: { profile: ProfileEntity }
    userId: number
}