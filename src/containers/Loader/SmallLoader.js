import React from 'react'
import './SmallLoader.scss'

const SmallLoader = () => {
    return(
        <div className="Loader-sm">
            <div className="lds-ring-sm"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default SmallLoader