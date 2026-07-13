import { FaUsers, FaGraduationCap, FaBriefcase, FaHandsHelping } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers size={28} />,
    value: "120+",
    label: "Members",
  },
  {
    icon: <FaGraduationCap size={28} />,
    value: "85",
    label: "Students",
  },
  {
    icon: <FaBriefcase size={28} />,
    value: "20",
    label: "Employed",
  },
  {
    icon: <FaHandsHelping size={28} />,
    value: "8",
    label: "Ministries",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border bg-white p-6 text-center shadow-sm"
        >
          <div className="mb-3 flex justify-center text-blue-900">
            {stat.icon}
          </div>

          <h3 className="text-2xl font-bold">{stat.value}</h3>

          <p className="mt-2 text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}