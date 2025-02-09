import { EditModalWindow } from "./EditModalWindow.jsx";
import { DeleteModalWindow } from "./DeleteModalWindow.jsx";

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
        <EditModalWindow seminar={activeSeminar} handleEdit={handleEdit} />
      )}
      {type === "deleteModal" && (
        <DeleteModalWindow
          seminar={activeSeminar}
          handleDelete={handleDelete}
        />
      )}
      <button className="modal-close-btn" onClick={onClose}>
        Отмена
      </button>
    </div>
  );
}
