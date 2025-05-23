'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/lib/firebase';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">載入中...</p>
      </div>
    );
  }

  if (!user) {
    return null; // useEffect 會處理重定向
  }

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">儀表板</h1>
          <Button onClick={handleLogout} variant="outline">
            登出
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">用戶資訊</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">電子郵件:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">UID:</span> {user.uid}
            </p>
            <p>
              <span className="font-medium">電子郵件已驗證:</span>{' '}
              {user.emailVerified ? '是' : '否'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
