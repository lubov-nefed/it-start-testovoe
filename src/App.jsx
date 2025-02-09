import { useState, useEffect } from "react";
import { Seminar } from "./Seminar.jsx";
import { ModalWindow } from "./ModalWindows/ModalWindow.jsx";
import { fetchSeminars } from "./fetchSeminars.js";

function App() {
  //Переменная seminars будет принимать значения: loading/data/error
  // и либо отображать состояние (загрузка/ошибка), либо содержать данные, запрошенные с сервера
  const [seminars, setSeminars] = useState(null); //loading/data/error
  const [uiState, setUiState] = useState("noModal"); //editModal, deleteModal
  const [activeSeminar, setActiveSeminar] = useState(null);
  const [dataMutationToggle, setDataMutationToggle] = useState("off"); //on

  //Меняем состояние интерфейса, вызываем модальное окно редактирования
  const onEdit = (seminar) => {
    setUiState("editModal");
    setActiveSeminar(seminar);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //Меняем состояние интерфейса, вызываем модальное окно удаления
  const onDelete = (seminar) => {
    setUiState("deleteModal");
    setActiveSeminar(seminar);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //Закрываем модальное окно
  const handleCloseModal = () => {
    setUiState("noModal");
  };

  //Отправляем запрос на сервер для редактирования семинара
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
        if (!response.ok) {
          throw new Error(`Respose error. Status code: ${response.status}`);
        }
        dataMutationToggle === "on"
          ? setDataMutationToggle("off")
          : setDataMutationToggle("on");
        handleCloseModal();
        return response.json();
      });
    } catch (error) {
      if (!error) {
        throw Error("Data request error");
      }
      console.log(error);
    }
  };

  //Отправляем запрос на сервер для удаления семинара
  const handleDelete = (seminarId) => {
    try {
      fetch(`http://localhost:3001/seminars/${seminarId}`, {
        method: "DELETE",
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Respose error. Status code: ${response.status}`);
        }
        dataMutationToggle === "on"
          ? setDataMutationToggle("off")
          : setDataMutationToggle("on");
        handleCloseModal();
        return response.json();
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Используем useEffect для получения данных о семинарах
  useEffect(() => {
    let ignore = false;

    //Устанавливаем состояние "загружается" для отображения на странице
    setSeminars("loading");
    //Здесь добавим искуственную задержку setTimeout чтобы видеть индикатор загрузки в процессе разработки,
    // перед продакшеном нужно убрать
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
    }, 1200);

    return () => {
      ignore = true;
    };
  }, [
    dataMutationToggle,
  ]); /* указываем зависмость от изменения данных на сервере,
  чтобы запрос данных выполнялся в ответ на действия пользователя, 
  и интерфейс менялся
 */

  const seminarsList = Array.isArray(seminars)
    ? seminars.map((seminar) => (
        <Seminar
          key={seminar.id}
          seminar={seminar}
          onEdit={() => onEdit(seminar)}
          onDelete={() => onDelete(seminar)}
        />
      ))
    : null;

  return (
    <>
      {(uiState === "editModal" || uiState === "deleteModal") && (
        <ModalWindow
          type={uiState}
          activeSeminar={activeSeminar}
          onClose={() => handleCloseModal()}
          handleEdit={(e) => handleEdit(e)}
          handleDelete={(seminarId) => handleDelete(seminarId)}
        />
      )}
      {seminars === "loading" && <p>Loading...</p>}
      {seminarsList && <ul className="seminars-list">{seminarsList}</ul>}
      {seminars === "error" && <p>Sorry, data request error</p>}
    </>
  );
}

export default App;
