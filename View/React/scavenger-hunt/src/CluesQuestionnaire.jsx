import { useState } from "react";
import Modal from "./components/Modal";

function CluesQuestionnaire(props) {
  const [ans, setAns] = useState("");
  const [showAns, setShowAns] = useState(false);
  const [modalToggle, setModalToggle] = useState(true);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(props.clue.ans);
    if (`${props.clue.ans}`.toLowerCase().includes(ans)) {
      setAns((s) => "");
      setShowAns((s) => !s);
    }
  }
  function hanndleChange(e) {
    setAns((s) => e.target.value.toLowerCase());
  }
  return (
    <>
      {modalToggle && (
        <Modal escape={true} close={setModalToggle}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">{props.clue.ques}</label>
            {!showAns && (
              <input
                type="text"
                name="clueAns"
                id="clueAns"
                value={ans}
                onChange={hanndleChange}
              />
            )}

            {showAns && (
              <>
                <br />
                <br />
                <p>Fun fact:</p>
                {/* <br /> */}
                <label>{props.clue.ans}</label>
              </>
            )}
          </form>
        </Modal>
      )}
    </>
  );
}

export default CluesQuestionnaire;
