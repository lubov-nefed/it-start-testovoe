import "./App.css";
import { useState, useEffect } from "react";

async function fetchSeminars() {
  try {
    const response = await fetch("https://httpstat.us/500");
    if (response.ok) {
      const result = await response.json();
      return result.seminars;
    } else {
      throw Error(`Error. Response status code: ${response.status}`);
    }
  } catch (error) {
    if (!error) {
      throw Error("Data request error");
    } else throw error;
  }
}

function App() {
  const [seminars, setSeminars] = useState(null); //loading, data, error

  useEffect(() => {
    let ignore = false;

    setSeminars("loading");
    setTimeout(() => {
      fetchSeminars()
        .then((data) => {
          if (!ignore) {
            setSeminars(data);
          }
        })
        .catch((error) => {
          setSeminars("error");
          console.log(error);
        });
    }, 2000);

    return () => {
      ignore = true;
    };
  }, []);

  const seminarsList = Array.isArray(seminars)
    ? seminars.map((seminar) => <li key={seminar.id}>{seminar.title}</li>)
    : null;

  return (
    <>
      {seminars === "loading" && <p>Loading...</p>}
      {seminarsList && <ul>{seminarsList}</ul>}
      {seminars === "error" && <p>Sorry, data request error</p>}
    </>
  );
}

export default App;
