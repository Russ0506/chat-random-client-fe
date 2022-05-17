import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = (props) => {
  return (
    <div className="c-app c-default-layout" style={{backgroundColor:'#ffffff'}}>
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader {...props}/>
        <div className="c-body">
          <TheContent {...props}/>
        </div>
      </div>
    </div>
  )
}

export default TheLayout
