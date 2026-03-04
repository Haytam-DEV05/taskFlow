import Navbar from "../../Components/Templates/Navbar";
import Footer from "../../Components/Templates/Footer";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";

export default function Register() {
  return (
    <div className="bg-(--bg) min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 py-20 relative">
        <div className="absolute w-125 h-125 bg-(--primary) opacity-10 blur-[120px] rounded-full"></div>

        <form className="relative z-10 w-full max-w-md bg-(--card) border border-(--text)/10 rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-(--text)">Create Account</h2>
            <p className="text-(--text)/60 mt-3">
              Join us and start managing your projects
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-(--text) mb-2">
              Full Name
            </label>

            <div className="flex items-center bg-(--bg) border border-(--text)/20 rounded-xl px-4 py-3 focus-within:border-(--primary) transition">
              <FaUserAlt className="text-(--text)/50 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                className="bg-transparent outline-none w-full text-(--text)"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-(--text) mb-2">
              Email address
            </label>

            <div className="flex items-center bg-(--bg) border border-(--text)/20 rounded-xl px-4 py-3 focus-within:border-(--primary) transition">
              <MdOutlineMailLock className="text-(--text)/50 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="bg-transparent outline-none w-full text-(--text)"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-(--text) mb-2">
              Password
            </label>

            <div className="flex items-center bg-(--bg) border border-(--text)/20 rounded-xl px-4 py-3 focus-within:border-(--primary) transition">
              <RiLockPasswordFill className="text-(--text)/50 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-transparent outline-none w-full text-(--text)"
              />
            </div>
          </div>

          <button className="w-full bg-(--primary) hover:opacity-90 transition py-3 rounded-xl text-white font-medium shadow-lg">
            Create Account →
          </button>

          <p className="text-center text-sm text-(--text)/60 mt-6">
            Already have an account?{" "}
            <a href="/Login" className="text-(--primary) hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
