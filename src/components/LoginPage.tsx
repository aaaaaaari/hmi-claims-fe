import { useState } from "react";

export default function LoginPage() {
  const [userType, setUserType] = useState("staff");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <img
            src="/logo.jpg"
            alt="HMI Medical Logo"
            width="100"
            height="100"
            className="object-contain mx-auto -mt-10"
          />
          <h1 className="text-3xl font-bold tracking-tight text-[#0047AB]">
            Medical Claim Platform
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to access your account
          </p>
        </div>

        <div className="card border-none shadow-lg rounded-xl overflow-hidden mt-5">
          <div className="card-content px-6 mb-10">
            <form className="mt-10">
              {userType === "staff" ? (
                <div className="tabs w-full">
                  <div className="flex justify-center mb-8">
                    <div className="relative grid w-full max-w-[280px] grid-cols-2 bg-transparent h-11">
                      <div className="absolute inset-0 z-0 bg-gray-100 rounded-md"></div>
                      <div className="tab-indicator absolute z-10 h-full w-1/2 bg-[#0047AB] rounded-md transition-transform duration-300 ease-out"></div>
                      <button
                        type="button"
                        className="tab-trigger relative z-20 flex items-center justify-center h-full rounded-md text-sm font-medium text-white"
                        onClick={() => setUserType("staff")}
                      >
                        Staff
                      </button>
                      <button
                        type="button"
                        className="tab-trigger relative z-20 flex items-center justify-center h-full rounded-md text-sm font-medium text-gray-600"
                        onClick={() => setUserType("admin")}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="tabs w-full">
                  <div className="flex justify-center mb-8">
                    <div className="relative grid w-full max-w-[280px] grid-cols-2 bg-transparent h-11">
                      <div className="absolute inset-0 z-0 bg-gray-100 rounded-md"></div>
                      <div className="tab-indicator absolute z-10 h-full w-1/2 bg-[#0047AB] rounded-md transition-transform duration-300 ease-out"></div>
                      <button
                        type="button"
                        className="tab-trigger relative z-20 flex items-center justify-center h-full rounded-md text-sm font-medium text-gray-600"
                        onClick={() => setUserType("staff")}
                      >
                        Staff
                      </button>
                      <button
                        type="button"
                        className="tab-trigger relative z-20 flex items-center justify-center h-full rounded-md text-sm font-medium text-gray-600"
                        onClick={() => setUserType("admin")}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {userType === "staff" ? (
                <div id="staff-tab" className="tab-content space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="staff-email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                        @
                      </span>
                      <input
                        id="staff-email"
                        type="email"
                        placeholder="name@company.com"
                        className="pl-10 h-12 rounded-lg border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="staff-password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                        *
                      </span>
                      <input
                        id="staff-password"
                        type="password"
                        className="pl-10 h-12 rounded-lg border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div id="admin-tab" className="tab-content space-y-5 hidden">
                  <div className="space-y-2">
                    <label
                      htmlFor="admin-email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                        @
                      </span>
                      <input
                        id="admin-email"
                        type="email"
                        placeholder="admin@company.com"
                        className="pl-10 h-12 rounded-lg border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="admin-password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <a
                        href="/forgot-password"
                        className="text-xs text-[#0047AB] hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-3 h-4 w-4 text-gray-400">
                        *
                      </span>
                      <input
                        id="admin-password"
                        type="password"
                        className="pl-10 h-12 rounded-lg border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="card-footer flex flex-col space-y-5 pt-2 px-0 pb-0">
                <button
                  type="submit"
                  className="w-full bg-[#0047AB] hover:bg-[#003087] text-white rounded-lg h-12 font-medium transition-all duration-200 shadow-sm hover:shadow"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          <p>© 2025 Insurance Claims Platform. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
