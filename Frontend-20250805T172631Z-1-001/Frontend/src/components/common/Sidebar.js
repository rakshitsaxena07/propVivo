import React from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/users", label: "Users" },
  { to: "/roles", label: "Roles" },
  { to: "/media", label: "Media" },
  { to: "/weather", label: "Weather" },
  { to: "/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white shadow h-full">
      <div className="p-4 font-bold text-xl">PropVivo</div>
      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="hover:text-blue-600">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
