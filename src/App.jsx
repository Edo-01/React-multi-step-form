import Steps from "./components/Steps";
import BottomNavigation from "./components/BottomNavigation";
import BodyInfo from "./components/BodyInfo";
import HeaderInfo from "./components/HeaderInfo";
import { useState } from "react";
import { plans, addOn } from "./dati";

function App() {
  const [vista, setVista] = useState(1);
  const [period, setPeriod] = useState("month");
  const [planActive, setPlanActive] = useState("arcade");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputTel, setInputTel] = useState("");
  const [errorModule, setErrorModule] = useState({
    nameRequired: false,
    emailRequired: false,
    emailWrong: false,
  });

  const costo = plans.find((obj) => {
    return obj.type === planActive;
  });
  const [user, setUser] = useState({
    id: 0,
    name: inputName,
    email: inputEmail,
    tel: inputTel,
    plan: {
      type: planActive,
      fatturazione: period,
      price: period === "year" ? costo.costoAnno : costo.costoMese,
    },
    addOn: [...addOn],
  });
  function cambiaPeriodo(par) {
    let prezzi = plans.map((obj) => {
      if (par === "month") {
        return { type: obj.type, costo: obj.costoMese };
      } else {
        return { type: obj.type, costo: obj.costoAnno };
      }
    });

    let objTaget = prezzi.find((obj) => {
      return obj.type === user.plan.type;
    });

    setPeriod(par);
    setUser({
      ...user,
      plan: {
        ...user.plan,
        price: objTaget.costo,
        fatturazione: par,
      },
      addOn: user.addOn.map((obj) => {
        return {
          ...obj,
          fatturazione: par,
        };
      }),
    });
  }
  function scelgiPiano(parID, costoMese, costoAnno) {
    setUser({
      ...user,
      plan: {
        ...user.plan,
        type: parID,
        price: period === "month" ? costoMese : costoAnno,
      },
    });
    setPlanActive(parID);
  }
  function cambiaAddOn(par) {
    if (par.active === false) {
      setUser({
        ...user,
        addOn: user.addOn.map((obj) => {
          if (obj.active === false && obj.id === par.id) {
            return {
              ...obj,
              active: true,
            };
          } else {
            return obj;
          }
        }),
      });
    } else {
      setUser({
        ...user,
        addOn: user.addOn.map((obj) => {
          if (obj.active === true && obj.id === par.id) {
            return {
              ...obj,
              active: false,
            };
          } else {
            return obj;
          }
        }),
      });
    }
  }
  function handlerInputNome(e) {
    setInputName(e.target.value);
  }
  function handlerInputEmail(e) {
    setInputEmail(e.target.value);
  }
  function handlerInputNum(e) {
    setInputTel(e.target.value);
  }
  function inviaModulo(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function isValidEmail(email) {
      return emailRegex.test(email);
    }
    if (inputName === "") {
      setErrorModule({
        nameRequired: true,
        emailRequired: false,
        emailWrong: false,
      });
    } else if (inputEmail === "") {
      setErrorModule({
        nameRequired: false,
        emailRequired: true,
        emailWrong: false,
      });
    } else if (!isValidEmail(inputEmail)) {
      setErrorModule({
        nameRequired: false,
        emailRequired: false,
        emailWrong: true,
      });
    } else {
      setUser({
        ...user,
        name: inputName,
        email: inputEmail,
        tel: inputTel,
      });
      setVista(2);
      setErrorModule({
        nameRequired: false,
        emailRequired: false,
        emailWrong: false,
      });
    }
  }
  function navigazioneStep(par) {
    setVista(par);
  }
  function ripristina() {
    setVista(1);
    setInputName("");
    setInputEmail("");
    setInputTel("");
    setUser({
      id: 0,
      name: inputName,
      email: inputEmail,
      tel: inputTel,
      plan: {
        type: planActive,
        fatturazione: period,
        price: period === "year" ? costo.costoAnno : costo.costoMese,
      },
      addOn: [...addOn],
    });
  }

  return (
    <>
      <section className="conatainer-main">
        <Steps vista={vista} />
        <div className="column-global-info">
          <div className="container-top-info">
            <div className="box-minHeight-header">
              <HeaderInfo vista={vista} />
            </div>
            <BodyInfo
              period={period}
              cambiaPeriodo={cambiaPeriodo}
              scelgiPiano={scelgiPiano}
              planActive={planActive}
              cambiaAddOn={cambiaAddOn}
              user={user}
              handlerInputNome={handlerInputNome}
              inputName={inputName}
              handlerInputEmail={handlerInputEmail}
              handlerInputNum={handlerInputNum}
              inputEmail={inputEmail}
              inputTel={inputTel}
              inviaModulo={inviaModulo}
              vista={vista}
              ripristina={ripristina}
              errorModule={errorModule}
            />
          </div>
          <div className="box-minHeight">
            {vista === 5 ? null : (
              <BottomNavigation
                vista={vista}
                navigazioneStep={navigazioneStep}
                inviaModulo={inviaModulo}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
