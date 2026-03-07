import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { SignIn } = useContext(UserContext);
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formInputs;
    if (!email.trim() || !password.trim()) {
      setError("pelas Enter All Field !");
      return;
    }
    if (password.trim().length < 6) {
      return setError("The Password Must Be At Least 6 caracteres");
    }

    try {
      setLoading(true);

      const { error, data } = await SignIn(email, password);
      
      if (error) {
        setError(error.message);
        return;
      }

      if (data) {
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-(--bg) min-h-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center px-6 py-20 relative">
        <div className="absolute w-125 h-125 bg-(--primary) opacity-10 blur-[120px] rounded-full"></div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-md bg-(--card) border border-(--text)/10 rounded-3xl shadow-2xl p-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-(--text)">Welcome back</h2>
            <p className="text-(--text)/60 mt-3">
              Enter your details to access your dashboard
            </p>
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

          <div className="mb-8">
            <label className="block text-sm font-medium text-(--text) mb-2">
              Password
            </label>

            <div className="flex items-center bg-(--bg) border border-(--text)/20 rounded-xl px-4 py-3 focus-within:border-(--primary) transition">
              <RiLockPasswordFill className="text-(--text)/50 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="*********"
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
              <div className="bg-red-300 text-red-700 border border-red-700 text-center py-2 px-5 rounded-2xl mb-3">
                {error}
              </div>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-(--primary) hover:opacity-90 transition py-3 rounded-xl text-white font-medium shadow-lg"
          >
            {loading ? "SignIn .." : "Sign In TaskFlow →"}
          </button>

          <p className="text-center text-sm text-(--text)/60 mt-6">
            Don't have an account?{" "}
            <a href="/Register" className="text-(--primary) hover:underline">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
