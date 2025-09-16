import { useEffect, useState } from "react";

const ArraySet = () => {
  let length = 1000 * 10000;
  const array = Array.from({ length }, () => Math.floor(Math.random() * 10000000));
  const [set, setSet] = useState<Set<number> | null>(null);

  const [Loading, setLoading] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  useEffect(() => {
    const worker = new Worker(new URL("./worker.ts", import.meta.url));
    setStartTime(performance.now());
    worker.postMessage(array);
    worker.onmessage = (event) => {
      setSet(event.data);
    };
    setEndTime(performance.now());
    setLoading(false);
    console.log(`去重时间: ${endTime - startTime}ms`);
  }, []);

  return (
    <>
      <div>array size:{array.length}</div>
      {Loading && <div>Loading...</div>}
      {!Loading && <div>set size:{set?.size}</div>}
      <div>去重时间: {endTime - startTime}ms</div>
    </>
  );
};

export default ArraySet;
