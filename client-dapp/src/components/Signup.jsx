import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3helpers";
import { useNavigate } from "react-router-dom";
import image_link from "../assets/images/images.png";
export default function SignUp() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const [accounts, setAccounts] = React.useState(null);
  const [auth, setAuth] = React.useState(null);

  const loadAccounts = async () => {
    let { auth, accounts } = await loadBlockchainData();
    setAccounts(accounts);
    setAuth(auth);
  };

  const signUp = async () => {
    if (!username || !email || !password) {
      alert("Please fill all details");
      return;
    }
    var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      alert("Please enter a valid email address");
      return;
    }
    if (auth) {
      try {
        const res = await auth.methods.usersList(email).call();

        if (res.email !=="") {
          alert("User already exists with this email address");
          setEmail("");
          return;
        }

        await auth.methods
          .createUser(username, email, password)
          .send({ from: accounts });

        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        navigate("/");
        window.location.reload();
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.error("Smart contract not found on the current network.");
      alert("Smart contract not found on the current network.");
    }
  };

  React.useEffect(() => {
    const initialize = async () => {
      await loadWeb3();
      await loadAccounts();
    };
    initialize();
  }, []);

  return (
    <div style={rootDiv}>
      <img src={image_link} style={image} alt="geeks" />
      <input
        style={input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
      />
      <input
        style={input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <input
        style={input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button style={button} onClick={signUp}>
        Sign Up
      </button>
    </div>
  );
}

const rootDiv = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const input = {
  width: 300,
  padding: 10,
  margin: 10,
  borderRadius: 10,
  outline: "none",
  border: "2px solid grey",
  fontSize: 17,
};

const button = {
  width: 325,
  padding: 10,
  borderRadius: 10,
  margin: 10,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "#9D27CD",
  border: "none",
};

const image = {
  width: 70,
  height: 70,
  objectFit: "contain",
  borderRadius: 70,
};
