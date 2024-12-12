import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [postResponse, setPostResponse] = useState("");


  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hello");
        setMessage(res.data.message);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchMessage();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/world", {
        inputValue,
      });
      setPostResponse(res.data.message);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div>
      <h1>{message}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p>{postResponse}</p>
    </div>
  );
};

export default App;
