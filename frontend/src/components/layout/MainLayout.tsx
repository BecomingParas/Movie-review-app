import React from "react";
import { Navigation } from "../movie/Navigation";
import Footer from "../common/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};
