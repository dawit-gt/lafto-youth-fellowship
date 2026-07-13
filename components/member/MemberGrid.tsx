import MemberCard from "./MemberCard";
import { Member } from "@/types/member";

interface Props {
  members: Member[];
}

export default function MemberGrid({ members }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}