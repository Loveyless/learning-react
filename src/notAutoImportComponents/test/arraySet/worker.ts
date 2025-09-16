
onmessage = (event) => {
  const array = event.data;
  const set = new Set(array);
  postMessage(set);
};