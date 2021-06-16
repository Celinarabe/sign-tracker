import create from "zustand";

const AlbumContext = create((set) => ({
  selectedAlbum: "",
  setAlbum: (newAlbum) => set((state) => ({ selectedAlbum: newAlbum })),
  updateAlbum: (update) => set((state) => ({ selectedAlbum: {...state.selectedAlbum, title: update.title}})),
  removeAlbum: () => set({ selectedAlbum: "" }),
}));

export default AlbumContext;
