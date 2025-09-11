// B. 自定义 Hook 实现
import { useState, useEffect } from "react";

// 模拟的API调用 (与上面相同)
const fetchUserData = (userId: string) => {
  console.log(`Fetching data for user: ${userId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User ${userId}`, email: `user${userId}@example.com` });
    }, 1000);
  });
};

/**
 * useUserData 是一个自定义 Hook
 * @param {string} userId - 要获取数据的用户ID
 * @returns {{user: object | null, isLoading: boolean}} - 包含用户数据和加载状态的对象
 */
export function useUserData(userId: string) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 防止在 userId 为空时发起请求
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchUserData(userId)
      .then((data: any) => {
        setUser(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  // Hook 返回状态和任何需要的函数，而不是一个组件
  return { user, isLoading };
}

// --- 使用 Hook ---
// 组件直接使用 Hook 来获取状态
export function UserProfile({ userId, extraProp }: any) {
  // 直接、清晰地在组件内部调用 Hook
  const { user, isLoading }: any = useUserData(userId);

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Extra Prop: {extraProp}</p>
    </div>
  );
}

// 在应用中渲染，数据来源非常清晰
// <UserProfile userId="123" extraProp="some value" />
