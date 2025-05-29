import { useState } from "react";

interface Props {
  onLogIn: (email: string, password: string) => void;
}

export default function LoginPage({ onLogIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <img
            src="/logo.jpg"
            alt="HMI Medical Logo"
            width="100"
            height="100"
            className="object-contain mx-auto -mt-20"
          />
          <h1 className="text-3xl font-bold tracking-tight text-[#0047AB]">
            Medical Claim Platform
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to access your account
          </p>
        </div>

        <div className="card border-none shadow-lg rounded-xl overflow-hidden mt-5">
          <div className="card-content px-3 my-3">
            <div id="staff-tab" className="tab-content space-y-5 mb-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    className="pl-5 h-12 w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                    required
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="staff-password"
                    className="text-sm font-medium text-gray-700 mb-2 block"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    className="pl-5 h-12 w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="card-footer flex flex-col space-y-5 pt-2 px-0 pb-0">
              <button
                type="submit"
                className="w-full bg-[#0047AB] hover:bg-[#003087] text-white rounded-lg h-12 font-medium transition-all duration-200 shadow-sm hover:shadow"
                onClick={() => onLogIn(email, password)}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 mt-5">
          <p>© 2025 Insurance Claims Platform. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
