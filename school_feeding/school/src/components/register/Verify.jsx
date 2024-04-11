


// import React, { useEffect, useState } from "react";
// import "./Verify.css";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export const Verify = () => {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const navigate = useNavigate();

//   const [seconds, setSeconds] = useState(60);

// //   verify

// const[verify,setVerify] = useState('555555')


// useEffect(() => {
//     fetch('harcum em anum ev stanum 6 nishani tivy')
//         .then(response => response.json())
//         .then(data => setVerify(data.num));

// }, [verify]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//         setSeconds(prevSeconds => {
//           if (prevSeconds === 0) {
//             clearInterval(interval);
//             return 0;
//           }
//           return prevSeconds - 1;
//         });
//       }, 1000);
  
      
//       return () => clearInterval(interval);
//     }, [seconds]);



//   const validation = () => {
//     let inProcees = true;
//     if (otp.join("").length !== 6) {
//       toast.warning("Վերիֆիկացման կոդը սխալ է․․․");
//       inProcees = false;
//     } else {
//       inProcees = true;
//     }

//     return inProcees;
//   };

//   const handleChange = (e, index) => {
//     if (isNaN(e.target.value)) {
//       return false;
//     }

//     setOtp([...otp.map((data, i) => (i === index ? e.target.value : data))]);

//     if (e.target.value && e.target.nextSibling) {
//       e.target.nextSibling.focus();
//     }
//     if (
//       e.target.value === "" &&
//       e.nativeEvent.inputType === "deleteContentBackward" &&
//       e.target.previousSibling
//     ) {
//       e.target.previousSibling.focus();
//     }
//   };

//   const onclickVerification = () => {
//     let num = otp.join("");
//     let obj = {
//         number: num,
//       };
//     if (validation() && verify===num) {
//         toast.success("Հաջողվեց");
//         navigate("/login");

//     //   fetch("http://127.0.0.1:8000/info/users/", {
//     //     method: "POST",
//     //     headers: { "content-type": "application/json" },
//     //     body: JSON.stringify(obj),
//     //   })
//     //     .then((res) => {
//     //       if (res.ok) {
//     //         toast.success("Հաջողվեց");
//     //         navigate("/login");
//     //       }
//     //     })
//     //     .catch((err) => {
//     //       toast.warning("Չհաջողվեց");
//     //     });
//     }else{
//         toast.warning("Վերիֆիկացման կոդը սխալ է․․․")
//     }
//   };

//   return (
//     <div className="verify">
//       <h1>Վերիֆիկացրեք Ձեր Հաշիվը</h1>
//       <div className="otp-area">
//         {otp.map((data, i) => {
//           return (
//             <input
//               type="text"
//               maxlength="1"
//               oninput="this.value=this.value.replace(/[^0-9]/g,'');"
//               value={data}
//               onChange={(e) => handleChange(e, i)}
//             />
//           );
//         })}

//         <span>{seconds}</span>
//       </div>
//       <button onClick={onclickVerification}>Ուղարկել</button>
//     </div>
//   );
// };
