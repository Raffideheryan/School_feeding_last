import React,{useState} from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Touch = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const [errorName, setErrorName] = useState(true);
    const [errorEmail, setErrorEmail] = useState(true);
    const [errorMessage, setErrorMessage] = useState(true);

  const navigate = useNavigate();

  
    const validationTouch = () => {
      let isproccesd = true;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
      );
      const usernameRegexArmenianLetter = /^[\u0531-\u0556\u0561-\u0587]+$/u.test(
        name
      );
    
      if (name === null || name === "") {
        isproccesd = false;
        toast.warning(" Անուն դաշտը պարտադիր է․․․ ");
        setErrorName(false);
      } else if (!usernameRegexArmenianLetter) {
        isproccesd = false;
        toast.warning(" Անուն դաշտը պետք է պարունակի միայն Հայկական տառեր...");
        setErrorName(false);
      } else if (name.length <= 2) {
        isproccesd = false;
        toast.warning(" Անուն դաշտը պետք է լինի ամենաքիչը 3 տառ...");
        setErrorName(false);
      } else {
        setErrorName(false);
      }
  
      if (email === "" || email === null) {
        toast.warning(" Էլեկտրոնային հասցեն պարտադիր է․․․ ");
        isproccesd = false;
        setErrorEmail(false);
      } else if (!emailRegex) {
        toast.warning("Էլեկտրոնային հասցեն սխալ է․․․ ");
        isproccesd = false;
        setErrorEmail(false);
      } else {
        setErrorEmail(true);
      }
  
      if (message.length >= 155) {
        toast.warning(" Ձեր հաղորդագրությունը երկար է․․․");
        isproccesd = false;
        setErrorMessage(false);
      } else {
        setErrorMessage(true);
      }
     
  
      return isproccesd;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let obj = {
        name,
        email,
        message,
      };
  
      if (validationTouch()) {
        fetch("http://127.0.0.1:8000/info/messages/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            toast.success("Հաղորդագրությունը հաջողությամբ ուղարկվել է...");
            navigate("/");
          })
          .catch((err) => {
            toast.warning("Հաղորդագրությունը չի ուղարկվել...");
          });
      }
    };
  
  
  return (
    <div className="touch">
              <a href="./" className='back'>Հետ</a>

          <div className="touch-div">
            <h2>Կապ հաստատել</h2>
            <div className="line"></div>

            <form onSubmit={handleSubmit}>
              <div className="name">
                <label>Անուն</label>
                <input
                  type="text"
                  placeholder="Անուն*"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={errorName ? "" : "error"}
                />
              </div>
              <div className="email">
                <label>Էլեկտրոնային հասցե</label>
                <input
                  type="text"
                  placeholder="Էլ-փոստ․․․"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={errorEmail ? "" : "error"}
                />
              </div>

              <div className="textarea">
                <textarea
                  placeholder="Ձեր հաղորդագրությունը` պարտադիր նշելով Ձեր հեռախոսահամարը"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className={errorMessage?"":'error'}
                ></textarea>
              </div>

              <button type={"submit"}>Ուղարկել</button>
            </form>
          </div>
        </div>
  )
}
