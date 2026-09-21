import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let [updateMode, setUpdateMode] = useState(false);
  let [updateId, setUpdateId] = useState("");
  let [userList, setUserList] = useState();
  let [FormData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });
  let handleForm = (e) => {
    let { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
    setError({});
  };

  const handleSubmit = async () => {
    await axios
      .post("http://localhost:8000/registration", {
        username: FormData.username,
        email: FormData.email,
        password: FormData.password,
      })
      .then(() => {
        setUpdateId(Date.now());
        setFormData({ username: "", email: "", password: "" });
      });
  };

  const handleDelete = async (i) => {
    setUpdateId(i._id);
    await axios.delete(`http://localhost:8000/delete/${i._id}`).then(() => {
      setUpdateId();
    });
  };

  const handleUpdate = (i) => {
    setUpdateMode(true);
    setUpdateId(i._id);
    setFormData({
      username: i.username,
      email: i.email,
      password: i.password,
    });
  };

  const handleFormUpdate = async () => {
    await axios
      .post(`http://localhost:8000/update/${updateId}`, {
        username: FormData.username,
        email: FormData.email,
        password: FormData.password,
      })
      .then(() => {
        setUpdateId("");
        setUpdateMode(false);
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      });
  };

  useEffect(() => {
    async function fetch() {
      const response = await axios.get("http://localhost:8000/allusers");
      setUserList(response.data);
    }
    fetch();
  }, [updateId]);

  return (
    <div className="container">
      <div className="form_container">
        <h2>{updateMode ? "Update User" : "Add New User"}</h2>
        <div className="input_group">
          <input
            onChange={handleForm}
            name="username"
            type="text"
            placeholder="Enter your Name"
            value={FormData.username}
          />
        </div>
        <div className="input_group">
          <input
            onChange={handleForm}
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={FormData.email}
          />
        </div>
        <div className="input_group">
          <input
            onChange={handleForm}
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={FormData.password}
          />
        </div>
        {updateMode ? (
          <button
            className="btn-submit btn-update-mode"
            onClick={handleFormUpdate}
          >
            Update User
          </button>
        ) : (
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>

      <div className="list_header">
        <h1>User List</h1>
      </div>
      <div className="card_wrapper">
        {userList?.map((item, index) => (
          <div key={index} className="card_item">
            <h3>Name: {item.username}</h3>
            <h3>Email:{item.email}</h3>
            <h3>Password:{item.password}</h3>
            <div className="buttons">
              <button className="btn-delete" onClick={() => handleDelete(item)}>
                Delete
              </button>
              <button className="btn-update" onClick={() => handleUpdate(item)}>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
