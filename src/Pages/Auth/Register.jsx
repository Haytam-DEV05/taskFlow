import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const { SignUp } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formInputs, setFormInputs] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = formInputs;
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return setError("pleas Fill All Field !");
    }
    if (password.trim().length < 6) {
      return setError("password must be at least 6 caracterse");
    }
    try {
      setLoading(true);

      const { data, error } = await SignUp(email, password, {
        fullName: fullName,
      });

      if (error) {
        setError(error.message);
        return;
      }
      if (data) {
        console.log(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-(--bg) min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center px-6 py-20 relative">
        <div className="absolute w-125 h-125 bg-(--primary) opacity-10 blur-[120px] rounded-full"></div>

        <form
          className="relative z-10 w-full max-w-md bg-(--card) border border-(--text)/10 rounded-3xl shadow-2xl p-10"
          onSubmit={handleSubmit}
        >
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
                onChange={(e) =>
                  setFormInputs({ ...formInputs, fullName: e.target.value })
                }
                value={formInputs.fullName}
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
                onChange={(e) =>
                  setFormInputs({ ...formInputs, email: e.target.value })
                }
                value={formInputs.email}
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
                placeholder="********"
                className="bg-transparent outline-none w-full text-(--text)"
                onChange={(e) =>
                  setFormInputs({ ...formInputs, password: e.target.value })
                }
                value={formInputs.password}
              />
            </div>
          </div>

          <div className="error">
            {error && (
              <div className="text-center mb-5 w-full bg-red-300 text-red-600 py-2 px-6 border border-red-600 rounded-md">
                {error}
              </div>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-(--primary) hover:opacity-90 transition py-3 rounded-xl text-white font-medium shadow-lg"
          >
            {loading ? "Creating Account ..." : "Create Account →"}
          </button>

          <p className="text-center text-sm text-(--text)/60 mt-6">
            Already have an account?{" "}
            <a href="/Login" className="text-(--primary) hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
