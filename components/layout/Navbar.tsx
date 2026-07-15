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
  { name: "Members", href: "/members" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md relative">
      <Container>
        <nav className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Hayalan Serawit Logo"
              width={36}
              height={36}
              priority
            />
            <div>
              <h1 className="text-xs font-bold text-[#0B3D91] leading-tight md:text-sm">
                ሀያላን ሠራዊት
              </h1>
              <p className="text-xs text-slate-500 leading-tight">
                Lafto Mekaneyesus Youth
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition hover:text-[#0B3D91] ${
                  pathname === item.href ? "text-[#0B3D91]" : "text-slate-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Admin Button */}
          <div className="hidden lg:block">
            <Link href="/login">
              <Button size="sm">Admin Login</Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

        </nav>
      </Container>

      {/* Mobile Menu — compact dropdown aligned right */}
      {open && (
        <div className="lg:hidden absolute right-4 top-16 w-56 border rounded-xl bg-white shadow-lg z-50">
          <div className="px-3 py-3 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-slate-50 hover:text-[#0B3D91] ${
                  pathname === item.href
                    ? "bg-blue-50 text-[#0B3D91]"
                    : "text-slate-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full">Admin Login</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}