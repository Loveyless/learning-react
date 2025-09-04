import { forwardRef, useRef } from "react";

const Children = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div>
      <h4 ref={ref}>子组件</h4>
    </div>
  );
});

function ForwardRef() {
  const childrenRef = useRef(null);

  // 这样只能暴露dom节点，无法暴露方法
  // 暴露方法需要使用useImperativeHandle
  const getChildrenInfo = () => {
    console.log(childrenRef.current);
  };

  return (
    <div>
      <h3>父组件</h3>
      <button onClick={getChildrenInfo}>获取子组件信息</button>
      <Children ref={childrenRef} />
    </div>
  );
}

export default ForwardRef;
