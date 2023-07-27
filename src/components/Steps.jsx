function SingleStep({ num, testoNum, testo, classeAttiva }) {
  return (
    <div className="rigaStep">
      <div className={"cerchio-step " + classeAttiva}>
        <span>{num}</span>
      </div>
      <div className="block-step-testo">
        <h5>{testoNum}</h5>
        <h4>{testo}</h4>
      </div>
    </div>
  );
}

function Steps({ vista }) {
  return (
    <div className="column-step">
      <div className="box-global-step">
        <SingleStep
          num={"1"}
          testo={"YOUR INFO"}
          testoNum={"STEP 1"}
          classeAttiva={vista === 1 ? "cerchio-attivo" : null}
        />
        <SingleStep
          num={"2"}
          testo={"SELECT PLAN"}
          testoNum={"STEP 2"}
          classeAttiva={vista === 2 ? "cerchio-attivo" : null}
        />
        <SingleStep
          num={"3"}
          testo={"ADD-ONS"}
          testoNum={"STEP 3"}
          classeAttiva={vista === 3 ? "cerchio-attivo" : null}
        />
        <SingleStep
          num={"4"}
          testo={"SUMMARY"}
          testoNum={"STEP 4"}
          classeAttiva={vista === 4 ? "cerchio-attivo" : null}
        />
      </div>
    </div>
  );
}
export default Steps;
