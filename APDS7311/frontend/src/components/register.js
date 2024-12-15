import React, { useState } from "react"; // Corrected import statement
import { useNavigate } from "react-router-dom"; // Fixed import for useNavigate

export default function Register() { // Fixed function declaration syntax
  const [form, setForm] = useState({ // Fixed useState capitalization
    name: "",
    password: "", // Fixed closing quote
  });

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => ({ ...prev, ...value })); // Fixed spread operator syntax
  }

  // This function will handle the submission.
  async function onSubmit(e) { // Fixed function name and parentheses
    e.preventDefault(); // Fixed the method name
    // when a post request is sent to the create URL, we'll create a new user in the database.
    const newPerson = { ...form }; // Fixed variable declaration
    try {
      await fetch("http://localhost:3005/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
      // Reset the form after successful submission
      setForm({ name: "", password: "" });
      navigate("/"); // Corrected navigate to use a string
    } catch (error) {
      window.alert(error); // Fixed error handling
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={onSubmit}> {/* Fixed the method name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name} // Fixed the value assignment
            onChange={(e) => updateForm({ name: e.target.value })} // Fixed the method name
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label> {/* Fixed label closing tag */}
          <input
            type="password" // Changed to password type for better security
            className="form-control"
            id="password"
            value={form.password} // Fixed the value assignment
            onChange={(e) => updateForm({ password: e.target.value })} // Fixed the method name
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
