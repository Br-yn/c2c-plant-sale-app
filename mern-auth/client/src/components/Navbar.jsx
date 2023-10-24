import { Link } from 'react-router-dom'
import React, { Component, useState } from 'react';
import ToggleMenu from './Toggle-menu';


export default class NavBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isMenuOpen: false,
      };
    }
  
    toggleMenu = () => {
      this.setState((prevState) => ({
        isMenuOpen: !prevState.isMenuOpen,
      }));
    };
  
    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/home">
              Trade Botanics
            </a>
            <button
              className="navbar-toggler"
              type="button"
              onClick={this.toggleMenu} // Toggle the menu on button click
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item" id="homeicon">
                  <a className="nav-link" href="/home">
                    <div className="icon-circle">
                      <i className="bi bi-house"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item" id="searchicon">
                  <a className="nav-link" href="#">
                    <div className="icon-circle">
                      <i className="bi bi-search"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item" id="hearticon">
                  <a className="nav-link" href="#">
                    <div className="icon-circle">
                      <i className="bi bi-heart"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item" id="plusicon">
                  <a className="nav-link" href="/create">
                    <div className="icon-circle">
                      <i className="bi bi-plus"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item" id="bellicon">
                  <a className="nav-link" href="#">
                    <div className="icon-circle">
                      <i className="bi bi-bell"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item" id="clockicon">
                  <a className="nav-link" href="#">
                    <div className="icon-circle">
                      <i className="bi bi-clock-history"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item" id="basketicon">
                  <a className="nav-link" href="#">
                    <div className="icon-circle">
                      <i className="bi bi-basket"></i>
                    </div>
                  </a>
                </li>
                <li className="nav-item" id="listicon">
                  <a className="nav-link" href="#">
                    <div className="icon-circle">
                      <i className="bi bi-list"></i>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            {/* Render the ToggleMenu component */}
            <ToggleMenu
              isOpen={this.state.isMenuOpen}
              onClose={this.toggleMenu}
            />
          </div>
        </nav>
      );
    }
  }