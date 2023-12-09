import { create } from "zustand";
import { persist } from "zustand/middleware";

const data = (set) => ({
  name: null,
  isLogged: false,
  contractAddress: null,
  data: null,
  updateSearchedUser: (user) => {
    set((state) => {
      return {
        searchedUser: user,
      };
    });
  },
});

export const useData = create(persist(data, { name: "_data" }));

// Do this to get the data

// const id = useUser((state) => state.id);
// const seatedCol = useUser((state) => state.seatedCol);
// const seatedRow = useUser((state) => state.seatedRow);
// const batch = useUser((state) => state.batchNumber);
