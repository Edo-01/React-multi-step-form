function Info1() {
  return (
    <>
      <h2>Personal info</h2>
      <p>Please provide your name, email address, and phone number.</p>
    </>
  );
}
function Info2() {
  return (
    <>
      <h2>Select your plan</h2>
      <p>You have the option of monthly or yearly billing.</p>
    </>
  );
}
function Info3() {
  return (
    <>
      <h2>Pick add-ons</h2>
      <p>Add-ons help enhance your gaming experience.</p>
    </>
  );
}
function Info4() {
  return (
    <>
      <h2>Finishing up</h2>
      <p>Double check everything looks OK before confirming.</p>
    </>
  );
}

function HeaderInfo({ vista }) {
  return (
    <div className="row-header-info">
      {vista === 1 ? <Info1 /> : null}
      {vista === 2 ? <Info2 /> : null}
      {vista === 3 ? <Info3 /> : null}
      {vista === 4 ? <Info4 /> : null}
    </div>
  );
}
export default HeaderInfo;
