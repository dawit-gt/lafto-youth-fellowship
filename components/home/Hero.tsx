import Container from "@/components/layout/Container";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-slate-100 py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
            Welcome to Lafto Mekaneysus Youth Fellowship
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Growing Together in Faith,
            <br />
            Serving Together in Love.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            A community where young people grow spiritually, build lifelong
            friendships, discover their gifts, and serve God together.
          </p>

          <HeroButtons />

          <HeroStats />
        </div>
      </Container>
    </section>
  );
}