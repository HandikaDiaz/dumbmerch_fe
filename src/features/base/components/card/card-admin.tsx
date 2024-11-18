import { Avatar, FormControl, Input, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ConversationEntity } from "../../../../entities/message-entity";
import { useAppSelector } from "../../../../store/hooks/global-hook";
import { useMessage } from "../../hooks/message";
import { useQueryClient } from "@tanstack/react-query";

interface ComplainCardAdminProps {
    messages?: ConversationEntity[];
}

function ComplainCardAdmin({ messages = [] }: ComplainCardAdminProps) {
    const user = useAppSelector((state) => state.auth);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [content, setContent] = useState("");
    const { replyMessage } = useMessage();
    const toUserId = messages[0]?.userId;
    const conversationId = messages[0]?.id;
    const queryClient = useQueryClient();
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        scrollToBottom();
    }, []);

    const handleSendMessage = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && content.trim()) {
            replyMessage(toUserId, content, conversationId);
            setContent("");
            await queryClient.invalidateQueries({ queryKey: ['message-admin', toUserId] }); 
            await queryClient.invalidateQueries({ queryKey: ['all-message'] }); 
        }
    };

    return (
        <Stack justifyContent={'flex-end'} direction={'column'} sx={{ width: '90%', height: '95%', mx: 'auto', gap: 2.5 }}>
            {messages?.length > 0 ? (
                messages.map((conversation) => (
                    conversation.messages?.map((item) => (
                        <Stack
                            key={item.id}
                            direction={item.senderId === user.id ? 'row-reverse' : 'row'}
                            gap={2}
                            sx={{ alignSelf: item.senderId === user.id ? 'flex-end' : 'flex-start' }}>
                            <Avatar alt="User Avatar" src='/static/images/avatar/2.jpg' />
                            <Typography
                                sx={{
                                    color: 'primary.main',
                                    bgcolor: item.senderId === user.id ? '#4CAF50' : '#575757',
                                    p: 1.5,
                                    borderRadius: item.senderId === user.id ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                    width: '75%'
                                }}>
                                {item.content}
                            </Typography>
                        </Stack>
                    ))
                ))
            ) : (
                <Typography>No conversations available.</Typography>
            )}
            <div ref={messagesEndRef} />
            <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                <Input
                    placeholder="Send Message"
                    sx={{ p: 0.2, border: 'none', px: 1.3 }}
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleSendMessage}
                    ref={inputRef}
                />
            </FormControl>
        </Stack>
    );
}

export default ComplainCardAdmin;
