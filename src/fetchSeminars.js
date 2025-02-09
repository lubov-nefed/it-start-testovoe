// Функция для запроса данных о семинарах с сервера
export async function fetchSeminars() {
  try {
    //Запрашиваем данные
    const response = await fetch("http://localhost:3001/seminars");
    //Если ответ получен, возвращаем данные
    if (response.ok) {
      const result = await response.json();
      return result;
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
