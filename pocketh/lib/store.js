"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const userData = (set) => ({
  name: null,
  isLogged: false,
  smartContract: null,
  data: null,
  setSmartContract: (value) => set((state) => ({ smartContract: value })),
  logOut: () => {
    set((state) => {
      return {
        smartContract: null,
        isLogged: false,
      };
    });
  },
});

export const useUserData = create(persist(userData, { name: "_data" }));

// Do this to get the data

// const id = useUser((state) => state.id);
// const seatedCol = useUser((state) => state.seatedCol);
// const seatedRow = useUser((state) => state.seatedRow);
// const batch = useUser((state) => state.batchNumber);
