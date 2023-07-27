import iconArcade from "../assets/images/icon-arcade.svg";
import iconAdvanced from "../assets/images/icon-advanced.svg";
import iconPro from "../assets/images/icon-pro.svg";
import iconThanks from "../assets/images/icon-thank-you.svg";
import { plans, addOn } from "../dati";
import { useEffect, useRef, useState } from "react";

function Step1({
  handlerInputNome,
  inputName,
  handlerInputEmail,
  handlerInputNum,
  inputEmail,
  inputTel,
  errorModule,
  inviaModulo,
}) {
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);

  useEffect(() => {
    if (errorModule.emailRequired || errorModule.emailWrong) {
      inputEmailRef.current.focus();
    } else if (errorModule.nameRequired) {
      inputNameRef.current.focus();
    }
  }, [errorModule]);

  return (
    <div className="container-body-step-1">
      <form onSubmit={inviaModulo}>
        <div className="riga-input-step-1">
          <div className="riga-label">
            <label htmlFor="name">Name *</label>
            {errorModule.nameRequired ? (
              <p className="red">This field is required</p>
            ) : null}
          </div>
          <input
            ref={inputNameRef}
            onChange={handlerInputNome}
            id="name"
            type="text"
            placeholder="e.g Boston George"
            value={inputName}
          />
        </div>
        <div className="riga-input-step-1">
          <div className="riga-label">
            <label htmlFor="email">Email Address *</label>
            {errorModule.emailRequired ? (
              <p className="red">This field is required</p>
            ) : null}
            {errorModule.emailWrong ? (
              <p className="red">Email address is incorrect</p>
            ) : null}
          </div>

          <input
            ref={inputEmailRef}
            onChange={handlerInputEmail}
            id="email"
            type="email"
            placeholder="e.g bostongeorge@lorem.com"
            value={inputEmail}
          />
        </div>
        <div className="riga-input-step-1">
          <label htmlFor="tel">Phone Number</label>
          <input
            onChange={handlerInputNum}
            id="tel"
            type="tel"
            placeholder="e.g +1 234 567 890"
            value={inputTel}
          />
        </div>
        <button style={{ display: "none" }}>send</button>
      </form>
    </div>
  );
}
function Step2({ period, cambiaPeriodo, scelgiPiano, planActive }) {
  let imgPlans = null;

  return (
    <div className="container-body-step-2">
      <div className="riga-alta-step-2">
        {plans.map((obj) => {
          if (obj.type === "arcade") {
            imgPlans = iconArcade;
          } else if (obj.type === "advanced") {
            imgPlans = iconAdvanced;
          } else if (obj.type === "pro") {
            imgPlans = iconPro;
          } else {
            imgPlans = iconArcade;
          }
          return (
            <div
              key={obj.id}
              onClick={() => {
                scelgiPiano(obj.type, obj.costoMese, obj.costoAnno);
              }}
              className={
                "card-plan " +
                (planActive === obj.type ? "card-plan-active" : null)
              }
            >
              <img src={imgPlans} alt="" />
              <div className="card-plan-box-testi">
                <h3 className="maiusc">{obj.type}</h3>
                <p className="card-plan-box-testi-price">
                  {period === "month"
                    ? `$${obj.costoMese}/mo`
                    : `$${obj.costoAnno}/yr`}
                </p>
                {period === "year" ? (
                  <p className="card-plan-box-testi-promo">2 months free</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="riga-bassa-step-2">
        <p
          onClick={() => cambiaPeriodo("month")}
          className={
            "plan-deactive " + (period === "month" ? "plan-active" : null)
          }
        >
          Monthly
        </p>
        <div className="base-switch">
          {/* altra classe 'active-year' */}
          <div
            className={
              "ball-switch " +
              (period === "month" ? "active-month" : "active-year")
            }
          ></div>
        </div>
        <p
          onClick={() => cambiaPeriodo("year")}
          className={
            "plan-deactive " + (period === "year" ? "plan-active" : null)
          }
        >
          Yearly
        </p>
      </div>
    </div>
  );
}
function Step3({ period, cambiaAddOn, user }) {
  return (
    <div className="container-body-step-3">
      {user.addOn.map((obj) => {
        return (
          <div
            onClick={() => {
              cambiaAddOn(obj);
            }}
            key={obj.id}
            className={"box-add-ons  " + (obj.active ? "box-add-active" : null)}
          >
            {obj.active ? (
              <input checked={true} readOnly type="checkbox" name="" id="" />
            ) : (
              <input checked={false} readOnly type="checkbox" name="" id="" />
            )}
            <div>
              <h4 className="maiusc">{obj.type}</h4>
              <p>{obj.description}</p>
            </div>
            <p>
              {period === "month"
                ? `$${obj.costoMese}/mo`
                : `$${obj.costoAnno}/yr`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
function Step4({ user, period, cambiaPeriodo }) {
  let extraAttivi = user.addOn.filter((obj) => {
    return obj.active === true;
  });

  let prezzoExtraMese = extraAttivi.map((obj) => {
    return obj.costoMese;
  });

  let totMeseAddOn = 0;
  for (let i = 0; i < prezzoExtraMese.length; i++) {
    totMeseAddOn = totMeseAddOn + prezzoExtraMese[i];
  }

  let prezzoExtraAnno = extraAttivi.map((obj) => {
    return obj.costoAnno;
  });

  let totAnnoAddOn = 0;
  for (let i = 0; i < prezzoExtraAnno.length; i++) {
    totAnnoAddOn = totAnnoAddOn + prezzoExtraAnno[i];
  }

  let mensilita = null;
  if (period === "month") {
    mensilita = "(Monthly)";
  } else {
    mensilita = "(Yearly)";
  }
  return (
    <div className="container-body-step-4">
      <div className="riepilogo-top">
        <div className="row-1-riepilogo">
          <div>
            <p className="style-arcadle maiusc">
              {user.plan.type} {mensilita}
            </p>
            <p
              onClick={() =>
                cambiaPeriodo(period === "year" ? "month" : "year")
              }
              className="style-change"
            >
              Change
            </p>
          </div>
          <p className="style-partial-price-top">
            ${user.plan.price}
            {period === "month" ? "/mo" : "/yr"}
          </p>
        </div>
        {user.addOn.filter((obj) => {
          return obj.active === true;
        }).length === 0 ? null : (
          <hr className="divider-ripilogo" />
        )}

        {user.addOn.map((obj, index) => {
          if (obj.active) {
            return (
              <div key={index} className="row-3-riepilogo">
                <p className="maiusc">{obj.type}</p>
                <p className="style-partial-price">
                  {period === "month"
                    ? "+$" + obj.costoMese + "/mo"
                    : "+$" + obj.costoAnno + "/yr"}
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="riepilogo-bottom">
        <p>Total {period === "month" ? "(per month)" : "(per year)"} </p>
        <h3 className="style-total-price">
          {" "}
          {period === "month"
            ? "$" + (totMeseAddOn + user.plan.price) + "/mo"
            : "$" + (totAnnoAddOn + user.plan.price) + "/yr"}
        </h3>
      </div>
    </div>
  );
}
function Step5({ ripristina }) {
  useEffect(() => {
    document.body.classList.add("coriandoli");
    let timer = setTimeout(() => {
      ripristina();
    }, 4000);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("coriandoli");
    };
  }, []);
  return (
    <div className="container-body-step-5">
      <img src={iconThanks} alt="" />
      <h2>Thank you!</h2>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

function BodyInfo({
  period,
  cambiaPeriodo,
  scelgiPiano,
  planActive,
  cambiaAddOn,
  user,
  handlerInputNome,
  inputName,
  handlerInputEmail,
  handlerInputNum,
  inputEmail,
  inputTel,
  inviaModulo,
  vista,
  ripristina,
  errorModule,
}) {
  return (
    <div className="row-body-info">
      {vista === 1 ? (
        <Step1
          handlerInputNome={handlerInputNome}
          inputName={inputName}
          handlerInputEmail={handlerInputEmail}
          handlerInputNum={handlerInputNum}
          inputEmail={inputEmail}
          inputTel={inputTel}
          errorModule={errorModule}
          inviaModulo={inviaModulo}
        />
      ) : null}
      {vista === 2 ? (
        <Step2
          period={period}
          cambiaPeriodo={cambiaPeriodo}
          scelgiPiano={scelgiPiano}
          planActive={planActive}
        />
      ) : null}
      {vista === 3 ? (
        <Step3 period={period} cambiaAddOn={cambiaAddOn} user={user} />
      ) : null}
      {vista === 4 ? (
        <Step4 user={user} period={period} cambiaPeriodo={cambiaPeriodo} />
      ) : null}
      {vista === 5 ? <Step5 ripristina={ripristina} /> : null}
    </div>
  );
}
export default BodyInfo;
