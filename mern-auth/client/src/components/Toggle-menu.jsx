import React from 'react';

const ToggleMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`toggle-menu ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/#">Search</a></li>
        <li><a href="/#">Favourites</a></li>
        <li><a href="/create">Add listing</a></li>
        <li><a href="/#">Notifications</a></li>
        <li><a href="/#">Transaction history</a></li>
        <li><a href="/#">Your cart</a></li>
        <li><a href="/#">Account</a></li>
        {/* Add more menu items as needed */}
      </ul>
      <button onClick={onClose} className="close-button">Close</button>
    </div>
  );
};

export default ToggleMenu;