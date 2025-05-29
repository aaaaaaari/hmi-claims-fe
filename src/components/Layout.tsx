import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onLogOut: () => void;
}

export default function Layout({ children, onLogOut }: Props) {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "2rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src="/logo.jpg" width="50" alt="Logo" />
          <span
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#0047AB",
            }}
            className="mt-1 ml-1"
          >
            Medical Claim Platform
          </span>
        </div>

        <button
          type="submit"
          className="mr-5 px-4 py-2 bg-[#0047AB] hover:bg-[#003087] text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow"
          onClick={onLogOut}
        >
          Log out
        </button>
      </nav>

      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
}
