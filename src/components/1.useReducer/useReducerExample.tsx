import { useReducer } from "react";

function ReducerExample() {
  // default value
  const initData = [
    { name: "小满(只)", price: 100, count: 1, id: 1, isEdit: false },
    { name: "中满(只)", price: 200, count: 1, id: 2, isEdit: false },
    { name: "大满(只)", price: 300, count: 1, id: 3, isEdit: false },
  ];

  // when dispatch action
  const reducerHandle = (
    data: any,
    action: { type: "add" | "sub" | "addItem" | "delItem" | "editItem" | "update_name" | "updated"; id: number; name?: string },
  ) => {
    const index = data.findIndex((item: any) => item.id === action.id);
    // console.log(data[index]);
    switch (action.type) {
      case "add":
        data[index].count += 1;
        break;
      case "sub":
        data[index].count -= 1;
        break;
      case "delItem":
        data.splice(index, 1);
        break;
      case "addItem":
        data.splice(index + 1, 0, {
          name: "x满(只)",
          price: Math.round(Math.random() * 1000),
          count: 1,
          id: Math.random(),
          isEdit: false,
        });
        break;
      case "editItem":
        data[index].isEdit = true;
        break;
      case "update_name":
        data[index].name = action.name;
        break;
      case "updated":
        data[index].isEdit = false;
        break;
    }
    return [...data];
  };

  const [data, dispatch] = useReducer(reducerHandle, initData);

  return (
    <>
      <div className="flex flex-col border-red-300 border-1">
        <table width={800} border={1}>
          <thead>
            <tr>
              <th>name</th>
              <th>price</th>
              <th>count</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id}>
                <td>
                  {item.isEdit ? (
                    <input
                      className="border-red-300 border-1 rounded-[5px]"
                      type="text"
                      value={item.name}
                      onChange={(e) => dispatch({ type: "update_name", id: item.id, name: e.target.value })}
                      onBlur={() => dispatch({ type: "updated", id: item.id })}
                    />
                  ) : (
                    item.name
                  )}
                </td>

                <td>{item.price}</td>

                <td>
                  <button onClick={() => dispatch({ type: "sub", id: item.id })}>-</button>
                  {item.count}
                  <button onClick={() => dispatch({ type: "add", id: item.id })}>+</button>
                </td>

                <td>
                  <button onClick={() => dispatch({ type: "addItem", id: item.id })}>添加</button>
                  <button onClick={() => dispatch({ type: "editItem", id: item.id })}>修改</button>
                  <button onClick={() => dispatch({ type: "delItem", id: item.id })}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={3}></td>
              <td align="left">总价{data.reduce((prev, next) => prev + next.price * next.count, 0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default ReducerExample;
