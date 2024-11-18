import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import ComplainCardAdmin from "../components/card/card-admin";
import UserItemAdmin from "../components/items/user-item-admin";
import { useAllMessage, useMessageByUserId } from "../hooks/message";

function ComplainAdmin() {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const { data: selectedUserMessages } = useAllMessage();
    const { data: userMessages, isLoading, refetch } = useMessageByUserId(selectedUserId || 0);
    useEffect(() => {
        if (selectedUserId !== null) {
            refetch();
        }
    }, [selectedUserId, refetch]);
    
    return (
        <Stack direction={'row'}>
            <Box flex={1} height={'85vh'} sx={{ overflowY: 'auto', borderRight: '1px solid #252525', borderTop: '1px solid #252525' }}>
                {selectedUserMessages?.map((message) => (
                    <UserItemAdmin
                        key={message.userId}
                        username={message.user.profile.username}
                        image={message.user.profile.image?.url}
                        lastMessage={message.message}
                        onClick={() => setSelectedUserId(message.userId)}
                    />
                ))}
            </Box>
            <Box flex={3} height={'85vh'} sx={{ borderTop: '1px solid #252525', overflowY: 'auto' }}>
                <ComplainCardAdmin messages={userMessages} />
            </Box>
        </Stack>
    );
}

export default ComplainAdmin;
