import HeaderTop from "../HeaderTop";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Pricing() {
  const info = [
    {
      id: 1,
      title: "Starter",
      price: "$0",
      time: "/month",
      des: "Perfect for individuals",
      button: "Get Started",
      detaille: ["3 Projects", "Basic Kanban", "Up to 5 members"],
    },
    {
      id: 2,
      title: "Pro",
      price: "$12",
      time: "/user/month",
      des: "Best for growing teams",
      button: "Start Free Trial",
      detaille: [
        "Unlimited Projects",
        "Advanced Analytics",
        "Custom Fields",
        "Priority Support",
      ],
      featured: true,
    },
    {
      id: 3,
      title: "Enterprise",
      price: "$49",
      time: "/user/month",
      des: "For large organizations",
      button: "Contact Sales",
      detaille: [
        "SAML SSO & Security",
        "Dedicated Manager",
        "Custom Integrations",
        "Unlimited Storage",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="bg-(--bg) py-28 px-6 relative overflow-hidden"
    >
      {/* subtle glow */}
      <div className="absolute w-125 h-125 bg-(--primary) opacity-10 blur-[120px] rounded-full bottom-10 left-1/2 -translate-x-1/2"></div>

      <HeaderTop
        title="Choose the plan that's right for you"
        description="Transparent pricing for teams of all sizes"
      />

      <div className="mt-20 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
        {info.map((ele) => (
          <div
            key={ele.id}
            className={`relative p-8 rounded-3xl border transition-all duration-300
              ${
                ele.featured
                  ? "bg-(--card) border-(--primary) shadow-2xl scale-105"
                  : "bg-(--card) border-(--text)/10 hover:-translate-y-2 hover:shadow-xl"
              }`}
          >
            {ele.featured && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-(--primary) text-white text-xs px-4 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <h3 className="text-2xl font-semibold text-(--text)">
              {ele.title}
            </h3>

            <p className="mt-2 text-(--text)/60">{ele.des}</p>

            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-bold text-(--text)">
                {ele.price}
              </span>
              <span className="text-(--text)/60 text-sm">
                {ele.time}
              </span>
            </div>

            <button
              className={`mt-8 w-full py-3 rounded-xl font-medium transition
                ${
                  ele.featured
                    ? "bg-(--primary) text-white hover:opacity-90"
                    : "border border-(--text)/20 hover:border-(--primary)"
                }`}
            >
              {ele.button}
            </button>

            <ul className="mt-8 space-y-4">
              {ele.detaille.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-(--text)/80"
                >
                  <FaRegCheckCircle className="text-(--primary)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}