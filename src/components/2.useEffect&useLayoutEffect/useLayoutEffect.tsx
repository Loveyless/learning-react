import { useLayoutEffect, useState } from "react";

function LayoutEffect() {
  const [count, setCount] = useState(0);
  // 不阻塞DOM;
  // useEffect(() => {
  //   for (let i = 0; i < 50000; i++) {
  //     // console.log(i);
  //     setCount((count) => count + 1);
  //   }
  // }, []);
  //阻塞DOM
  useLayoutEffect(() => {
    for (let i = 0; i < 1; i++) {
      // console.log(i);
      setCount((count) => count + 1);
    }
  }, []);

  return (
    <div>
      <div>app </div>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{index}</div>
      ))}
    </div>
  );
}

export default LayoutEffect;
