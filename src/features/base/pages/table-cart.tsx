import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Card, CardContent, Container, Grid2, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";
import { LineMdCloseToMenuAltTransition } from "../../../components/icons";
import DropDownDashboard from "../components/modal/dashboard";

const TableCart: React.FC = () => {
    const [anchorElDashboard, setAnchorElDashboard] = React.useState<null | HTMLElement>(null);
    const handleOpenDashboardMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElDashboard(event.currentTarget);
    };
    const handleCloseDashboardMenu = () => {
        setAnchorElDashboard(null);
    };
    const summaryData = [
        {
            title: "Total customers",
            value: 765,
            icon: <PersonIcon fontSize="large" color="error" />,
        },
        {
            title: "Total income",
            value: "Rp. 600.760.000",
            icon: <AttachMoneyIcon fontSize="large" color="success" />,
        },
        {
            title: "New Orders",
            value: 150,
            icon: <ShoppingCartIcon fontSize="large" color="primary" />,
        },
        {
            title: "Unread Chats",
            value: 15,
            icon: <ChatIcon fontSize="large" color="info" />,
        },
    ];

    const userAnalyticsData = [
        ["Month", "Organic", "Paid"],
        ["January", 30, 50],
        ["February", 40, 60],
        ["March", 50, 70],
        ["April", 60, 60],
        ["May", 70, 50],
        ["June", 60, 40],
        ["July", 50, 30],
    ];

    const revenueData = [
        ["Category", "Revenue"],
        ["Shirts", 400],
        ["Shoes", 300],
        ["Bags", 300],
    ];

    const optionsLineChart = {
        title: "User Analytics",
        hAxis: { title: "Month" },
        vAxis: { title: "Users" },
        series: {
            0: { color: "#00C49F" },
            1: { color: "#FF4081" },
        },
        backgroundColor: "none",
        legendTextStyle: { color: "#fff" },
        titleTextStyle: { color: "#fff" },
        hAxisTextStyle: { color: "#fff" },
        vAxisTextStyle: { color: "#fff" },
    };

    const optionsPieChart = {
        title: "Revenue",
        is3D: true,
        colors: ["#4285F4", "#00C49F", "#FF4081"],
        backgroundColor: "none",
        legendTextStyle: { color: "#fff" },
        titleTextStyle: { color: "#fff" },
    };

    return (
        <Container
            maxWidth="lg"
            style={{
                color: "#fff",
                padding: "20px",
                borderRadius: "8px",
            }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="30px">
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "600",
                        color: "white",
                    }}>
                    Dashboard
                </Typography>
                <IconButton onClick={handleOpenDashboardMenu}>
                    <LineMdCloseToMenuAltTransition />
                </IconButton>
            </Box>

            <Stack spacing={2} display="flex">
                <Stack direction="row" gap={2}>
                    {summaryData.map((item, index) => (
                        <Grid2 width={"100%"} key={index}>
                            <Card style={{ backgroundColor: "#202020", color: "#fff" }}>
                                <CardContent style={{ display: "flex", alignItems: "center" }}>
                                    <Box mr={2}>{item.icon}</Box>
                                    <Box>
                                        <Typography variant="subtitle1">{item.title}</Typography>
                                        <Typography variant="h6">{item.value}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Stack>
                <Stack direction={"row"} gap={2}>
                    <Grid2 width={"50%"} height={"100%"}>
                        <Card
                            style={{
                                backgroundColor: "#202020",
                                color: "#fff",
                                padding: "20px",
                            }}>
                            <Chart
                                chartType="LineChart"
                                width="100%"
                                height="280px"
                                data={userAnalyticsData}
                                options={optionsLineChart} />
                        </Card>
                    </Grid2>

                    <Grid2 width={"50%"}>
                        <Card
                            style={{
                                backgroundColor: "#202020",
                                color: "#fff",
                                padding: "20px",
                            }}>
                            <Chart
                                chartType="PieChart"
                                width="100%"
                                height="280px"
                                data={revenueData}
                                options={optionsPieChart}
                            />
                        </Card>
                    </Grid2>
                </Stack>
                <DropDownDashboard anchorEl={anchorElDashboard} handleClose={handleCloseDashboardMenu} />
            </Stack>
        </Container>
    );
};

export default TableCart;