import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../features/auth/pages/login";
import RegisterPage from "../features/auth/pages/register";
import AuthPage from "../features/auth/router/router";
import DetailProduct from "../features/base/components/items/detail-product";
import Checkout from "../features/base/pages/checkout";
import Complain from "../features/base/pages/complain";
import ComplainAdmin from "../features/base/pages/message-admin";
import ListCategory from "../features/base/pages/list-category";
import ListProduct from "../features/base/pages/list-product";
import OrderList from "../features/base/pages/order-list";
import Product from "../features/base/pages/product";
import Profile from "../features/base/pages/profile";
import TableCart from "../features/base/pages/table-cart";
import BasePage from "../features/base/router/base";
import Dashboard from "../features/base/router/dashboard";

export function AppRouter() {
    const router = createBrowserRouter([
        {
            element: <AuthPage />,
            children: [
                {
                    path: "login",
                    element: <LoginPage />,
                },
                {
                    path: "register",
                    element: <RegisterPage />,
                }
            ]
        },
        {
            path: "/dashboard",
            element: <Dashboard />,
            children: [
                {
                    index: true,
                    element: <TableCart />,
                },
                {
                    path: 'list-order',
                    element: <OrderList />,
                },
                {
                    path: 'list-category',
                    element: <ListCategory />,
                },
                {
                    path: 'complain',
                    element: <ComplainAdmin />,
                },
                {
                    path: 'list-product',
                    element: <ListProduct />,
                }
            ]
        },
        {
            path: "/",
            element: <BasePage />,
            children: [
                {
                    index: true,
                    element: <Product />,
                },
                {
                    path: 'profile/:username',
                    element: <Profile />,
                },
                {
                    path: 'detail/:productName',
                    element: <DetailProduct />,
                },
                {
                    path: 'complain',
                    element: <Complain />,
                },
                {
                    path: 'checkout',
                    element: <Checkout />,
                },
            ]
        },
    ]);

    return <RouterProvider router={router} />;
}