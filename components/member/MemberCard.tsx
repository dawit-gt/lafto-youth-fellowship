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

      {/* Circular Photo */}
      <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-slate-100 pt-6 pb-3">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md md:h-28 md:w-28">
          <Image
            src={member.photo_url || "/default-avatar.png"}
            alt={member.full_name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="space-y-2 p-3 md:space-y-3 md:p-5">
        <h3 className="text-sm font-bold text-center md:text-lg">{member.full_name}</h3>

        <div className="flex items-center gap-2 text-slate-600">
          <User size={13} />
          <span className="text-xs md:text-sm">{member.gender} · Age {member.age}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <GraduationCap size={13} />
          <span className="text-xs md:text-sm">{member.status}</span>
        </div>

        {member.education_level && (
          <div className="flex items-center gap-2 text-slate-600">
            <Briefcase size={13} />
            <span className="text-xs md:text-sm">{member.education_level}</span>
          </div>
        )}

        <Link
          href={`/members/${member.id}`}
          className="mt-2 block w-full rounded-lg bg-[#0B3D91] py-2 text-center text-xs font-medium text-white hover:bg-blue-700 transition md:py-3 md:text-sm"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}