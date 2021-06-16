import create from "zustand";

const PhotoContext = create((set) => ({
  photoList: [],
  addPhotos: (newPhotos) => set((state) => ({ photoList: newPhotos })),
  removePhotos: () => set({ photoList: [] }),
}));

export default PhotoContext;