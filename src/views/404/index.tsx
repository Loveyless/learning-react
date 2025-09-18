import { NavLink } from "react-router";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <NavLink to="/">back to home</NavLink>
    </div>
  );
};

export default NotFound;
