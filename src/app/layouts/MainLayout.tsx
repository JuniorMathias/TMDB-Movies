import { Outlet } from "react-router-dom";
import Header from "@/shared/components/Header/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
