import { useContext } from "react";
import { Link } from "react-router";
import { Window } from "~/Context/windowWidth";

export default function NavBar() {
  const { width } = useContext<any>(Window) || null;

  const styleFont = {
    fontSize: width > 414 ? "1rem" : ".8rem",
    fontWeight: "600",
  };

  return (
    <nav
      className="nav flex justify-between align-middle mx-auto py-2 px-5"
      style={{
        backgroundColor: "white",
        borderRadius: "20px",
        width: width > 905 ? "50%" : width > 560 ? "80%" : "100%",
      }}>
      <Link to="/" style={{ marginTop: "5px", ...styleFont }}>
        RESUMIND
      </Link>
      <button
        className="bg-blue-500 p-1 cursor-pointer"
        style={{
          color: "white",
          borderRadius: "10px",
          outline: "none",
          ...styleFont,
        }}>
        <span>Upload Resume</span>
      </button>
    </nav>
  );
}
