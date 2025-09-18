import { NavLink, useParams } from "react-router";

const About = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>About id: {id}</h1>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default About;
