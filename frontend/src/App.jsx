import { Outlet } from "react-router-dom";
import Header from "./components/Header";
const App = () => {
  return (
    <>
      <Header />
      <main
        className=" pt-16
       min-h-[calc(100vh-120px)] bg-white"
      >
        <Outlet />
      </main>
    </>
  );
};

export default App;
