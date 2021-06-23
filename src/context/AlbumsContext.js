import create from "zustand";

const AlbumsContext = create((set) => ({
  albumList: [],
  setAlbumList: (newAlbums) => set((state) => ({ albumList: newAlbums })),
  removeAlbums: () => set({ albumList:[] }),
}));

export default AlbumsContext;