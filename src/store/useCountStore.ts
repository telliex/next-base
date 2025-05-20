import { create } from 'zustand';

// 定義 store 的狀態類型
interface CountState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// 創建 store
const useCountStore = create<CountState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCountStore;
