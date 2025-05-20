'use client';

import { Button } from '@/components/ui/button';
import useCountStore from '@/store/useCountStore';

export default function Counter() {
  // 從 store 獲取狀態和函數
  const { count, increment, decrement, reset } = useCountStore();

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
      <h2 className="text-2xl font-bold">計數器範例</h2>
      <div className="text-4xl font-bold">{count}</div>
      <div className="flex gap-2">
        <Button onClick={decrement}>-</Button>
        <Button onClick={increment}>+</Button>
        <Button variant="outline" onClick={reset}>
          重置
        </Button>
      </div>
    </div>
  );
}
