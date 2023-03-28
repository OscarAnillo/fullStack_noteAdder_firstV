import { useState, useEffect } from "react";

import axios from "axios";

export const FormComponent = () => {
  const [userInput, setUserInput] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/notes")
      .then((response) => {
        setData(response.data);
      })
      .catch(console.log);
  }, [data]);

  const changeHandler = (e) => {
    setUserInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInput) {
      alert("Please add a note first!");
      return;
    }
    axios.post("http://localhost:3005/api/notes", {
      content: userInput,
    });
    data = data.concat(userInput);
    setUserInput("");
  };

  const clickHandlerDelete = (id) => {
    axios.delete(`http://localhost:3005/api/notes/${id}`).then((response) => {
      console.log(response.data);
      data = data.filter((item) => item.id !== id);
      setData(data);
    });
  };

  return (
    <div>
      <h1>Add Notes</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add a note"
          value={userInput}
          onChange={changeHandler}
        />
        <button>Submit</button>
      </form>
      {data.map((item) => (
        <div key={item.id} className="map-div">
          <div>
            <h1>{item.content}</h1>
            <p>{item.date}</p>
          </div>
          <div>
            <button onClick={() => clickHandlerDelete(item.id)}>x</button>
          </div>
        </div>
      ))}
    </div>
  );
};
