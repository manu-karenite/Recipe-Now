import React from "react";
import axios from "axios";
import styles from "./Footer.module.css";
const Footer = () => {
  const [quote, setQuote] = React.useState(null);
  const getData = async () => {
    const result = await axios({
      method: "GET",
      url: "https://catfact.ninja/fact",
    });
    setQuote(result.data?.fact);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return <div className={styles.head}>{quote}</div>;
};

export default Footer;
