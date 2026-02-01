import { Link } from "react-router";

function NotFound() {
  const styles = {
    container: {
      textAlign: "center",
      padding: "80px 20px",
      color: "#fff",
    },
    title: {
      fontSize: "72px",
      marginBottom: "20px",
    },
    message: {
      fontSize: "18px",
      marginBottom: "30px",
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
      fontWeight: "bold",
    },
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>
        The page that you are looking for does not exist
      </p>
      <Link to="/" style={styles.link}>
        ⬅️ Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
