import React, { useImperativeHandle, useRef, useState } from "react";

interface ChildrenRef {
  name: string;
  count: number;
  setCount: (count: number) => void;
  subCount: () => void;
}

// react 19 以后 ref合并到props中
const Children = (props: { ref: React.Ref<ChildrenRef> }) => {
  const [count, setCount] = useState(0);

  useImperativeHandle(props.ref, () => {
    return {
      name: "张三",
      count,
      setCount,
      subCount: () => {
        setCount(count - 1);
      },
    };
  });

  return (
    <div>
      <h4>子组件</h4>
      <h4>子组件count: {count}</h4>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
};

function ImperativeHandle19() {
  const childrenRef = useRef<ChildrenRef>(null);

  const getChildrenInfo = () => {
    console.log(childrenRef.current);
  };

  return (
    <div>
      <h3>父组件</h3>
      <button onClick={getChildrenInfo}>获取子组件信息</button>
      <button onClick={() => childrenRef.current?.setCount(100)}>设置子组件count</button>
      <button onClick={() => childrenRef.current?.subCount()}>减少子组件count</button>
      <Children ref={childrenRef} />
    </div>
  );
}

export default ImperativeHandle19;
