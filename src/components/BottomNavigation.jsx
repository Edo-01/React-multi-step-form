function BottomNavigation({ inviaModulo, vista, navigazioneStep }) {
  if (vista === 1) {
    return (
      <div className="row-bottom-navigation-info">
        <p></p>
        <button onClick={inviaModulo}>Next Step</button>
      </div>
    );
  } else if (vista === 2) {
    return (
      <div className="row-bottom-navigation-info">
        <p
          onClick={() => {
            navigazioneStep(1);
          }}
        >
          Go Back
        </p>
        <button
          onClick={() => {
            navigazioneStep(3);
          }}
        >
          Next Step
        </button>
      </div>
    );
  } else if (vista === 3) {
    return (
      <div className="row-bottom-navigation-info">
        <p
          onClick={() => {
            navigazioneStep(2);
          }}
        >
          Go Back
        </p>
        <button
          onClick={() => {
            navigazioneStep(4);
          }}
        >
          Next Step
        </button>
      </div>
    );
  } else if (vista === 4) {
    return (
      <div className="row-bottom-navigation-info">
        <p
          onClick={() => {
            navigazioneStep(3);
          }}
        >
          Go Back
        </p>
        <button
          className="ultimo-bottone"
          onClick={() => {
            navigazioneStep(5);
          }}
        >
          Confirm
        </button>
      </div>
    );
  } else if (vista === 5) {
    return <div className="row-bottom-navigation-info"></div>;
  }
}
export default BottomNavigation;
