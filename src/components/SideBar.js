import React from 'react'
import { X } from 'react-bootstrap-icons';

function SideBar({showSidebar, toggleSidebar}) {
  function onClickOutside(){
      if(showSidebar)
      {
          toggleSidebar()
      }
  } 
  return (
    <>
      <div className={showSidebar ? 'overlay' : ''} onMouseDown={onClickOutside}/>
      <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
          <div className='text-align-left' onClick={() => toggleSidebar()}><X size={80} color='#cecece'/></div>
      </div>
    </>
  )
}

export default SideBar