import React, { Component } from 'react';

export default class Categories extends Component {
    render(){
        return(
            <div>
            <div className="sidebar-container">
                <h3 className="sidebar-header">Categories</h3>
                    <ul className="sidebar-navigation">
                    <li><a href="#" className="plant-category">Alocasias</a></li>
                    <li><a href="#" className="plant-category">Begonias</a></li>
                    <li><a href="#" className="plant-category">Cacti</a></li>
                    <li><a href="#" className="plant-category">Calatheas</a></li>
                    <li><a href="#" className="plant-category">Monsteras</a></li>
                    <li><a href="#" className="plant-category">Pothos</a></li>
                    <li><a href="#" className="plant-category">Stenanthes</a></li>
                    <li><a href="#" className="plant-category">Succulents</a></li>
                    <li><a href="#" className="plant-category">Accessories</a></li>
                    <li><a href="#" className="plant-category">Classes/ services</a></li>
                    </ul>
            </div>
            </div>
        )
    }
}