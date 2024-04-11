import React,{useState} from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Touch = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
  
    const [errorName, setErrorName] = useState(true);
    const [errorEmail, setErrorEmail] = useState(true);
    const [errorMessage, setErrorMessage] = useState(true);
    const [errorPhone, setErrorPhone] = useState(true);

  const navigate = useNavigate();

  
    const validationTouch = () => {
      let isproccesd = true;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        email
      );
      const usernameRegexArmenianLetter = /^[\u0531-\u0556\u0561-\u0587]+$/u.test(
        name
      );
      const phoneRegex =
      /^(091|097|096|099|043|077|093|094|098|055|095|041|033|044)\d{6}$/.test(
        phone
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

      if (phone === null || phone === "") {
        isproccesd = false;
        toast.warning(" Հեռախոսահմար դաշտը պարտադիր է․․․ ");
        setErrorPhone(false);
      } else if (!phoneRegex) {
        isproccesd = false;
        toast.warning(
          " Հեռախոսահամարը պետք է լինի oրինակին համապատասխան: 094555657"
        );
        setErrorPhone(false);
      } else {
        setErrorPhone(true);
      }
  
      if (message.length >= 300) {
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
        phone,
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
                  placeholder="Մուտքագրեք Ձեր Անունը"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className={errorName ? "" : "error"}
                />
              </div>
              <div className="email">
                <label>Էլեկտրոնային հասցե</label>
                <input
                  type="text"
                  placeholder="Մուտքագրեք Ձեր Էլեկտրոնային Հասցեն"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={errorEmail ? "" : "error"}
                />
              </div>
              <div className="phone">
            <label>Հեռախոսահամար <small>Օրինակ: 094555555</small></label>
            <input
              type="tel"
              placeholder="Մուտքագրեք Ձեր Հեռախոսահամարը"
              onChange={(e) => setPhone(e.target.value)}
              value={(phone)}
              className={errorPhone?'':'error'}

            />
          </div>

              <div className="textarea">
                <textarea
                  placeholder="Մուտքագրեք Ձեր Հաղորդագրությունը`"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className={errorMessage?"":'error'}
                ></textarea>
              </div>

              <button type={"submit"}>Ուղարկել</button>
            </form>

            <div className='sendmessages'>
              <p>Կարող եք նաև կապ հաստատել մեզ հետ <a href="mailto:robkocharyan20@gmail.com">aroxjaprelakerpidespan@gmail.com</a>  էլեկտրոնային հասցեով:</p>
            </div>
          </div>
        </div>
  )
}
