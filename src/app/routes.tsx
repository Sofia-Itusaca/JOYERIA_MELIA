import { createHashRouter } from "react-router-dom";

import { Root } from "./pages/Root";
import { WelcomePage } from "./pages/WelcomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminProductDetail } from "./pages/AdminProductDetail";
import { AdminOrders } from "./pages/AdminOrders";
import { AdminCreateProduct } from "./pages/AdminCreateProduct";
import { AdminAboutPage } from "./pages/AdminAboutPage";
import { NotFound } from "./pages/NotFound";

export const router = createHashRouter([
{
    path: "/",
    element: <Root />,
    children: [
    { index: true, element: <CatalogPage /> },
    { path: "bienvenida", element: <WelcomePage /> },
    { path: "catalogo", element: <CatalogPage /> },
    { path: "producto/:id", element: <ProductPage /> },
    { path: "checkout", element: <CheckoutPage /> },
    { path: "login", element: <LoginPage /> },
    { path: "registro", element: <RegisterPage /> },
    { path: "perfil", element: <ProfilePage /> },
    { path: "admin", element: <AdminDashboard /> },
    { path: "admin/producto/:id", element: <AdminProductDetail /> },
    { path: "admin/pedidos", element: <AdminOrders /> },
    { path: "admin/crear-producto", element: <AdminCreateProduct /> },
    { path: "admin/sobre-nosotros", element: <AdminAboutPage /> },
    { path: "*", element: <NotFound /> },
    ],
},
]);