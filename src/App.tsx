import { Route, Routes, useNavigate } from "react-router";

import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#212121] text-white min-h-screen">
      <h1 className="text-2xl font-bold font-mono italic p-4 cursor-pointer" onClick={() => navigate("/")}>BudgetBuddy</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
