import { useContext, useRef } from "react";

import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/AuthContext";

const ProfileForm = () => {
  const { token } = useContext(AuthContext);

  const passwordRef = useRef();
  const hadnlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDDTATv0YiM4tUTMW_am_sGPbArW4ZmUOk",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            password: passwordRef.current.value,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error updating password");
      }
      alert("Password updated successfully");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  return (
    <form className={classes.form} onSubmit={hadnlePasswordChange}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={passwordRef}
          minLength={"6"}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
