export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-(--bg)">
      {/* Gradient Glow */}
      <div className="absolute w-150 h-150 bg-(--primary) opacity-20 blur-[120px] rounded-full -top-40"></div>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight text-(--text)">
        Simplify your <span className="text-(--primary)">workflow</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-(--text)/70 max-w-2xl">
        The all-in-one task management platform to manage projects, collaborate
        with teams, and hit your goals faster with intuitive Kanban boards.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="bg-(--primary) hover:scale-105 transition px-6 py-3 rounded-xl text-white font-medium shadow-lg">
          Get Started Free
        </button>

        <button className="border border-(--text)/20 hover:border-(--primary) transition px-6 py-3 rounded-xl font-medium">
          Learn More
        </button>
      </div>
    </section>
  );
}
