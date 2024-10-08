import React, { useState } from "react"; // Fixed import statement
import { useNavigate } from "react-router-dom"; // Fixed import for useNavigate

export default function Login() { // Fixed function declaration syntax
  const [form, setForm] = useState({ // Fixed useState capitalization
    name: "", // Fixed variable name
    password: "", // Corrected password initialization
  });

  const navigate = useNavigate(); // Fixed variable declaration

  // This method will update the state properties.
  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value })); // Fixed spread operator syntax
  }

  // This function will handle the submission.
  async function onSubmit(e) { // Fixed function name and parentheses
    e.preventDefault(); // Fixed method name
    // Passes the form data to the API on our backend.
    const newPerson = { ...form }; // Fixed variable declaration
    const response = await fetch("http://localhost:3005/user/login", { // Added fetch URL
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Fixed header casing and syntax
      },
      body: JSON.stringify(newPerson),
    });

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`; // Error handling
      window.alert(message);
      return;
    }

    const data = await response.json(); // Await fetch response
    localStorage.setItem("token", data.token); // Assuming the API returns a token
    setForm({ name: "", password: "" }); // Reset form fields
    navigate("/"); // Redirect after successful login
  }

  // HTML for the login page.
  return (
    <div>
      <h3>Login</h3> {/* Fixed header tags */}
      <form onSubmit={onSubmit}> {/* Fixed the method name */}
        <div className="form-group"> {/* Fixed class name */}
          <label htmlFor="name">Name</label> {/* Fixed label and added for attribute */}
          <input
            type="text"
            className="form-control" // Fixed class name
            id="name" // Fixed ID
            value={form.name} // Added value binding
            onChange={(e) => updateForm({ name: e.target.value })} // Fixed event handling
          />
        </div>
        <div className="form-group"> {/* Fixed class name */}
          <label htmlFor="password">Password</label> {/* Fixed label */}
          <input
            type="password" // Changed type to password for security
            className="form-control" // Fixed class name
            id="password"
            value={form.password} // Added value binding
            onChange={(e) => updateForm({ password: e.target.value })} // Fixed event handling
          />
        </div>
        <div className="form-group"> {/* Fixed class name */}
          <input
            type="submit"
            value="Login"
            className="btn btn-primary" // Fixed class name
          />
        </div>
      </form>
    </div>
  );
}
