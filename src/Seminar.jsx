export function Seminar({ seminar, onEdit, onDelete }) {
  return (
    <li className="seminar-li">
      <h4 className="seminar-title">{seminar.title}</h4>
      <span className="seminar-date">{seminar.date}</span>
      <span className="seminar-time">{seminar.time}</span>
      <p className="seminar-description">{seminar.description}</p>
      {/* Почему-то фото с picsum не загружаются
          Ошибка "sorry you have been blocked"
          Поэтому загрузим рандомные фото котиков. Все любят котиков =) */}
      <img src={seminar.photo} alt={`${seminar.title} фото`} />
      <br />
      <img
        src={`https://loremflickr.com/700/300?kitten=${seminar.id}`}
        alt={`Случайное фото с Thecatapi`}
      />
      <br />
      <div className="seminar-buttons-container">
        <button className="seminar-button" onClick={onEdit}>
          Редактировать
        </button>
        <button className="seminar-button" onClick={onDelete}>
          Удалить
        </button>
      </div>
    </li>
  );
}
