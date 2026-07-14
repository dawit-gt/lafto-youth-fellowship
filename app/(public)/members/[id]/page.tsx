"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Member } from "@/types/member";
import Container from "@/components/layout/Container";
import { ArrowLeft, User, GraduationCap, Briefcase, Calendar } from "lucide-react";

export default function MemberProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setMember(data);
      setLoading(false);
    }
    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <Container>
          <div className="animate-pulse space-y-6 max-w-md mx-auto">
            <div className="h-6 w-32 rounded bg-slate-200" />
            <div className="mx-auto h-32 w-32 rounded-full bg-slate-200" />
            <div className="h-6 w-1/2 rounded bg-slate-200 mx-auto" />
            <div className="h-4 w-1/3 rounded bg-slate-200 mx-auto" />
          </div>
        </Container>
      </main>
    );
  }

  if (!member) {
    return (
      <main className="min-h-screen bg-slate-50 py-10">
        <Container>
          <div className="text-center py-24">
            <p className="text-lg font-medium text-slate-600">Member not found</p>
            <button
              onClick={() => router.push("/members")}
              className="mt-6 rounded-lg bg-[#0B3D91] px-6 py-3 text-sm text-white hover:bg-blue-700"
            >
              Back to Members
            </button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <Container>
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={18} />
          Back to Members
        </button>

        <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">

          {/* Circular Photo */}
          <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-slate-100 pt-8 pb-4">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-md md:h-36 md:w-36">
              <Image
                src={member.photo_url || "/default-avatar.png"}
                alt={member.full_name}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="mt-4 text-lg font-bold text-slate-900 md:text-2xl">
              {member.full_name}
            </h1>
            <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-[#0B3D91] md:text-sm">
              {member.status}
            </span>
          </div>

          {/* Info */}
          <div className="p-5 space-y-3 md:p-8 md:space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 md:gap-3 md:p-4">
                <User className="text-[#0B3D91] shrink-0" size={16} />
                <div>
                  <p className="text-xs text-slate-500">Gender</p>
                  <p className="text-xs font-medium text-slate-800 md:text-sm">{member.gender}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 md:gap-3 md:p-4">
                <Calendar className="text-[#0B3D91] shrink-0" size={16} />
                <div>
                  <p className="text-xs text-slate-500">Age</p>
                  <p className="text-xs font-medium text-slate-800 md:text-sm">{member.age} years</p>
                </div>
              </div>

              {member.education_level && (
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 md:gap-3 md:p-4">
                  <GraduationCap className="text-[#0B3D91] shrink-0" size={16} />
                  <div>
                    <p className="text-xs text-slate-500">Education</p>
                    <p className="text-xs font-medium text-slate-800 md:text-sm">{member.education_level}</p>
                  </div>
                </div>
              )}

              {member.occupation && (
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 md:gap-3 md:p-4">
                  <Briefcase className="text-[#0B3D91] shrink-0" size={16} />
                  <div>
                    <p className="text-xs text-slate-500">Occupation</p>
                    <p className="text-xs font-medium text-slate-800 md:text-sm">{member.occupation}</p>
                  </div>
                </div>
              )}
            </div>

            {member.bio && (
              <div className="rounded-xl bg-slate-50 p-3 md:p-4">
                <p className="text-xs text-slate-500 mb-1 md:mb-2">About</p>
                <p className="text-xs text-slate-700 leading-relaxed md:text-sm">{member.bio}</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}