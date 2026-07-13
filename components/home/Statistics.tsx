import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";
import {
  Users,
  GraduationCap,
  Briefcase,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    title: "Members",
    value: "120+",
    icon: Users,
  },
  {
    title: "Students",
    value: "85",
    icon: GraduationCap,
  },
  {
    title: "Employed",
    value: "20",
    icon: Briefcase,
  },
  {
    title: "Events",
    value: "15+",
    icon: CalendarDays,
  },
];

export default function Statistics() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionTitle
          badge="Community"
          title="Our Fellowship in Numbers"
          description="These numbers will later come directly from the database."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              >
                <Icon className="mx-auto h-12 w-12 text-[#0B3D91]" />

                <h3 className="mt-6 text-5xl font-bold">
                  {item.value}
                </h3>

                <p className="mt-3 text-slate-600">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}