import React, { useContext,useState,useEffect } from "react";
import "./Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../UserContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


export const Register = () => {
  const { userState, userActions } = useContext(UserContext);
const [show, setShow] = useState(false);
const navigate = useNavigate();


useEffect(()=>{
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  userActions.setEmail("")
  userActions.setPassword("")
  userActions.setComfirmPassword("")
  userActions.setName("")
  userActions.setPhone("")
  userActions.setErrorPassword(false);
  userActions.setErrorEmail(false);
},[])

const gotoRegister = (e)=>{
  e.preventDefault()
  userActions.setEmail("")
  userActions.setPassword("")
  navigate("/login")

}

  return (
    <div className="register">
      <div className="register-all">
        <h1>Ստեղծել հաշիվ</h1>
        <form onSubmit={userActions.handleSubmit}>
          <div className="name">
            <label>Անուն</label>
            <input
              type="text"
              placeholder="Մուտքագրեք Ձեր Անունը"
              onChange={(e) => userActions.setName(e.target.value)}
              value={userState.username}
              className={userState.errorName?'error':''}

            />
          </div>
          <div className="email">
            <label>Էլեկտրոնային հասցե</label>
            <input
              type="text"
              placeholder="Մուտքագրեք Ձեր էլեկտրոնային Հասցեն"
              onChange={(e) => userActions.setEmail(e.target.value)}
              value={userState.email}
              className={userState.errorEmail?'error':''}

            />
          </div>
          <div className="phone">
            <label>Հեռախոսահամար <small>Օրինակ: 094555555</small></label>
            <input
              type="tel"
              placeholder="Մուտքագրեք Ձեր Հեռախոսահամարը"
              onChange={(e) => userActions.setPhone(e.target.value)}
              value={(userState.phone)}
              className={userState.errorPhone?'error':''}

            />
          </div>
          <div className={"password"}>
          <label>Գաղտնաբառ  </label>

            <input
              type={show?'text':'password'}
              placeholder="Մուտքագրեք Ձեր Գաղտնաբառը"
              onChange={(e) => userActions.setPassword(e.target.value)}
              value={userState.password}
              className={userState.errorPassword?'error':''}
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
              placeholder="Մուտքագրեք Ձեր Գաղտնաբառը "
              onChange={(e) => userActions.setComfirmPassword(e.target.value)}
              value={userState.comfirmPassword}
              className={userState.errorComfirmPassword?'error':''}


            />

            
          </div>

          <button type={"submit"}>Գրանցվել</button>
        </form>
        <div className="signin">
          <p>ՈՒնեք հաշիվ ? <a href="#" onClick={gotoRegister}>Մուտք</a> </p>
        </div>
      </div>
    </div>
  );
};
