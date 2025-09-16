import styled from "styled-components";

const MyH1 = styled.h1`
  color: rgb(255, 184, 184);
  font-size: 12px;
  font-weight: bold;
`;

const MyBasicButton = styled.button<{
  color?: string;
}>`
  color: ${(props) => props.color};
  ${(props) => props.color ?? "background-color: orange;"}
  font-weight: bold;
`;

const MyErrorButton = styled(MyBasicButton)`
  color: red;
  background-color: black;
`;

const Input = styled.input.attrs({
  type: "number",
  defaultValue: 0,
})`
  color: gray;
  font-weight: bold;
  border-radius: 10px;
`;

const InputWithButton = styled.input.attrs<{ defaultValue: number }>((props) => ({
  type: "number",
  defaultValue: props.defaultValue,
}))`
  color: gray;
  font-weight: bold;
  border-radius: 10px;
`;

const CssInJs = () => {
  return (
    <div className="flex flex-col gap-1">
      <MyH1>CssInJs</MyH1>
      <MyBasicButton color="yellow">CssInJs</MyBasicButton>
      <MyBasicButton>CssInJs</MyBasicButton>
      <MyErrorButton>Error</MyErrorButton>
      <Input />
      <InputWithButton defaultValue={10} />
    </div>
  );
};

export default CssInJs;
