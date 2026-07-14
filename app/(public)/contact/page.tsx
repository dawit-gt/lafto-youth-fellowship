"use client";

import Container from "@/components/layout/Container";
import { MapPin, Phone, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-[#0B3D91] py-24 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
              Contact Us
            </span>
            <h1 className="mt-6 text-4xl font-bold">Get In Touch</h1>
            <p className="mt-6 text-lg text-blue-100">
              We would love to hear from you. Reach out to us through any of the
              channels below.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Cards */}
      <section className="py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl grid gap-6 sm:grid-cols-3">
            {/* Phone */}
            <div className="rounded-2xl border p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <Phone className="h-6 w-6 text-[#0B3D91]" />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">Phone</h3>
              <p className="mt-2 text-slate-600">0950236535</p>
            </div>

            {/* Location */}
            <div className="rounded-2xl border p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <MapPin className="h-6 w-6 text-[#0B3D91]" />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">Location</h3>
              <p className="mt-2 text-slate-600">
                Lafto, Addis Ababa, Ethiopia
              </p>
            </div>

            {/* Telegram */}
            <div className="rounded-2xl border p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <MessageCircle className="h-6 w-6 text-[#0B3D91]" />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">Telegram</h3>
              <a
                href={"https://t.me/+_ylPiiNclAVhZTQ0"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[#0B3D91] hover:underline"
              >
                Join our group
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.0!2d38.7!3d8.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTQnMDAuMCJOIDM4wrA0MicwMC4wIkU!5e0!3m2!1sen!2set!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Telegram CTA */}
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-[#0B3D91] p-10 text-center text-white">
            <h2 className="text-2xl font-bold">Join Our Community</h2>
            <p className="mt-3 text-blue-100">
              Stay updated with fellowship news, events, and announcements by
              joining our Telegram group.
            </p>

            <a
              href={"https://t.me/+_ylPiiNclAVhZTQ0"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#229ED9] px-8 py-3 font-medium text-white hover:bg-[#1a8dbf] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.67l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.941z" />
              </svg>
              Join Telegram Group
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
