import React,{useState,useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
// import { DefaultPlayer as Video } from "react-html5video";
import ReactVidioPlayer from './../home/ReactVidioPlayer';
import video from "./video.mp4";
import './VotingParticipate.css'


export const Posts = ({ posts, loading,setCheckSchool,currentPage }) => {
  const [voting,setVoting] = useState(null)
// context 

const { userState, userActions } = useContext(UserContext);


  const onCLickVoting = (index,name)=>{
    setVoting(index);
    setCheckSchool(false)
    userActions.setVotingSchool(name)
  }

  useEffect(()=>{
    setVoting(null)
    setCheckSchool(true)
    userActions.setVotingSchool("")

  },[currentPage])

  if (loading) {
    return <h2>Loading...</h2>;
  }


  return (
    <div className="posts">
      {posts.map((post,index) => {
        return (
          <div key={post.id} className="post">
            <div className="post-video">
            <ReactVidioPlayer videoPath={video} />
            </div>
            <div className="post-voting">
              <div className="voting-checkbox">
                <span className={`voting-circle ${voting === index ? "active" : ""}`} onClick={()=>onCLickVoting(index,post.name)}></span>
                <span className="voting-school">Դպրոց 1</span>
              </div>
              <div className="voting-percent">
                <div className="voting-line">
                  <span className="voting-green-line"></span>
                </div>
                <div className="voting-digit">
                  <span className="voting-text">80%</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
