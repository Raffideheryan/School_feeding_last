import React,{useState,useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
// import { DefaultPlayer as Video } from "react-html5video";
import ReactVidioPlayer from '../home/ReactVidioPlayer';
import video from "./video.mp4";
import './VotingParticipate.css'


export const Posts = ({ posts, loading,setCheckSchool,currentPage,setPostId,setChangeDigit,setVoting,voting }) => {
  // const [voting,setVoting] = useState(null)
// context 

const { userState, userActions } = useContext(UserContext);
const [allCount,setAllCount] = useState(0)

  const onCLickVoting = (index,id,name,vote_count)=>{
    setVoting(index);
    setCheckSchool(false)
    userActions.setVotingSchool(name)
    setPostId(id)
    setChangeDigit(id)
  }


  useEffect(()=>{
    setVoting(null)
    setCheckSchool(true)
    userActions.setVotingSchool("")

  },[currentPage])

  if (loading) {
    return <h2>Տվյալների բեռնում...</h2>;
  }
let b = 0;
let a  = posts.map((i)=>{
    b+=i.vote_count;
  })


  return (
    <>
    <div className="posts">
      {posts.map((post,index) => {

        return (
          <div key={post.id} className="post">
            <div className="post-video">
            <ReactVidioPlayer videoPath={post.video} />
            </div>
            <div className="post-voting">
              <div className="voting-checkbox">
                <span className={`voting-circle ${voting === index ? "active" : ""}`} onClick={()=>onCLickVoting(index,post.id,post.school_name,post.vote_count)}></span>
                <span className="voting-school">{post.school_name}</span>
                <span className="voting-count">{post.vote_count}</span>

              </div>
            </div>
          </div>
        );
      })}
    </div>
      <div className="countAll">
        <p>Ընդհանուր քանակ {b}</p>
      </div>

    </>
  );
};
