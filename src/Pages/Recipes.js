import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Pagination } from "antd";
import styles from "./Recipes.module.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const Recipes = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const handleProtection = () => {
    if (window?.localStorage?.getItem("ATPL")) {
      return;
    } else {
      navigate("/");
    }
  };
  React.useEffect(() => {
    handleProtection();
  }, [user]);

  const [data, setData] = React.useState([]);
  const getData = async () => {
    const result = await axios({
      method: "GET",
      url: `https://forkify-api.herokuapp.com/api/search?q=${params?.searchParams}`,
    });
    setData(result.data);
  };
  React.useEffect(() => {
    getData();
  }, []);
  const [page, setPage] = React.useState(1);
  const params = useParams();

  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, [page]);
  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [rid, setRid] = React.useState("");
  const [haveItData, setHaveItData] = React.useState(null);
  const haveIt = async () => {
    const res = await axios({
      method: "GET",
      url: `https://forkify-api.herokuapp.com/api/get?rId=${rid}`,
    });
    setHaveItData(res?.data?.recipe?.ingredients);
  };
  React.useEffect(() => {
    rid && haveIt();
  }, [rid]);
  return (
    <>
      <Modal open={open} onClose={onCloseModal} center width={"80%"}>
        <h2>Recipe #{rid}</h2>

        <div className={styles.modalList}>
          {haveItData?.length > 0 &&
            haveItData.map((Curr, index) => {
              return (
                <div key={index} className={styles.list}>
                  🍕 {Curr}
                </div>
              );
            })}
        </div>
      </Modal>
      <div className={styles.row}>
        {" "}
        {data?.recipes?.length > 0 &&
          data?.recipes
            ?.slice((page - 1) * 12, page * 12)
            .map((curr, index) => {
              return (
                <div
                  key={index}
                  className={styles.recipe}
                  onClick={(e) => {
                    setRid(curr?.recipe_id);
                    onOpenModal();
                  }}
                >
                  <div>
                    <img
                      src={curr?.image_url}
                      alt="Recipe"
                      className={styles.recipeImage}
                    />
                  </div>
                  <div className={styles.recipeText}>
                    Food Item : {curr?.title}
                  </div>
                  <div className={styles.recipeText}>
                    Recipe Id : {curr?.recipe_id}
                  </div>
                  <div className={styles.recipeText}>
                    {" "}
                    Source : {curr?.publisher}
                  </div>
                  <div className={styles.recipeText}>
                    {
                      <a
                        href={curr?.source_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Food Source
                      </a>
                    }
                  </div>
                  <center>
                    <button>Get Recipe</button>
                  </center>
                </div>
              );
            })}
      </div>
      {data?.length !== 0 && (
        <center>
          <Pagination
            current={page}
            pageSize={12}
            total={data?.count}
            onChange={(a, b) => setPage(a)}
          />
        </center>
      )}
      {data?.length === 0 && <div className={styles.no}>No Recipes Found</div>}
    </>
  );
};

export default Recipes;
