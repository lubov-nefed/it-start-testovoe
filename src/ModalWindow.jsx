function EditForm({ seminar, handleEdit }) {
  const keys = Object.keys(seminar);
  const id = keys[0];
  const visibleKeys = keys.slice(1);
  const fields = visibleKeys.map((key) => (
    <label key={key} className="edit-label" htmlFor={key}>
      <input
        key={key}
        className="edit-input"
        type="text"
        name={key}
        id={key}
        defaultValue={seminar[key]}
      />
    </label>
  ));
  return (
    <form>
      <h2>Редактировать</h2>
      <label className="edit-label" htmlFor={id}>
        <input
          className="edit-input"
          type="hidden"
          name={id}
          id={id}
          value={seminar.id}
        />
      </label>
      {fields}
      <button
        type="button"
        className="edit-submit-btn"
        onClick={(e) => handleEdit(e)}
      >
        Сохранить
      </button>
    </form>
  );
}

function DeleModal({ seminar, handleDelete }) {
  return (
    <div>
      <p>Удалить семинар &quot;{seminar.title}&quot;?</p>
      <button onClick={() => handleDelete(seminar.id)}>Удалить</button>
    </div>
  );
}

export function ModalWindow({
  type,
  activeSeminar,
  onClose,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="modal-window">
      <br />
      {type === "editModal" && (
        <EditForm seminar={activeSeminar} handleEdit={handleEdit} />
      )}
      {type === "deleteModal" && (
        <DeleModal seminar={activeSeminar} handleDelete={handleDelete} />
      )}
      <button className="modal-close-btn" onClick={onClose}>
        Отмена
      </button>
    </div>
  );
}
