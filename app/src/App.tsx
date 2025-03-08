// src/App.tsx
import React from "react";
import Dashboard from "./components/Dashboard";
import DarkModeToggle from "./components/DarkModeToggle";

const App: React.FC = () => {
  return (
    <div className="">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-5xl xs:text-8xl font-extrabold">
          ShreddBoard Helvetica
        </h1>
        <DarkModeToggle />
      </header>
      {/* Ensure the dashboard fits within the viewport */}
      <main className="p-4 flex" style={{ height: "calc(100vh - 4rem)" }}>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
