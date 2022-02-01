import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const initInput = {
  title: "",
  author: "",
};
function App() {
  const [input, setInput] = useState(initInput);
  const [data, setData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const payload = {
      ...input,
      [name]: value,
    };
    setInput(payload);
  };
  const getData = () => {
    fetch("https://fake-api-project-for-masai.herokuapp.com/posts")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getData();
  }, []);
  const handleClick = () => {
    fetch("https://fake-api-project-for-masai.herokuapp.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((res) => {
        getData();
        setInput(initInput);
      })
      .catch((error) => console.log(error.message));
  };
  const handleDelete = (id) => {
    fetch(`https://fake-api-project-for-masai.herokuapp.com/posts/${id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((res) => {
        getData();
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="App">
      <p className="label">Title:</p>
      <input
        type="text"
        onChange={handleChange}
        value={input.title}
        name="title"
      />
      <p className="label">Author:</p>
      <input
        type="text"
        onChange={handleChange}
        value={input.author}
        name="author"
      />
      <br />
      <br />
      <button onClick={handleClick}>Add</button>
      <div className="data">
        {data.map((item) => (
          <Post key={item.id} {...item} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

const Post = ({ title, author, id, handleDelete }) => {
  return (
    <div style={{ display: "flex" }}>
      <p>{title}</p>
      <p>{author}</p>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
};

export default App;
