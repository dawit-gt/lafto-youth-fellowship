import Container from "@/components/layout/Container";
import { Church, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white py-12 md:py-24">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 md:text-sm">
              About Us
            </span>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 md:mt-6 md:text-4xl">
              A Place Where Faith, Friendship and Service Meet.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
              Lafto Mekaneysus Youth Fellowship exists to help young people
              grow spiritually, discover their God-given gifts, build strong
              friendships and become faithful servants of Christ.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
              Through Bible studies, worship, outreach, leadership training,
              and community service, we strive to glorify God while supporting
              one another in every stage of life.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border bg-slate-50 p-5 shadow-sm md:p-6">
              <Church className="mb-3 h-8 w-8 text-blue-700 md:h-10 md:w-10" />
              <h3 className="text-base font-semibold md:text-xl">Spiritual Growth</h3>
              <p className="mt-2 text-sm text-slate-600 md:mt-3">
                Growing deeper in God's Word through worship, Bible study and prayer.
              </p>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-5 shadow-sm md:p-6">
              <HeartHandshake className="mb-3 h-8 w-8 text-green-700 md:h-10 md:w-10" />
              <h3 className="text-base font-semibold md:text-xl">Community Service</h3>
              <p className="mt-2 text-sm text-slate-600 md:mt-3">
                Serving our church and society with love, compassion and unity.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}