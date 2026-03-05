import { BiTask } from "react-icons/bi";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import HeaderTop from "../HeaderTop";

export default function Footer() {
  return (
    <footer className="bg-(--card) border-t border-(--text)/10 pt-20">
      {/* Top CTA Section */}
      <div className="max-w-6xl mx-auto px-6 text-center pb-10">
        <HeaderTop
          title="Ready to boost your productivity?"
          description="Join thousands of teams already managing their workflow smarter and faster."
        />

        <button className="mt-8 bg-(--primary) hover:opacity-90 transition px-8 py-4 rounded-2xl text-white font-medium shadow-lg">
          Get Started For Free
        </button>
      </div>

      {/* Main Footer Grid */}
      <div className="border-t border-(--text)/10">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 text-(--primary)">
              <BiTask size={28} />
              <span className="text-xl font-semibold text-(--text)">
                TaskFlow
              </span>
            </div>

            <p className="mt-4 text-(--text)/70">
              The modern task management platform designed to help teams plan,
              collaborate, and deliver exceptional results.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-6 text-(--text)/70">
              <FaTwitter className="hover:text-(--primary) cursor-pointer transition" />
              <FaGithub className="hover:text-(--primary) cursor-pointer transition" />
              <FaLinkedin className="hover:text-(--primary) cursor-pointer transition" />
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-(--text) font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-(--text)/70">
              <li className="hover:text-(--primary) cursor-pointer transition">
                Features
              </li>
              <li className="hover:text-(--primary) cursor-pointer transition">
                Pricing
              </li>
              <li className="hover:text-(--primary) cursor-pointer transition">
                Integrations
              </li>
              <li className="hover:text-(--primary) cursor-pointer transition">
                Updates
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-(--text) font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-(--text)/70">
              <li className="hover:text-(--primary) cursor-pointer transition">
                About
              </li>
              <li className="hover:text-(--primary) cursor-pointer transition">
                Blog
              </li>
              <li className="hover:text-(--primary) cursor-pointer transition">
                Careers
              </li>
              <li className="hover:text-(--primary) cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-(--text) font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-(--text)/70">
              <li className="hover:text-(--primary) cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-(--primary) cursor-pointer transition">
                Terms of Service
              </li>
              <li className="hover:text-(--primary) cursor-pointer transition">
                Security
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-(--text)/10 py-6 text-center text-sm text-(--text)/60">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </div>
    </footer>
  );
}
