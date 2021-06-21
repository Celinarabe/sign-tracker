import create from "zustand";

const SelectedPhotoContext = create((set) => ({
  selectedPhoto: "",
  setSelectedPhoto: (newPhoto) => set((state) => ({ selectedPhoto: newPhoto })),
}));

export default SelectedPhotoContext;