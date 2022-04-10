import React from "react";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [s, setS] = React.useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const searchHandler = () => {
    if (!user) {
      toast.warning("Please Login to Search");
      return;
    }
    navigate(`recipes/${s}`);
  };
  return (
    <div className={styles.home}>
      <div className={styles.inpt1}>
        <div>Search Your Recipe Here</div>
        <input
          type="text"
          value={s}
          onChange={(e) => setS(e.target.value)}
          className={styles.inpt}
          placeholder="Search By Keyword Here"
        />
        <button onClick={searchHandler} className={styles.btn}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Home;
