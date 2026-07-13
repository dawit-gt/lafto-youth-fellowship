import Container from "@/components/layout/Container";
import {
  Eye,
  Target,
  Heart,
} from "lucide-react";

const cards = [
  {
    title: "Vision",
    description:
      "To raise spiritually mature young people who positively impact church and society.",
    icon: Eye,
  },
  {
    title: "Mission",
    description:
      "Equip youth through discipleship, fellowship, leadership and service.",
    icon: Target,
  },
  {
    title: "Core Values",
    description:
      "Faith, Love, Integrity, Unity, Service and Excellence.",
    icon: Heart,
  },
];

export default function Mission() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Vision, Mission & Values
          </h2>

          <p className="mt-4 text-slate-600">
            The principles that guide our fellowship.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              >
                <Icon className="mb-5 h-10 w-10 text-blue-700" />

                <h3 className="text-2xl font-semibold">
                  {card.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}