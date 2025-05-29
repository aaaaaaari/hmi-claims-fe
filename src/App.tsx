import LoginPage from "./components/LoginPage";

function App() {
  const user = "";
  return <>{user === "" ? <LoginPage /> : <div>App</div>}</>;
}

export default App;
