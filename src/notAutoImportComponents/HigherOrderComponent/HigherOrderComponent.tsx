// 核心解决方案 (Core Solution)
// 以下是一个经典的 HOC 场景：为组件注入用户数据。我们将展示 HOC 的实现，以及如何用一个自定义 Hook 来实现同样的功能，你会立刻看到两者的差异。

// 假设我们有一个 API fetchUserData(userId)，它返回一个 Promise，解析后得到用户信息。

// 场景：为组件提供当前用户信息
// A. HOC 实现

import { useState, useEffect } from "react";

// 模拟一个API调用
const fetchUserData = (userId: string) => {
  console.log(`Fetching data for user: ${userId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User ${userId}`, email: `user${userId}@example.com` });
    }, 1000);
  });
};

/**
 * withUserData 是一个高阶组件 (HOC)
 * @param {React.Component} WrappedComponent - 需要被注入 user 数据的组件
 * @param {string} userId - 要获取数据的用户ID
 * @returns {React.Component} - 一个注入了 user, isLoading 状态的新组件
 */
function withUserData(WrappedComponent: any, userId: string) {
  // HOC 返回一个新的组件
  return function WithUserDataComponent(props: any) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      fetchUserData(userId)
        .then((data: any) => {
          setUser(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [userId]); // 依赖 userId，当它变化时重新获取数据

    // 将获取的数据和加载状态作为 props 传递给被包装的组件
    // 同时必须透传所有原始的 props
    return <WrappedComponent {...props} user={user} isLoading={isLoading} />;
  };
}

// --- 使用 HOC ---
// 原始的展示组件
function UserProfile({ user, isLoading, extraProp }: any) {
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

// 使用 HOC 包装组件
export const UserProfileWithData = withUserData(UserProfile, "123");

// 在应用中渲染
// <UserProfileWithData extraProp="some value" />

export default UserProfileWithData;
