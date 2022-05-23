import React from 'react'
import { X } from 'react-bootstrap-icons';

function SideBar({enabled, toggleNav}) {
  return (
      <div>
      {enabled && 
      <div className='sidebar active'>
          <div className='text-align-left' onClick={() => toggleNav()}><X size={80} color='#cecece'/></div>
      </div> 
      }
    </div>
  )
}

export default SideBar