import {create} from 'zustand';

const useThemeStore = create(set => ({
  theme: 'light',
  setTheme: newTheme => set({theme: newTheme}),
}));

export default useThemeStore;
