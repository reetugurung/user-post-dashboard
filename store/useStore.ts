import { create } from 'zustand';
export interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface DashboardState {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useStore = create<DashboardState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));