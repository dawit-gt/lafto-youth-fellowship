"use client";

export default function MemberFilter() {
  return (
    <select className="rounded-xl border px-4 py-3 outline-none focus:border-blue-700">
      <option>All Members</option>
      <option>Primary Student</option>
      <option>Secondary Student</option>
      <option>University Student</option>
      <option>College Student</option>
      <option>Employed</option>
      <option>Unemployed</option>
    </select>
  );
}