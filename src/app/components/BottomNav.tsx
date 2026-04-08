import { Home, Grid, Search, User, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function BottomNav() {
const location = useLocation();
const { cart, currentUser} = useApp();
const isAdmin = currentUser?.isAdmin;

const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

const navItems = isAdmin
? [
    { name: "Inicio", icon: Home, path: "/admin" },
    { name: "Perfil", icon: User, path: "/perfil" },
]
: [
    { name: "Inicio", icon: Home, path: "/" },
    { name: "Perfil", icon: User, path: "/perfil" },
    { name: "Carrito", icon: ShoppingCart, path: "/checkout" },
];

return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md md:hidden z-50">
    <div className="flex justify-around py-2">
        {navItems.map((item) => {
        const Icon = item.icon;
        const active = location.pathname === item.path;

        return (
            <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center text-xs ${
                active ? "text-blue-600" : "text-gray-500"
            }`}
            >
            {item.name === "Carrito" ? (
                <div className="relative">
                    <Icon size={20} />

                    {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#5b4c9f] text-white text-[10px] rounded-full px-1.5 py-0.5">
                        {cartCount}
                    </span>
                    )}
                </div>
                ) : (
                <Icon size={20} />
                )}
                {item.name}
            </Link>
        );
        })}
    </div>
    </div>
);
}