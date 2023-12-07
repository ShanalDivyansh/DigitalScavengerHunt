import "../App.css";
function Modal(props) {
  return (
    <div className="modal">
      {props.escape && (
        <button
          className="model-close"
          onClick={() => {
            props.close((s) => !s);
            // props.setModalToggle((s) => !s);
          }}
        >
          &#10006;
        </button>
      )}
      {props.children}
    </div>
  );
}

export default Modal;
