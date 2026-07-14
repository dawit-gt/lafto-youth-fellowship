"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Members", href: "/members" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Hayalan Serawit Logo"
              width={55}
              height={55}
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#0B3D91]">
                ሀያላን ሠራዊት
              </h1>
              <p className="text-xs text-slate-600">
                Lafto Mekaneyesus Youth
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition hover:text-[#0B3D91] ${
                  pathname === item.href
                    ? "text-[#0B3D91]"
                    : "text-slate-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Admin Button */}
          <div className="hidden lg:block">
            <Link href="/login">
              <Button>Admin Login</Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </nav>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t bg-white px-6 py-4 space-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3 font-medium transition hover:bg-slate-50 hover:text-[#0B3D91] ${
                pathname === item.href
                  ? "bg-blue-50 text-[#0B3D91]"
                  : "text-slate-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-3 border-t">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button className="w-full">Admin Login</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}