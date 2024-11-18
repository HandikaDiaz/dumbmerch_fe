import { Avatar, FormControl, Input, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useMessage } from "../../hooks/message";
import { useAppSelector } from "../../../../store/hooks/global-hook";

function ComplainCard() {
    const user = useAppSelector((state) => state.auth);
    const { data, sendMessage } = useMessage();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [content, setContent] = useState("");

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
    }, [data]);

    const handleSendMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && content.trim()) {
            sendMessage(user.id, content);
            setContent("");
        }
    };

    return (
        <Stack justifyContent={'flex-end'} direction={'column'} sx={{ width: '90%', height: '95%', mx: 'auto', gap: 2.5 }}>
            <Stack
                sx={{
                    overflowY: 'auto',
                    gap: 2,
                    maxHeight: '80%',
                }}>

                {data?.map((message) => (
                    <Stack
                        key={message.id}
                        direction={message.senderId === user.id ? 'row-reverse' : 'row'}
                        gap={2}
                        sx={{ alignSelf: message.senderId === user.id ? 'flex-end' : 'flex-start' }}>
                        <Avatar alt="User Avatar" src={message.senderId === user.id ? message.sender?.profile.image?.url : 'https://i.pinimg.com/564x/05/90/da/0590da409367db19d55c753f4eca806b.jpg'} />
                        <Typography
                            sx={{
                                color: 'primary.main',
                                bgcolor: message.senderId === user.id ? '#4CAF50' : '#575757',
                                p: 1.5,
                                borderRadius: message.senderId === user.id ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                width: '75%'
                            }}>
                            {message.content}
                        </Typography>
                    </Stack>
                ))}
                <div ref={messagesEndRef} />
            </Stack>
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
    )
}

export default ComplainCard;
