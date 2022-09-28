import React, { useState } from "react";
import cardFront from "../images/bg-card-front.png";
import cardBack from "../images/bg-card-back.png";
import cardLogo from "../images/card-logo.svg";

import Success from "./Success";

const CardForm = () => {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumError, setCardNumError] = useState(false);
  const [blankError, setBlankError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onNameChangeHandler = (e) => {
    let trimmedChars = clearChars(e.target.value);
    setName(trimmedChars);
  };

  const clearChars = (value = "") => {
    return value.replace(/^[0-9]*$/, "");
  };

  const clearNumber = (value = "") => {
    return value.replace(/\D+/g, "");
  };
  const onCardChangeHandler = (e) => {
    const clearValue = clearNumber(e.target.value);

    let regExp = /^[0-9]*$/;
    let numVal = clearValue.match(regExp);
    let nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
      4,
      8
    )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;

    setCard(nextValue);
    if (numVal === null) {
      setCardNumError(true);
      setTimeout(() => {
        setCardNumError(false);
      }, 2000);
    }
  };
  const onMonthChangeHandler = (e) => {
    if (e.target.value === "") {
      setBlankError(true);
    }
    setTimeout(() => {
      setBlankError(false);
    }, 2000);

    setMonth(e.target.value.slice(0, 2));
    console.log("month is", month, e.target.value);
  };
  const onYearChangeHandler = (e) => {
    if (e.target.value === "") {
      setBlankError(true);
      setTimeout(() => {
        setBlankError(false);
      }, 2000);
    }
    setYear(e.target.value.slice(0, 2));
  };
  const onCVCChangeHandler = (e) => {
    setCvc(e.target.value.slice(0, 3));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("success is top", success);

    console.log("motnh and date", month, year, cvc, card);
    if (month || year || cvc || name || card === "") {
      setBlankError(true);
      setSuccess(false);
    }
    if (
      month !== "" &&
      year !== "" &&
      cvc !== "" &&
      name !== "" &&
      card !== ""
    ) {
      setSuccess(true);
    }
    console.log("success is bottom", success);
    setTimeout(() => {
      setBlankError(false);
    }, 2000);
  };

  return (
    <div className="card-wrapper">
      <div className="cards">
        <figure className="logo">
          <img src={cardLogo} alt="" />
        </figure>
        <figure className="front-img">
          <img src={cardFront} alt="" />
          <span className="display-card">{card}</span>
          <span className="display-name">{name}</span>
          <span className="display-month">{month && `${month}/`}</span>
          <span className="display-year">{year}</span>
        </figure>
        <figure className="back-img">
          <img src={cardBack} alt="" />
          <span className="display-cvc">{cvc}</span>
        </figure>
      </div>
      {!success ? (
        <form className="card-form" onSubmit={onSubmitHandler}>
          <div className="card-name">
            <label htmlFor="name">Cardholder Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Jane Appleseed"
              onChange={onNameChangeHandler}
              value={name}
              className={blankError && !name && "cardBlankError"}
            />
            {blankError && !name && (
              <span className="blank-error">Can't be blank</span>
            )}
          </div>
          <div className="card-number">
            <label htmlFor="number">Card Number</label>
            <input
              type="text"
              name="number"
              placeholder="e.g. 1234 5678 9123 0000"
              onChange={onCardChangeHandler}
              value={card}
              maxLength="19"
              className={
                blankError && !card
                  ? "cardBlankError"
                  : "" && cardNumError
                  ? "card-num-input-error"
                  : ""
              }
            />
            {blankError && !card && (
              <span className="blank-error">Can't be blank</span>
            )}
            {cardNumError && (
              <span className="card-num-error">Wrong Format. Numbers Only</span>
            )}
          </div>
          <div className="expiry-cvc">
            <div className="expiry">
              <label> Exp. Date (MM/YY)</label>
              <div className="date">
                <input
                  type="number"
                  name="month"
                  placeholder="MM"
                  value={month}
                  onChange={onMonthChangeHandler}
                  className={blankError && !month ? "cardBlankError" : ""}
                  maxLength="2"
                />

                <input
                  type="number"
                  name="year"
                  placeholder="YY"
                  value={year}
                  onChange={onYearChangeHandler}
                  maxLength="2"
                  className={blankError && !year ? "cardBlankError" : ""}
                />
              </div>
              {blankError && (!month || !year) && (
                <span className="blank-error">Can't be blank</span>
              )}
            </div>
            <div className="cvc">
              <label>cvc</label>
              <input
                type="number"
                placeholder="e.g. 123"
                value={cvc}
                onChange={onCVCChangeHandler}
                className={blankError && !cvc ? "cardBlankError" : ""}
              />
              {blankError && !cvc && (
                <span className="blank-error">Can't be blank</span>
              )}
            </div>
          </div>
          <button className="btn btn-confirm">Confirm</button>
        </form>
      ) : (
        <Success />
      )}
    </div>
  );
};

export default CardForm;
