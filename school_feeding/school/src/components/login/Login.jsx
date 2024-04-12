import "./Login.css";
import { UserContext } from "../../UserContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import React, { useState, useContext,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { userState, userActions } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();


  useEffect(()=>{
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('resetemail');
  },[])

  const gotoRegister = (e)=>{
    e.preventDefault()
    navigate("/register")
  }

  return (
    <div className="register login">
      <div className="register-all">
        <h1>Մուտք</h1>
        <form onSubmit={userActions.handleSubmitLogin}>
          <div className="email">
            <label>Էլեկտրոնային հասցե</label>
            <input
              type="text"
              placeholder="Մուտքագրեք Ձեր էլեկտրոնային հասցեն"
              onChange={(e) => userActions.setEmail(e.target.value)}
              value={userState.email}
              className={userState.errorEmail ? "error" : ""}
            />
          </div>

          <div className={"password"}>
            <label>Գաղտնաբառ</label>

            <input
              type={show ? "text" : "password"}
              placeholder=""
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

          <div className="rememberMe">
            <div>
              <label>Հիշել </label>
              <input
                type="checkbox"
                className="remember"
                checked={userState.remember}
                onChange={(e) => userActions.setRememberMe(e.target.checked)}
              />
            </div>

            <a href="/forgetpass">Մոռացել եք գաղտնաբառը?</a>
          </div>

          <button type={"submit"} className="loginbtn">
            Մուտք
          </button>
        </form>
        <div className="signin">
          <p>
            Չունե՞ք հաշիվ<a href="#" onClick={gotoRegister}>Գրանցվել</a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
