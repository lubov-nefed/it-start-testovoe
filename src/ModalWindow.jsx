export function ModalWindow({ type, activeSeminar, onClose }) {
  return (
    <div className="modal-window">
      ModalWindow type: {type}
      <br />
      Active Seminar: {activeSeminar.title}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
