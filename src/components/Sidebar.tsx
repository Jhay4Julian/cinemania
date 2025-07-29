import { Link, useLocation } from "react-router-dom";
import { clsx as cn } from "clsx";


const Sidebar = () => {
    const location = useLocation();

    const links = [
        { to: "/", label: "Home" },
        { to: "/search", label: "Search" },
        { to: "/boards", label: "Boards" },
    ];

    return (
        <aside className="w-64 h-screen p-6 fixed text-white bg-gray-900">
            <h2 className="text-3xl font-bold mb-8">Cinemania</h2>
            <nav>
                {links.map((link) => (
                    <Link
                        to={link.to}
                        key={link.to}
                        className={cn(
                            "block py-2 px-4 rounded hover:bg-gray-700 transition",
                            location.pathname === link.to ? "bg-gray-700 font-semibold" : ""
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar;