import create from "zustand";

const AlbumContext = create((set) => ({
  selectedAlbum: "",
  addAlbum: (newAlbum) => set((state) => ({ selectedAlbum: newAlbum })),
  removeAlbum: () => set({ selectedAlbum: "" }),
}));

export default AlbumContext;
