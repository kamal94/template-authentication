import React from 'react';

const Authentication: React.FC = () => {
    function handleClick() {
        console.log('user clicked login');
    }
    return (
        <div>
           <div className="g-signin2" onClick={handleClick}></div>
        </div>
    )
}
export default Authentication;