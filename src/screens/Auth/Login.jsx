// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Card, Button } from "react-bootstrap";
// import colors from "../../assets/css/colors.js";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = () => {
//     // if (email === "admin@example.com" && password === "admin123") {
//     //   localStorage.setItem("auth", "true");
//     //   navigate("/dashboard");
//     // } else {
//     //   setError("Invalid credentials. Please try again.");
//     // }

//     navigate("/dashboard");
//   };

//   return (
//     <Container
//       fluid
//       style={{
//         backgroundColor: colors.backgroundColor,
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Card
//         style={{
//           padding: "30px", // Increased padding
//           borderRadius: "10px",
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//           minWidth: "400px", // Increased width
//           maxWidth: "500px", // Ensuring it doesn't get too wide
//         }}
//       >
//         <h3
//           style={{
//             color: colors.primary_black,
//             textAlign: "center",
//             marginBottom: "25px",
//           }}
//         >
//           Admin Login
//         </h3>
//         {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "12px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//           }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "10px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//           }}
//         />
//         <Button
//           style={{
//             backgroundColor: colors.btncolor,
//             borderColor: colors.btncolor,
//             width: "100%",
//             marginTop: 25,
//             // paddingTop: 10,
//             // paddingBottom: 10,
//             padding: 12,
//           }}
//           onClick={handleLogin}
//         >
//           Login
//         </Button>
//       </Card>
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import colors from "../../assets/css/colors.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // try {
    //   const response = await fetch("https://stage.suniyenetajee.com/api/v1/web/login/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username: email, password }),
    //   });

    //   const data = await response.json();

    //   console.log("response===>", response);

    //   if (response.ok) {
    //     localStorage.setItem("auth", "true");
    //     localStorage.setItem("token", data.token); // Assuming API returns a token
    //     navigate("/dashboard");
    //   } else {
    //     setError(data.message || "Invalid credentials. Please try again.");
    //   }
    // } catch (error) {
    //   setError("Something went wrong. Please try again later.");
    // }
    navigate("/dashboard");
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: colors.backgroundColor,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          minWidth: "400px",
          maxWidth: "500px",
        }}
      >
        <h3
          style={{
            color: colors.primary_black,
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Admin Login
        </h3>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <Button
          style={{
            backgroundColor: colors.btncolor,
            borderColor: colors.btncolor,
            width: "100%",
            marginTop: 25,
            padding: 12,
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
