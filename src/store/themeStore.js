import {create} from 'zustand';

const useThemeStore = create(set => ({
  theme: 'light',
  userId: null,
  userData:[],
  setTheme: newTheme => set({theme: newTheme}),
  setUserId: uid => set({userId: uid}),
  setUserData:(data)=>set({userData:data})
}));

export default useThemeStore;
