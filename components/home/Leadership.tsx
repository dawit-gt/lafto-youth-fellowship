import Container from "@/components/layout/Container";
import { UserRound } from "lucide-react";

const leaders = [
  {
    name: "President",
    role: "Youth Fellowship President",
  },
  {
    name: "Vice President",
    role: "Vice President",
  },
  {
    name: "Secretary",
    role: "Secretary",
  },
];

export default function Leadership() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
            Leadership
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Meet Our Leadership Team
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Dedicated leaders serving the fellowship with faith, humility,
            and commitment.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {leaders.map((leader) => (
            <div
              key={leader.role}
              className="rounded-2xl border p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                <UserRound className="h-12 w-12 text-blue-700" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {leader.name}
              </h3>

              <p className="mt-2 text-slate-600">
                {leader.role}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}