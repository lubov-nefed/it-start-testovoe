function EditForm({ seminar }) {
  const keys = Object.keys(seminar).map((item) => {
    if (item !== "id") {
      return item;
    }
  });
  console.log(keys);
  const fields = keys.map((key) => (
    <label key={key} htmlFor={key}>
      <input
        key={key}
        type="text"
        name={key}
        id={key}
        defaultValue={seminar[key]}
      />
    </label>
  ));
  return <form>{fields}</form>;
}

export function ModalWindow({ type, activeSeminar, onClose }) {
  console.log(activeSeminar);
  return (
    <div className="modal-window">
      ModalWindow type: {type}
      <br />
      {type === "editModal" && <EditForm seminar={activeSeminar} />}
      Active Seminar: {activeSeminar.title}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
