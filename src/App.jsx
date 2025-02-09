import { useState, useEffect } from "react";
import { Seminar } from "./Seminar.jsx";
import { ModalWindow } from "./ModalWindow.jsx";

// Функция для запроса данных о семинарах с сервера
async function fetchSeminars() {
  try {
    //Запрашиваем данные
    const response = await fetch("/db.json");
    //Если ответ получен, возвращаем данные
    if (response.ok) {
      const result = await response.json();
      return result.seminars;
      //Если произошла ошибка пробрасываем ее дальше для отображения в консоли/на странице
    } else {
      throw Error(`Error. Response status code: ${response.status}`);
    }
  } catch (error) {
    if (!error) {
      //Если ошибку отловить не удалось, то выбрасываем ошибку запроса данных
      throw Error("Data request error");
      //Пробрасываем ошибку дальше,  для отображения ее в консоли/на странице
    } else throw error;
  }
}

function App() {
  //Переменная seminars будет принимать значения: loading/data/error
  // и либо отображать состояние (загрузка/ошибка), либо содержать данные, запрошенные с сервера
  const [seminars, setSeminars] = useState(null);
  const [state, setState] = useState("noModal"); //editModal, deleteModal
  const [activeSeminar, setActiveSeminar] = useState(null);

  const handleEdit = (seminar) => {
    setState("editModal");
    setActiveSeminar(seminar);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (seminar) => {
    setState("deleteModal");
    setActiveSeminar(seminar);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCloseModal = () => {
    setState("noModal");
  };

  //Используем useEffect для запроса данных
  useEffect(() => {
    let ignore = false;

    //Устанавливаем состояние "загружается" для отображения на странице
    setSeminars("loading");
    //Здесь добавим искуственную задержку чтобы видеть индикатор загрузки
    //в процессе разработки, перед продакшеном нужно убрать
    /* === */
    //TODO: Убрать setTimeout перед продакшеном
    /* === */
    setTimeout(() => {
      fetchSeminars()
        .then((data) => {
          if (!ignore) {
            //При успешной загрузке помещаем в seminars данные, для отображения на странице
            setSeminars(data);
          }
        })
        .catch((error) => {
          //При ошибке seminars получит состояние error
          //Чтобы проинформировать пользователя, что произошла ошибка
          setSeminars("error");
          console.log(error);
        });
    }, 1500);

    return () => {
      ignore = true;
    };
  }, []); //указываем пустой массив зависимостей, чтобы запрос данных выполнялся только при первом рендере компонента

  const seminarsList = Array.isArray(seminars)
    ? seminars.map((seminar) => (
        <Seminar
          key={seminar.id}
          seminar={seminar}
          handleEdit={() => handleEdit(seminar)}
          handleDelete={() => handleDelete(seminar)}
        />
      ))
    : null;

  return (
    <>
      {(state === "editModal" || state === "deleteModal") && (
        <ModalWindow
          type={state}
          activeSeminar={activeSeminar}
          onClose={() => handleCloseModal()}
        />
      )}
      {seminars === "loading" && <p>Loading...</p>}
      {seminarsList && <ul className="seminars-list">{seminarsList}</ul>}
      {seminars === "error" && <p>Sorry, data request error</p>}
    </>
  );
}

export default App;
