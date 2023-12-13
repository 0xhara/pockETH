import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState();

  return (
    <SidebarContext.Provider value={{ isOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
