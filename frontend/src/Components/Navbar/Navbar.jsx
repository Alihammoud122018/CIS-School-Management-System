import React from "react";
import './Navbar.css';

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/student/dashboard" },
    { label: "Courses", href: "/student/courses" },
    { label: "Assesement", href: "/student/assesement" },
    { label: "Events", href: "/events" },
    { label: "Calendar", href: "/calendar" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <div className="navbar">
      <h2>CIS Portal</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <button className="nav-button">Sign-out</button>
    </div>
  );
};

export default Navbar;
