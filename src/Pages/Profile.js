import React from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();

  const [allow, setAllow] = React.useState(true);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

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

  return (
    <section className="section about-section gray-bg" id="about">
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-lg-6">
            <div className="about-text go-to">
              <h3 className="dark-color">{user?.name}</h3>

              <div className="row about-list">
                <div className="col-md-7">
                  <div className="media">
                    <label>Age</label>
                    <p>{user?.age} Yr</p>
                  </div>
                  <div className="media">
                    <label>Country</label>
                    <p>{user?.nationality}</p>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="media">
                    <label>E-mail</label>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="media">
                    <label>Gender</label>
                    <p>{user?.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-avatar">
              <img
                src={
                  user?.gender === "female"
                    ? "https://www.bootdey.com/img/Content/avatar/avatar8.png"
                    : "https://www.bootdey.com/img/Content/avatar/avatar7.png"
                }
                alt="Poster"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
