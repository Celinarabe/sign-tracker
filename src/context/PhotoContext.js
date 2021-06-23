import create from "zustand";

const PhotoContext = create((set) => ({
  photoList: [],
  selectedPhoto: "",
  addPhotos: (newPhotos) => set((state) => ({ photoList: newPhotos })),
  removePhotos: () => set({ photoList: [] }),
  hoverPhoto: (hoveredPhoto) => set((state) => ({selectedPhoto: hoveredPhoto})),
}));

export default PhotoContext;