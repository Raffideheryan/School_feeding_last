import React, { useContext, useEffect } from "react";
import "./ForgetPass.css";
import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";

export const ForgetPass = () => {
  const { userState, userActions } = useContext(UserContext);

  const onClickNewPassword = () => {
    const email = localStorage.getItem("resetemail");

    let obj = {
      email: JSON.parse(email),
    };
    if (obj.email) {
      fetch("http://127.0.0.1:8000/api/forget_password/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Ստուգեք Ձեր Էլեկտրոնային Հասցեն");
          } else if (res.status === 400) {
            toast.warning(
              "Գրեք համակարգում արդեն գրանցված  եվ վերիֆիկացում անցած Էլեկտրոնային հասցե"
            );
          }
        })
        .catch((err) => {
          toast.warning("Չհաջողվեց");
        });
    } else {
      toast.warning("Խնդրում ենք լրացրեք դաշտը  եվ սեղմեք ուղարկել");
    }
  };
  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("resetemail");
  }, []);
  return (
    <div className="register login">
      <div className="register-all">
        <h1>Մոռացե՞լ եք գաղտնաբառը</h1>
        <form onSubmit={userActions.handleSubmitForgetPass}>
          <div className="email">
            <label>Էլեկտրոնային հասցե</label>
            <input
              type="text"
              placeholder="Մուտքագրեք Ձեր Էլեկտրոնային Հասցեն"
              onChange={(e) => userActions.setEmail(e.target.value)}
              value={userState.email}
              className={userState.errorEmail ? "error" : ""}
            />
          </div>

          <button type={"submit"}>Ուղարկել</button>
          {/* <a href="">Back</a> */}
        </form>
        <div className="signin">
          <p>
            Փորձեք կրկին{" "}
            <a href="#" onClick={onClickNewPassword}>
              Ուղարկել
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
