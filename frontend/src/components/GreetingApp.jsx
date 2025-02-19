import { useState } from "react";

export default function GreetingApp() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchGreeting = async () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      setMessage("");
      return;
    }
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/greet?name=${encodeURIComponent(name)}`);
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Oops! Couldn't connect to the server. Please try again later.");
    }
  };
// structure of frontend start from here
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Greeting App</h1>
        <input
          type="text"
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button style={styles.button} onClick={fetchGreeting}>
          Get Greeting
        </button>
        {message && <p style={{ ...styles.message, color: "#16a34a" }}>{message}</p>}
        {error && <p style={{ ...styles.message, color: "#dc2626" }}>{error}</p>}
      </div>
    </div>
  );
}

// Styles by using normal css
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "16px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  input: {
    border: "1px solid #ccc",
    padding: "8px",
    width: "100%",
    borderRadius: "8px",
    marginBottom: "8px",
  },
  button: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    border: "none",
  },
  message: {
    marginTop: "16px",
  },
};
