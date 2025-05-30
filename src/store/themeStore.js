import {create} from 'zustand';

const useThemeStore = create(set => ({
  theme: 'light',
  userId: null,
  setTheme: newTheme => set({theme: newTheme}),
  setUserId: uid => set({userId: uid}),
}));

export default useThemeStore;
