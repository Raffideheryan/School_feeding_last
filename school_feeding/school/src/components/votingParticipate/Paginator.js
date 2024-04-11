import React from "react";

export const Paginator = ({ postsPerPage, totalPosts ,paginate}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return <li key={number}>
            <a href="#" onClick={()=>paginate(number)}>{number}</a>
          </li>;
        })}
      </ul>
    </nav>
  );
};
