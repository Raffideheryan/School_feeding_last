import React,{useEffect} from "react";
import "./VotingParticipate.css"

export const Paginator = ({ postsPerPage, totalPosts ,paginate,currentPage}) => {
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    if(pageNumbers.length<4)
    pageNumbers.push(i);
  }

  // useEffect(()=>{
  //   window.scrollTo(0,1700);
  //   // setCheckSchool(true)

  // },[currentPage])


  return (
    <nav  className="pagination">
      <ul>
        {pageNumbers.map((number) => {
          return <li key={number} href={"participate"} onClick={()=>paginate(number)}  className={number === currentPage ? "active" : ""}>
           {number}
          </li>;
        })}
      </ul>
    </nav>
  );
};
