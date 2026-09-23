import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let [updateMode, setUpdateMode] = useState(false);
  let [updateId, setUpdateId] = useState("");
  let [userList, setUserList] = useState();
  let [imageFile, setImageFile] = useState(null);
  let [FormDataState, setFormDataState] = useState({
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
    setFormDataState({ ...FormDataState, [name]: value });
    setError({});
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("username", FormDataState.username);
    data.append("email", FormDataState.email);
    data.append("password", FormDataState.password);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:8000/api/v1/registration", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUpdateId(Date.now());
      setFormDataState({ username: "", email: "", password: "" });
      setImageFile(null);
      document.getElementById("imageInput").value = "";
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("This email is already registered! Please use a different email.");
      } else {
        alert("An error occurred during registration. Please check all fields.");
      }
    }
  };

  const handleDelete = async (i) => {
    setUpdateId(i._id);
    await axios.delete(`http://localhost:8000/api/v1/delete/${i._id}`).then(() => {
      setUpdateId(Date.now());
    });
  };

  const handleUpdate = (i) => {
    setUpdateMode(true);
    setUpdateId(i._id);
    setFormDataState({
      username: i.username,
      email: i.email,
      password: i.password,
    });
  };

  const handleFormUpdate = async () => {
    const data = new FormData();
    data.append("username", FormDataState.username);
    data.append("email", FormDataState.email);
    data.append("password", FormDataState.password);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await axios.post(`http://localhost:8000/api/v1/update/${updateId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUpdateId(Date.now());
      setUpdateMode(false);
      setFormDataState({ username: "", email: "", password: "" });
      setImageFile(null);
      document.getElementById("imageInput").value = "";
    } catch (err) {
      alert("Error updating user.");
    }
  };

  useEffect(() => {
    async function fetch() {
      const response = await axios.get("http://localhost:8000/api/v1/allusers");
      setUserList(response.data);
    }
    fetch();
  }, [updateId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (updateMode) {
      handleFormUpdate();
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <form className="form_container" onSubmit={handleFormSubmit}>
        <h2>{updateMode ? "Update User" : "Add New User"}</h2>
        <div className="input_group">
          <input
            onChange={handleForm}
            name="username"
            type="text"
            placeholder="Enter your Name"
            value={FormDataState.username}
          />
        </div>
        <div className="input_group">
          <input
            onChange={handleForm}
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={FormDataState.email}
          />
        </div>
        <div className="input_group">
          <input
            onChange={handleForm}
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={FormDataState.password}
          />
        </div>
        <div className="input_group">
          <input
            id="imageInput"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        {updateMode ? (
          <button type="submit" className="btn-submit btn-update-mode">
            Update User
          </button>
        ) : (
          <button type="submit" className="btn-submit">
            Submit
          </button>
        )}
      </form>

      <div className="list_header">
        <h1>User List</h1>
      </div>
      <div className="card_wrapper">
        {userList?.map((item, index) => (
          <div key={index} className="card_item">
            {item.image && (
              <img 
                src={`http://localhost:8000/uploads/${item.image}`} 
                alt="Profile" 
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} 
              />
            )}
            <h3>Name: {item.username}</h3>
            <h3>Email: {item.email}</h3>
            <h3>Password: {item.password}</h3>
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
