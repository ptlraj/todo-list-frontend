import React, { useState, useEffect } from "react";
import axios from "axios";
const List = () => {
  const [post, setPost] = useState([]);
  const [show, setshow] = useState(false);
  const [title, settitle] = useState("");
  const [id, setid] = useState("");
  const [description, setdiscription] = useState("");
  const[update,setupdate]=useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/getAll").then((data) => {
      console.log(data.data);
      setPost(data?.data);
      // console.log(post[0].title.toString())
    });
  }, [update]);

const posttodo=async()=>{
  const res=await fetch(`http://localhost:3000/post`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({title:title,description:description})
  })
  setupdate(!update);
  settitle("");
  setdiscription("");
}

  const deletetodo = async (id) => {
    const res=await fetch(`http://localhost:3000/delete/${id}`,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    })

    // let arr = post.filter(e=> e._id != id)
    setPost((pre) => {
      return pre.filter((e) => e._id != id);
    });
  };

  const updatetodo = async (id) => {
    const res = await fetch(`http://localhost:3000/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title , description:description }),
    });
    setupdate(!update)
  };
  return (
    
    <div>
      <div>
      <input
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          ></input>
  
          <input
            type="text"
            placeholder="Enter your discrription"
            value={description}
            onChange={(e) => setdiscription(e.target.value)}
          ></input>
      
          <button onClick={()=>{
            posttodo()
          }}>add</button>
      </div>
      <table className=" bg-white">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {post.map((todo) => (
            <tr key={todo.id}>
              <td className="border px-4 py-2">{todo.title}</td>
              <td className="border px-4 py-2">{todo.description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setshow(true);
                    setid(todo._id)
                    // updatetodo(todo._id);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                {/* <EditTodo todo={todo} /> */}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    deletetodo(todo._id);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {show ? (
        <>
          <input
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          ></input>
          <br></br>
          <input
            type="text"
            placeholder="Enter your discrription"
            value={description}
            onChange={(e) => setdiscription(e.target.value)}
          ></input>
          <br></br>
          <button onClick={()=>{
            updatetodo(id)
            setshow(false)
          }}>done</button>
        </>
      ) : null}
    </div>
  );
};

export default List;
