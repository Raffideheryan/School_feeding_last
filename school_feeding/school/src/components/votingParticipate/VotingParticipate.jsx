import React,{ useEffect,useState } from 'react';
import "./VotingParticipate.css";
import { Posts } from './Posts';
import { Paginator } from './Paginator';



export const VotingParticipate = () => {
    const[posts,setPosts] = useState([]);
    const[loadin,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage]=useState(4);

    useEffect(()=>{
      const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://api.slingacademy.com/v1/sample-data/photos');
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
console.log(data.photos);

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
  return (
    <div className='votingParticipate'>
      <h1>My blog</h1>
      <Posts posts={currentPosts} loading={loadin} />
      <Paginator postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  )
}
