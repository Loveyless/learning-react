import { useEffect, useState } from "react";

function Children() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Children init");
    return () => {
      console.log("Children destroy");
    };
    // 没有第二个参数,则每次重新渲染组件都会执行
  });
  return <div onClick={() => setCount(count + 1)}>Children{count}</div>;
}

function Children2222() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Children2222 init");
    return () => {
      console.log("Children2222 destroy");
    };
    // 第二个参数为空数组,则只会在组件第一次渲染时执行，后续重新渲染不会执行，相当于componentDidMount
  }, []);
  return <div onClick={() => setCount(count + 1)}>Children2222{count}</div>;
}

function Effect() {
  const [isShowChildren, setIsShowChildren] = useState(false);
  return (
    <>
      <div>UseEffect</div>
      <button onClick={() => setIsShowChildren(!isShowChildren)}>Toggle Children</button>
      {isShowChildren && <Children />}
      {isShowChildren && <Children2222 />}
    </>
  );
}

export default Effect;
