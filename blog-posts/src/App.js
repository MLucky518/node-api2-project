import React , { useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import PostsList from "./components/PostsList"

function App() {
  const [posts,setPosts] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) =>{
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() =>{
    fetchData();
  }, [])
  return (
    <div className="App">
     <h1>APP</h1>
     <PostsList posts = {posts}/>
    </div>
  );
}

export default App;
