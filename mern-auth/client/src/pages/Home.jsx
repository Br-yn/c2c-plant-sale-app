import React, { Component, useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import ListingList from '../components/Listings-list';


export default function Home() {


    return(
        <div>
            <div>
               <Navbar />
               <Categories />
               <ListingList />
            </div>
        </div>
    )
}
