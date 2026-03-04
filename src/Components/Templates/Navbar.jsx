import { BiTask } from "react-icons/bi";
import Theme from "./Theme";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-(--bg)/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-(--primary)">
            <BiTask size={26} />
          </span>
          <h1 className="text-xl font-bold tracking-tight text-(--text)">
            TaskFlow
          </h1>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-(--text)/80">
          <li className="hover:text-(--primary) transition">
            <a href="">Features</a>
          </li>
          <li className="hover:text-(--primary) transition">
            <a href="">Solutions</a>
          </li>
          <li className="hover:text-(--primary) transition">
            <a href="">Pricing</a>
          </li>
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="text-sm text-(--text) font-medium hover:text-(--primary) transition">
            Log In
          </button>

          <button className="bg-(--primary) hover:opacity-90 transition px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md">
            Get Started
          </button>

          <Theme />
        </div>
      </div>
    </nav>
  );
}
