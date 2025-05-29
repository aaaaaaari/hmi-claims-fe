import { useState } from "react";
import LoginPage from "./components/LoginPage";
import UploadPage from "./components/UploadPage";
import Layout from "./components/Layout";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

function App() {
  const [user, setUser] = useState("");

  const login = (user: string, password: string) => {
    if (user === "testuser@gmail.com" && password === "123456") {
      setUser("Test User");
    }
  };

  return (
    <>
      {user === "" ? (
        <LoginPage onLogIn={login} />
      ) : (
        <Layout onLogOut={() => setUser("")}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <UploadPage />
          </Worker>
        </Layout>
      )}
    </>
  );
}

export default App;
