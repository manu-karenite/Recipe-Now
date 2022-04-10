import React from "react";
import styles from "./Header.module.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const onOpenModal = () =>
    dispatch({
      type: "LOGIN",
      payload: true,
    });
  const onCloseModal = () =>
    dispatch({
      type: "LOGIN",
      payload: false,
    });

  const [quote, setQuote] = React.useState(null);
  const [ip, setIp] = React.useState(null);
  const { login } = useSelector((state) => ({ ...state }));
  const getData = async () => {
    const result = await axios({
      method: "GET",
      url: "https://api.quotable.io/random",
    });
    const result1 = await axios({
      method: "GET",
      url: "https://api.ipify.org/",
    });
    setIp(result1.data);
    console.log(result.data.content);
    setQuote(result?.data?.content);
  };
  React.useEffect(() => {
    getData();
  }, [login]);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    pass: "",
    confirmpass: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!data.name) {
      toast.warning("Please Enter your Name to Login!");
      return;
    }
    if (!data.email) {
      toast.warning("Please Enter your Email Address to Login!");
      return;
    }
    if (!data.pass) {
      toast.warning("Please Enter your Password to Login!");
      return;
    }
    if (!data.confirmpass) {
      toast.warning("Please Confirm your Password to Login!");
      return;
    }
    if (data.confirmpass !== data.pass) {
      toast.warning("Passwords don't Match! Please Check And Retry!");
      return;
    }

    //get more data.......
    const gender = await axios({
      method: "GET",
      url: `https://api.genderize.io/?name=${data.name}`,
    });

    const age = await axios({
      method: "GET",
      url: `https://api.agify.io/?name=${data.name}`,
    });

    const nationality = await axios({
      method: "GET",
      url: `https://api.nationalize.io/?name=${data.name}`,
    });
    //creating an object for LS...
    const object = {
      ...data,
      age: age.data?.age
        ? age.data?.age
        : Math.floor(Math.random() * (90 - 18)) + 18,
      gender: gender?.data?.gender ? gender?.data?.gender : "Male",
      nationality:
        nationality.data?.country?.length > 0
          ? nationality.data?.country[0]?.country_id
          : "IN",
    };
    console.log(object);
    if (window !== "undefined") {
      window.localStorage.setItem("ATPL", JSON.stringify(object));
    }
    toast.success("Login Succesfull!");
    setData({ name: "", email: "", pass: "", confirmpass: "" });

    dispatch({
      type: "LOGIN",
      payload: false,
    });
    dispatch({
      type: "USER",
      payload: object,
    });
    navigate("/");
  };

  return (
    <>
      <div className={styles.outer}>
        <Link to="/">
          <div className={styles.left}>
            <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1649600560/Good-food-logo-design-on-transparent-background-PNG_jioddr.png"
              alt="Logo"
            />
          </div>
        </Link>
        <div className={styles.right}>
          {user && (
            <Link to="/my-profile">
              <div className={styles.name}>{user?.name[0]}</div>
            </Link>
          )}
          {!user && (
            <button onClick={onOpenModal} className={styles.loginbtn}>
              Login
            </button>
          )}
          {user && (
            <button
              onClick={(e) => {
                window.localStorage.removeItem("ATPL");
                dispatch({
                  type: "USER",
                  payload: null,
                });
                toast.success("Logout Succesfull");
              }}
              className={styles.loginbtn}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <div>
        <Modal
          open={login}
          onClose={onCloseModal}
          center
          style={{ width: "80% !important" }}
        >
          <h2 style={{ textAlign: "center" }}>Welcome Back</h2>
          <h3 style={{ textAlign: "center" }}>{quote}</h3>
          <form onSubmit={submitHandler}>
            <div>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Your Name"
              />
            </div>
            <div>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Your Email Address"
              />
            </div>
            <div>
              <input
                type="password"
                value={data.pass}
                onChange={(e) => setData({ ...data, pass: e.target.value })}
                placeholder="Your Password"
              />
            </div>
            <div>
              <input
                type="password"
                value={data.confirmpass}
                onChange={(e) =>
                  setData({ ...data, confirmpass: e.target.value })
                }
                placeholder="Confirm Password"
              />
            </div>
            <center>
              {" "}
              <input type="submit" value="Login" className={styles.fire} />
            </center>
          </form>
          <div>{ip}</div>
        </Modal>
      </div>
    </>
  );
};

export default Header;
