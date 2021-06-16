import create from "zustand";

const LoginContext = create((set) => ({
  loginPage: true,
  showLogin: () => set({ loginPage: true }),
  hideLogin: () => set({ loginPage: false }),
}));

export default LoginContext;
