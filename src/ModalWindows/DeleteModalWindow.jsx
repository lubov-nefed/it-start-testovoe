export function DeleteModalWindow({ seminar, handleDelete }) {
  return (
    <div>
      <p>Удалить семинар &quot;{seminar.title}&quot;?</p>
      <button onClick={() => handleDelete(seminar.id)}>Удалить</button>
    </div>
  );
}
