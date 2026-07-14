import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";
import { BookOpen, Music4, HandHelping, Users } from "lucide-react";

const activities = [
  {
    title: "Bible Study",
    description: "Growing in God's Word together every week.",
    icon: BookOpen,
  },
  {
    title: "Worship",
    description: "Praising God through songs and worship.",
    icon: Music4,
  },
  {
    title: "Community",
    description: "Building friendships that encourage spiritual growth.",
    icon: Users,
  },
  {
    title: "Service",
    description: "Serving the church and the community with love.",
    icon: HandHelping,
  },
];

export default function Activities() {
  return (
    <section className="bg-slate-50 py-12 md:py-24">
      <Container>
        <SectionTitle
          badge="Our Fellowship"
          title="What We Do"
          description="We grow together in faith through worship, learning, fellowship, and service."
        />
        <div className="grid gap-4 grid-cols-2 md:gap-8 lg:grid-cols-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.title}
                className="rounded-2xl border bg-white p-4 shadow-sm md:p-6"
              >
                <Icon className="h-7 w-7 text-[#0B3D91] md:h-10 md:w-10" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900 md:text-lg">
                  {activity.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 md:mt-2 md:text-sm">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}