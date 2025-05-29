import { useState } from "react";
import LoginPage from "./components/LoginPage";
import UploadPage from "./components/UploadPage";
import Layout from "./components/Layout";

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
          <UploadPage />
        </Layout>
      )}
    </>
  );
}

export default App;
