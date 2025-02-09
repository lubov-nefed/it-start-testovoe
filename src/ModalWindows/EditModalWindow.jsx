export function EditModalWindow({ seminar, handleEdit }) {
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
