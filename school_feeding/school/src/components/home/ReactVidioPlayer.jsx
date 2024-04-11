import React from "react"
import {DefaultPlayer as Video} from "react-html5video"
import introVideo from "../../assets/videos/test.avi"
import videi2 from "../../assets/videos/test2.mp4"
import 'react-html5video/dist/styles.css';

export default function ReactVidioPlayer ({videoPath}){
  return  (
    <div>
       <Video autoplay loop>
          <source src={videoPath} type="video/webm"/>
       </Video>
    </div>
  )
}
