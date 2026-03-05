import HeaderTop from "../HeaderTop";
import { MdViewKanban } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";

export default function Solution() {
  const Solutions = [
    {
      id: 1,
      icon: <MdViewKanban size={26} />,
      title: "Visual Kanban Boards",
      description:
        "Drag and drop tasks across customizable columns to track progress visually and keep work flowing",
    },
    {
      id: 2,
      icon: <RiTeamFill size={26} />,
      title: "Team Collaboration",
      description:
        "Keep everyone in the loop with integrated comments, @mentions, and secure file sharing on every task.",
    },
    {
      id: 3,
      icon: <IoMdAnalytics size={26} />,
      title: "Real-time Analytics",
      description:
        "Monitor project health and team productivity with automated reporting and beautiful dashboard charts.",
    },
  ];

  return (
    <section className="bg-(--bg) py-24 px-6 relative overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute w-125 h-125 bg-(--primary) opacity-10 blur-[120px] rounded-full top-20 left-1/2 -translate-x-1/2"></div>

      <HeaderTop
        title="Everything you need to ship faster"
        description="Powerful tools designed to help teams stay organized and focused on what matters most. Stop juggling tabs and start finishing tasks."
      />

      <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {Solutions.map((ele) => (
          <div
            key={ele.id}
            data-aos="zoom-in"
            className="group p-8 bg-(--card) border border-(--text)/10 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-(--primary)/10 text-(--primary) rounded-xl mb-6 group-hover:scale-110 transition">
              {ele.icon}
            </div>

            <h3 className="text-xl font-semibold text-(--text) mb-4">
              {ele.title}
            </h3>

            <p className="text-(--text)/70 leading-relaxed">
              {ele.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
