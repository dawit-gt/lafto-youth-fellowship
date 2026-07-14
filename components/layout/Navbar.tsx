"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Members", href: "/members" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between">
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

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-slate-700 transition hover:text-[#0B3D91]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link href="/login">
              <Button>Admin Login</Button>
            </Link>
          </div>

          <button className="lg:hidden">
            <Menu />
          </button>
        </nav>
      </Container>
    </header>
  );
}