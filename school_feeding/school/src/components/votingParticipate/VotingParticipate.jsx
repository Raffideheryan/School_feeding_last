import React, { useContext, useEffect, useState } from "react";
import "./VotingParticipate.css";
import { Posts } from "./Posts";
import { Paginator } from "./Paginator";
import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";

export const VotingParticipate = () => {
  const [posts, setPosts] = useState([]);
  const [loadin, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [checkSchool, setCheckSchool] = useState(true);

  // 4 page check

  const [check1,setCheck1] = useState(false)
  const [check2,setCheck2] = useState(false)
  const [check3,setCheck3] = useState(false)
  const [check4,setCheck4] = useState(false)

  // context
  // const { userState, userActions } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setPosts(data.results);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const indefOfLastPost = currentPage * postsPerPage;
  const indefOfFirstPost = indefOfLastPost - postsPerPage;

  const currentPosts = posts.slice(indefOfFirstPost, indefOfLastPost);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
  }
  const video = "./video.mp4";

  const handleButtonClicke = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("item",video);
    formData.append("value", 1);

    fetch("http://127.0.0.1:8000/info/votes/", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          toast.success(
            "Դուք դիմել եք X-Դպրոցի"
          );
          // localStorage.removeItem("email");
          // localStorage.setItem("name", JSON.stringify());
        } else if (res.status === 400) {
          toast.warning("Դուք չեք կարող դիմել մեկ անգամից ավել նույն օգտահաշվով");
        }
      })
      .catch((err) => {
        toast.warning("Չհաջողվեց");
      });
  };

  return (
    <div className="votingParticipate">
      <h1>My blog</h1>
      <Posts
        posts={currentPosts}
        loading={loadin}
        setCheckSchool={setCheckSchool}
        currentPage={currentPage}
      />
      <Paginator
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <div className="vote">
        <button
          onClick={handleButtonClicke}
          className={checkSchool ? "disabled" : "button"}
          disabled={checkSchool}
        >
          Հաստատել
        </button>
      </div>
    </div>
  );
};
