import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase.init.js/firebase.init";
import { useState } from "react";

const Login = () => {
  const [User, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSign = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedIn = result.user;
        console.log(loggedIn);
        setUser(loggedIn);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleGithubSign = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedIn = result.user;
        console.log(loggedIn);
        setUser(loggedIn);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {!User ? (
        <>
          <button onClick={handleGoogleSign}>Google login</button>
          <button onClick={handleGithubSign}>Github login</button>
        </>
      ) : (
        <button onClick={handleSignOut}>Sign out</button>
      )}
      {
        <div>
          <h2>Name:{User?.displayName}</h2>
          <p>email: {User?.email}</p>
          <img src={User?.photoURL} alt="" />
        </div>
      }
    </div>
  );
};

export default Login;
4;
