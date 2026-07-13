import Container from "@/components/layout/Container";
import SectionTitle from "@/components/layout/SectionTitle";
import FeatureCard from "@/components/shared/FeatureCard";
import {
  BookOpen,
  Music4,
  HandHelping,
  Users,
} from "lucide-react";

const activities = [
  {
    title: "Bible Study",
    description: "Growing in God's Word together every week.",
    icon: <BookOpen size={40} />,
  },
  {
    title: "Worship",
    description: "Praising God through songs and worship.",
    icon: <Music4 size={40} />,
  },
  {
    title: "Community",
    description: "Building friendships that encourage spiritual growth.",
    icon: <Users size={40} />,
  },
  {
    title: "Service",
    description: "Serving the church and the community with love.",
    icon: <HandHelping size={40} />,
  },
];

export default function Activities() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionTitle
          badge="Our Fellowship"
          title="What We Do"
          description="We grow together in faith through worship, learning, fellowship, and service."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <FeatureCard
              key={activity.title}
              {...activity}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}