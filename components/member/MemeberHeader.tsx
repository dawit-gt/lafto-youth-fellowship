import Container from "@/components/layout/Container";

export default function MemberHeader() {
  return (
    <section className="bg-slate-50 py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
            Fellowship Members
          </span>

          <h1 className="mt-6 text-5xl font-bold text-slate-900">
            Meet Our Members
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Browse the members of ሀያላን ሠራዊት ላፍቶ መካነ ኢየሱስ ወጣቶ.
          </p>
        </div>
      </Container>
    </section>
  );
}