import Container from "@/components/layout/Container";
import { Church, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
              About Us
            </span>

            <h2 className="mt-6 text-4xl font-bold text-slate-900">
              A Place Where Faith,
              Friendship and Service Meet.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Lafto Mekaneysus Youth Fellowship exists to help young people
              grow spiritually, discover their God-given gifts, build strong
              friendships and become faithful servants of Christ.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Through Bible studies, worship, outreach, leadership training,
              and community service, we strive to glorify God while supporting
              one another in every stage of life.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border bg-slate-50 p-6 shadow-sm">
              <Church className="mb-4 h-10 w-10 text-blue-700" />

              <h3 className="text-xl font-semibold">
                Spiritual Growth
              </h3>

              <p className="mt-3 text-slate-600">
                Growing deeper in God's Word through worship,
                Bible study and prayer.
              </p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-6 shadow-sm">
              <HeartHandshake className="mb-4 h-10 w-10 text-green-700" />

              <h3 className="text-xl font-semibold">
                Community Service
              </h3>

              <p className="mt-3 text-slate-600">
                Serving our church and society with love,
                compassion and unity.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}