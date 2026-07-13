import MemberCard from "./MemberCard";
import { Member } from "@/types/member";

const members: Member[] = [
  {
    id: "1",
    full_name: "Michiale Solomon",
    age: 24,
    gender: "Male",
    phone: "0950236535",
    status: "Employed",
    photo_url: "/default-avatar.png",
    created_at: "",
  },
  {
    id: "2",
    full_name: "Minase Maru",
    age: 22,
    gender: "Male",
    phone: "0912345678",
    status: "University Student",
    photo_url: "/default-avatar.png",
    created_at: "",
  },
];

export default function MemberGrid() {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
        />
      ))}
    </div>
  );
}