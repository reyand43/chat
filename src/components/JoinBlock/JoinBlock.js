import React from 'react'
import socket from '../../socket'

function JoinBlock(){
    return(
        <div className="join-block">
       <form>
       <input type="text"
       placeholder="Room id"/>
        <input type="text"
       placeholder="your name"/>
       <button>Enter</button>
       </form>
     </div>
    )
}

export default JoinBlock