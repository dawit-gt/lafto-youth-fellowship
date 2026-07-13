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
      <main className="min-h-screen bg-slate-50 py-16">
        <Container>
          <div className="animate-pulse space-y-6 max-w-2xl mx-auto">
            <div className="h-8 w-32 rounded bg-slate-200" />
            <div className="h-80 w-full rounded-2xl bg-slate-200" />
            <div className="h-6 w-1/2 rounded bg-slate-200" />
            <div className="h-4 w-1/3 rounded bg-slate-200" />
          </div>
        </Container>
      </main>
    );
  }

  if (!member) {
    return (
      <main className="min-h-screen bg-slate-50 py-16">
        <Container>
          <div className="text-center py-24">
            <p className="text-xl font-medium text-slate-600">Member not found</p>
            <button
              onClick={() => router.push("/members")}
              className="mt-6 rounded-lg bg-[#0B3D91] px-6 py-3 text-white hover:bg-blue-700"
            >
              Back to Members
            </button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <Container>
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-[#0B3D91] transition"
        >
          <ArrowLeft size={20} />
          Back to Members
        </button>

        <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="relative h-80 w-full bg-slate-100">
            <Image
              src={member.photo_url || "/default-avatar.png"}
              alt={member.full_name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {member.full_name}
              </h1>
              <span className="mt-2 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#0B3D91]">
                {member.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <User className="text-[#0B3D91]" size={20} />
                <div>
                  <p className="text-xs text-slate-500">Gender</p>
                  <p className="font-medium text-slate-800">{member.gender}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <Calendar className="text-[#0B3D91]" size={20} />
                <div>
                  <p className="text-xs text-slate-500">Age</p>
                  <p className="font-medium text-slate-800">{member.age} years</p>
                </div>
              </div>

              {member.education_level && (
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <GraduationCap className="text-[#0B3D91]" size={20} />
                  <div>
                    <p className="text-xs text-slate-500">Education</p>
                    <p className="font-medium text-slate-800">{member.education_level}</p>
                  </div>
                </div>
              )}

              {member.occupation && (
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <Briefcase className="text-[#0B3D91]" size={20} />
                  <div>
                    <p className="text-xs text-slate-500">Occupation</p>
                    <p className="font-medium text-slate-800">{member.occupation}</p>
                  </div>
                </div>
              )}
            </div>

            {member.bio && (
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500 mb-2">About</p>
                <p className="text-slate-700 leading-relaxed">{member.bio}</p>
              </div>
            )}

          </div>
        </div>
      </Container>
    </main>
  );
}