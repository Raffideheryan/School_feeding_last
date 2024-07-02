import React from "react"
import {DefaultPlayer as Video} from "react-html5video"
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
