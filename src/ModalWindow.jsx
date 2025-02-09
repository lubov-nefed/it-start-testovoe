const handleEdit = (e) => {
  const form = e.target.parentElement;
  const formData = new FormData(form);
  const seminarId = formData.get("id");
  const formJson = JSON.stringify(Object.fromEntries(formData.entries()));
  try {
    fetch(`http://localhost:3001/seminars/${seminarId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: formJson,
    }).then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Respose error. Status code: ${response.status}`);
      }
      return response.json();
    });
  } catch (error) {
    if (!error) {
      throw Error("Data request error");
    }
    console.log(error);
  }
};

function EditForm({ seminar }) {
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

const handleDelete = (seminarId) => {
  try {
    fetch(`http://localhost:3001/seminars/${seminarId}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Respose error. Status code: ${response.status}`);
      }
      return response.json();
    });
  } catch (error) {
    console.log(error);
  }
};

function DeleModal({ seminar }) {
  return (
    <div>
      <p>Удалить семинар &quot;{seminar.title}&quot;?</p>
      <button onClick={() => handleDelete(seminar.id)}>Удалить</button>
    </div>
  );
}

export function ModalWindow({ type, activeSeminar, onClose }) {
  return (
    <div className="modal-window">
      <br />
      {type === "editModal" && <EditForm seminar={activeSeminar} />}
      {type === "deleteModal" && <DeleModal seminar={activeSeminar} />}
      <button className="modal-close-btn" onClick={onClose}>
        Отмена
      </button>
    </div>
  );
}
