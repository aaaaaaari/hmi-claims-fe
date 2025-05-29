import { useState } from "react";
import LoginPage from "./components/LoginPage";

function App() {
  const [user, setUser] = useState("");

  return <>{user === "" ? <LoginPage /> : <div>App</div>}</>;
}

export default App;
