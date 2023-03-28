import { useState, useEffect } from "react";

import axios from "axios";

export const FormComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/api/notes")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.log);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!userInput) {
      alert("Please add a note first!");
      return;
    }
    axios
      .post("http://localhost:3005/api/notes", { content: userInput })
      .then((res) => {
        console.log(res.data);
        setData(data.concat(res.data));
        setUserInput("");
      })
      .catch(console.log);
  };

  const clickHandlerDelete = (id) => {
    axios.delete(`http://localhost:3005/api/notes/${id}`).then((res) => {
      console.log(res.data);
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
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
          onChange={(e) => setUserInput(e.target.value)}
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
