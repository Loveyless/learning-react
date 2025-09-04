import { useReducer } from "react";

function Reducer() {
  // default value
  const initialState = {
    count: -8,
  };

  // init function
  // only called once
  const initFn = (state: typeof initialState) => {
    state.count = Math.random();
    // console.log("initFn state :", state);
    return state;
  };

  // when dispatch action
  const reducerHandle = (state: any, action: any) => {
    switch (action.type) {
      case "add":
        return { count: state.count + 1 };
      case "sub":
        return { count: state.count - 1 };
      default:
        return state;
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducerHandle, initialState, initFn);

  return (
    <>
      <div className="flex flex-col border-red-300 border-1">
        <button>reducer:{state.count}</button>
        <button onClick={() => dispatch({ type: "add" })}>dispatch add</button>
        <button onClick={() => dispatch({ type: "sub" })}>dispatch sub</button>
      </div>
    </>
  );
}

export default Reducer;
