import type { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

// 直接在参数位置解构出 children
function Wrapper({ children }: WrapperProps) {
  return <div className="m-4 border-orange-300 border-1 shadow-xl rounded-md">{children}</div>;
}

export default Wrapper;
