import React, { useEffect, useState } from "react"; // Fixed import statement
import { Link } from "react-router-dom"; // Fixed import statement
import '../App.css';

// Post Component
const Post = (props) => (
  <tr>
    <td>{props.post.user}</td> {/* Fixed to use curly braces */}
    <td>{props.post.content}</td> {/* Fixed to use curly braces */}
    <td>
      {props.post.image && ( // Fixed to use dot notation and curly braces
        <img
          alt="Post Image" // Fixed alt attribute syntax
          src={`data:image/jpeg;base64,${props.post.image}`} // Fixed src attribute syntax
          style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} // Fixed style attribute syntax
        />
      )}
    </td>
    <td>
      <button 
        className="btn btn-link" 
        onClick={() => {
          props.deletePost(props.post._id); // Fixed to use dot notation
        }}>
        Delete
      </button>
    </td>
  </tr>
);

// PostList Component
export default function PostList() { // Fixed function declaration
  const [posts, setPosts] = useState([]); // Fixed useState usage

  // This method fetches the posts from the database.
  useEffect(() => { // Fixed useEffect usage
    async function getPosts() { // Fixed function declaration
      const response = await fetch("https://localhost:3005/post/"); // Fixed fetch URL syntax
      if (!response.ok) { // Changed to check for errors properly
        const message = `An error occurred: ${response.statusText}`; // Fixed string interpolation
        window.alert(message); // Fixed alert syntax
        return;
      }
      const posts = await response.json(); // Fixed response handling
      setPosts(posts); // Set posts to state
    }
    getPosts(); // Fixed function call
  }, []); // Changed dependency array to empty

  // This method handles post deletion
  async function deletePost(id) { // Fixed function declaration
    const token = localStorage.getItem("jwt"); // Fixed getItem syntax
    await fetch(`https://localhost:3005/post/${id}`, { // Fixed fetch URL syntax
      method: "DELETE", 
      headers: {
        "Authorization": `Bearer ${token}` // Fixed header syntax
      },
    });
    const newPosts = posts.filter((el) => el._id !== id); // Fixed comparison operator
    setPosts(newPosts); // Update state with new posts
  }

  // This method will map out the posts in the table
  function renderPosts() { // Changed to a separate function to improve readability
    return posts.map((post) => {
      return (
        <Post 
          post={post} 
          deletePost={() => deletePost(post._id)} 
          key={post._id} 
        />
      );
    });
  }

  return (
    <div className="container">
      <h3 className="header">APDS Notice Board</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}> {/* Fixed style syntax */}
        <thead>
          <tr>
            <th>User</th> 
            <th>Caption</th> 
            <th>Image</th>
            <th>Actions</th> {/* Added column for actions */}
          </tr>
        </thead>
        <tbody>
          {renderPosts()} {/* Call the renderPosts function */}
        </tbody>
      </table>
    </div>
  );
}
