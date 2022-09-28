import React from "react";
import successIcon from "../images/icon-complete.svg";

const Success = () => {
  return (
    <div className="success">
      <figure className="success-img">
        <img src={successIcon} alt="successIcon" />
      </figure>
      <h4>Thank you!</h4>
      <p>We've added your card details</p>
      <button className="btn btn-confirm">Continue</button>
    </div>
  );
};

export default Success;
