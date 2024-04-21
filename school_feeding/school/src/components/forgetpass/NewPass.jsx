import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./../../UserContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const NewPass = () => {
  const { userState, userActions } = useContext(UserContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }, []);

  return (
    <div className="register login">
      <div className="register-all">
        <h1>Փոխեք Գաղտնաբառը</h1>
        <form onSubmit={userActions.handleSubmitPasswords}>
          <div className={"password"}>
            <label>Գաղտնաբառ</label>

            <input
              type={show ? "text" : "password"}
              placeholder="Մուտքագրեք նոր գաղտնաբառը"
              onChange={(e) => userActions.setPassword(e.target.value)}
              value={userState.password}
              className={userState.errorPassword ? "error" : ""}
            />

            {show ? (
              <IoMdEye onClick={() => setShow(false)} />
            ) : (
              <IoMdEyeOff onClick={() => setShow(true)} />
            )}
          </div>
          <div className="password">
            <label>Հաստատեք գաղտնաբառը</label>
            <input
              type="password"
              placeholder="Մուտքագրեք նոր գաղտնաբառը"
              onChange={(e) => userActions.setComfirmPassword(e.target.value)}
              value={userState.comfirmPassword}
              className={userState.errorComfirmPassword ? "error" : ""}
            />
          </div>

          <button type={"submit"} onClick={userActions.handleSubmitPasswords}>
            Հաստատել
          </button>
          {/* <a href="">Back</a> */}
        </form>
      </div>
    </div>
  );
};
