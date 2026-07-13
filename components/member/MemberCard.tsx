import Image from "next/image";
import Link from "next/link";
import { User, GraduationCap, Briefcase } from "lucide-react";
import { Member } from "@/types/member";

interface Props {
  member: Member;
}

export default function MemberCard({ member }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-64 w-full bg-slate-100">
        <Image
          src={member.photo_url || "/default-avatar.png"}
          alt={member.full_name}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold">{member.full_name}</h3>

        <div className="flex items-center gap-2 text-slate-600">
          <User size={16} />
          <span className="text-sm">{member.gender} · Age {member.age}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <GraduationCap size={16} />
          <span className="text-sm">{member.status}</span>
        </div>

        {member.education_level && (
          <div className="flex items-center gap-2 text-slate-600">
            <Briefcase size={16} />
            <span className="text-sm">{member.education_level}</span>
          </div>
        )}

        <Link
          href={`/members/${member.id}`}
          className="mt-3 block w-full rounded-lg bg-[#0B3D91] py-3 text-center font-medium text-white hover:bg-blue-700 transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}