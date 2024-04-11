import React,{ useContext, useEffect,useState } from 'react';
import "./VotingParticipate.css";
import { Posts } from './Posts';
import { Paginator } from './Paginator';
import { UserContext } from '../../UserContext';
import { toast } from 'react-toastify';



export const VotingParticipate = () => {
    const[posts,setPosts] = useState([]);
    const[loadin,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage]=useState(4);
    const[checkSchool,setCheckSchool]=useState(true);

    // context
  const { userState, userActions } = useContext(UserContext);


    useEffect(()=>{
      const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://api.slingacademy.com/v1/sample-data/photos');
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();

            setPosts(data.photos);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchPosts()
    },[]);


    const indefOfLastPost = currentPage * postsPerPage;
    const indefOfFirstPost = indefOfLastPost - postsPerPage;
  
    const currentPosts = posts.slice(indefOfFirstPost,indefOfLastPost)



    const paginate = (pageNumber)=>setCurrentPage(pageNumber)

    const handleButtonClicke = (e)=>{
      e.preventDefault();
      let obj = {
       
      };
  
        fetch("http://127.0.0.1:8000/info/users/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            if (res.ok) {
              toast.success(
                "Մուտք գործեք էլեկտրոնային հասցեն եվ անցեք վերիֆիկացում․․․"
              );
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              localStorage.setItem("name", JSON.stringify());
  
            } else if (res.status === 400) {
              toast.warning("Այս Էլ-հասցեն գոյություն ունի համակարգում․․․");
            }
          })
          .catch((err) => {
            toast.warning("Չհաջողվեց");
          });
    }
   
  return (
    <div className='votingParticipate'>
      <h1>My blog</h1>
      <Posts posts={currentPosts} loading={loadin} setCheckSchool={setCheckSchool} currentPage={currentPage} />
      <Paginator postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} />

      <div className='vote'>
        <button onClick={handleButtonClicke} className={checkSchool?"disabled":"button"} disabled={checkSchool}>Հաստատել</button>
      </div>
    </div>
  )
}
