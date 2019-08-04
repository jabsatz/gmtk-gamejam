import React from 'react'


export default function Mute({onMute, isMuted}) {
    return (
        <div className="mute-wrapper" onClick={onMute}>
            <div className="icons8-speaker"></div>
            {isMuted ? 'Unmute' : 'Mute'}
        </div>
    )
}
