import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import classes from "./Popup.module.css";

const API_URL = process.env.REACT_APP_API_URL;
export default function Popup({ data, isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) {
    return;
  }

  function closePopup() {
    onClose();
  }

  function viewDetailHandle() {
    closePopup();
    navigate("/detail/" + data._id);
  }
  return createPortal(
    <div className="row justify-content-center">
      <div className={classes.popup + " col-7"}>
        <div className={classes.infor}>
          {data && (
            <img
              src={
                data?.img1?.startsWith("http")
                  ? data?.img1
                  : API_URL + data?.img1
              }
              alt={data.name}
            />
          )}
          <div className={classes.description}>
            <div className={classes.icon}>
              <i className="fa fa-times" onClick={closePopup}></i>
            </div>
            {data && <p className={classes.name}>{data.name}</p>}
            {data && (
              <p className={classes.price}>
                {(+data.price).toLocaleString("de-DE")} VND
              </p>
            )}
            {data && <p className={classes.desc}>{data.short_desc}</p>}
            <button onClick={viewDetailHandle}>
              <i className="fa fa-shopping-cart"></i> View Detail
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("popup")
  );
}
