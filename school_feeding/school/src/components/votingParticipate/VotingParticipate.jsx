import React, { useContext, useEffect, useState } from "react";
import "./VotingParticipate.css";
import { Posts } from "./Posts";
import { Paginator } from "./Paginator";
import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';

export const VotingParticipate = () => {
  // Context

  const { userState, userActions } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [checkSchool, setCheckSchool] = useState(true);

  const navigate = useNavigate();


  // number partisipate
  const [digit, setChangeDigit] = useState();
  // post ID
  const [postId, setPostId] = useState("");
  // 4 page check
  // voting circle
  const [voting, setVoting] = useState(null);

  // context
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://aroxj_aprelakerpi_despan.schoolfeeding.am/info/items/"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const indefOfLastPost = currentPage * postsPerPage;
  const indefOfFirstPost = indefOfLastPost - postsPerPage;

  const currentPosts = posts.slice(indefOfFirstPost, indefOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addNumber = () => {
    const updatedPosts = posts.map((post) => {
      if (post.id === digit) {
        return { ...post, vote_count: post.vote_count + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleButtonClicke = (e) => {
    e.preventDefault();
    setVoting("");

    const userId = localStorage.getItem("userId");
    setLoading(true);

    if (currentPage === 1) {
      const obj = {
        item: `${postId}`,
        user: userId,
      };
      const storedEmail = localStorage.getItem("email");
      fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/info/votes/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          const data = res.json();
          if (res.ok && storedEmail) {
            addNumber();
            setLoading(false);

            toast.success(
              `Դուք քվեարկել եք ${userState.votingSchool} դպրոցի օգտին`
            );
            setPostId("");
          } else {
            return data;
          }
        })
        .then((data) => {
          if (data.error === "User has already voted.") {
            toast.warning(
              "Դուք չեք կարող քվեարկել մեկ անգամից ավել նույն օգտահաշվով"
            );
            navigate('/')

          } else if (data.error === "User ID and item ID are required.") {
            toast.warning("Մուտք գործեք համակարգ քվեարկելու համար");
            navigate('/login')
          }
        })
        .catch((err) => {
          // toast.warning("Չհաջողվեց");
        });
    } else if (currentPage === 2) {
      const obj = {
        item: `${postId}`,
        user: userId,
      };
      const storedEmail = localStorage.getItem("email");

      fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/info/votes2/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          const data = res.json();
          if (res.ok && storedEmail) {
            setLoading(false);
            addNumber();
            toast.success(
              `Դուք քվեարկել եք ${userState.votingSchool} դպրոցի օգտին`
            );
            setPostId("");
          } else {
            return data;
          }
        })
        .then((data) => {
          if (data.error === "User has already voted.") {
            toast.warning(
              "Դուք չեք կարող քվեարկել մեկ անգամից ավել նույն օգտահաշվով"
            );
          } else if (data.error === "User ID and item ID are required.") {
            toast.warning("Մուտք գործեք համակարգ քվեարկելու համար");
          }
        })
        .catch((err) => {
          // toast.warning("Չհաջողվեց");
        });
    } else if (currentPage === 3) {
      const obj = {
        item: `${postId}`,
        user: userId,
      };
      const storedEmail = localStorage.getItem("email");

      fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/info/votes3/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          const data = res.json();
          if (res.ok && storedEmail) {
            setLoading(false);

            addNumber();
            toast.success(
              `Դուք քվեարկել եք ${userState.votingSchool} դպրոցի օգտին`
            );
            setPostId("");
          } else {
            return data;
          }
        })
        .then((data) => {
          if (data.error === "User has already voted.") {
            toast.warning(
              "Դուք չեք կարող քվեարկել մեկ անգամից ավել նույն օգտահաշվով"
            );
          } else if (data.error === "User ID and item ID are required.") {
            toast.warning("Մուտք գործեք համակարգ քվեարկելու համար");
          }
        })
        .catch((err) => {
          // toast.warning("Չհաջողվեց");
        });
    } else if (currentPage === 4) {
      const obj = {
        item: `${postId}`,
        user: userId,
      };
      const storedEmail = localStorage.getItem("email");

      fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/info/votes4/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          const data = res.json();
          if (res.ok && storedEmail) {
            setLoading(false);

            addNumber();
            toast.success(
              `Դուք քվեարկել եք ${userState.votingSchool} դպրոցի օգտին`
            );
            setPostId("");
          } else {
            return data;
          }
        })
        .then((data) => {
          if (data.error === "User has already voted.") {
            toast.warning(
              "Դուք չեք կարող քվեարկել մեկ անգամից ավել նույն օգտահաշվով"
            );
          } else if (data.error === "User ID and item ID are required.") {
            toast.warning("Մուտք գործեք համակարգ քվեարկելու համար");
          }
        })
        .catch((err) => {
          // toast.warning("Չհաջողվեց");
        });
    }
  };

  return (
    <div className="votingParticipate">
      <h1 id="participate">Քվեարկություն</h1>
      {currentPage === 1 && <h2>Առողջ Ապրելակերպը խաղի ձևով</h2>}
      {currentPage === 2 && (
        <h2>Համեղ և առողջարար. իմ սիրելի առողջ բաղադրատոմսը</h2>
      )}
      {currentPage === 3 && <h2>Իմ առողջ համայնքը</h2>}
      {currentPage === 4 && (
        <h2>Բացահայտելով առողջ ապրելակերպի աշխարհը. մեր հետազոտությունը</h2>
      )}
      {loading ? (
        <ClockLoader color="#51d52a" />
      ) : (
        <>
          <Posts
            posts={currentPosts}
            loading={loading}
            setCheckSchool={setCheckSchool}
            currentPage={currentPage}
            setPostId={setPostId}
            setChangeDigit={setChangeDigit}
            setVoting={setVoting}
            voting={voting}
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
        </>
      )}
    </div>
  );
};
