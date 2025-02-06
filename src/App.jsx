import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

async function fetchSeminars() {
  try {
    const response = await fetch("/db.json");
    if (response.ok) {
      let data = await response.json();
      return data.seminars;
    } else {
      throw Error(
        `Something went wrong. Response status code: ${response.status}`
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [seminars, setSeminars] = useState(null);
  useEffect(() => {
    let ignore = false;
    setSeminars(null);
    fetchSeminars().then((result) => {
      if (!ignore) {
        setSeminars(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);
  console.log(seminars);

  return <>App</>;
}

export default App;
