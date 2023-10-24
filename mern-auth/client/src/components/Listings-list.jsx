import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const Listing = props => (
    <div className="listing-table-div">
    <div className="listings-table">
    <tr>
        <td>
            {props.listing.images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index}`} />
            ))}
        </td>
        <td><Link to={`/listing/${props.listing._id}`}>{props.listing.title}</Link></td>
        <td>{props.listing.title}</td>
        <td>{props.listing.price}</td>
        <td>{props.listing.description}</td>
        <td>
            <Link to={"/edit/"+props.listing._id}>edit</Link> |
            <a href="#" onClick={() => props.deleteListing(props.listing._id)}>
                delete
            </a>
        </td>
    </tr>
    </div>
    </div>
);


export default class ListingsList extends Component{
    constructor(props) {
        super(props);

        this.deleteListing = this.deleteListing.bind(this);

        this.state = { listings: [] };
    }

componentDidMount() {
    axios.get('http://localhost:8000/listings/')
    .then(response => {
        this.setState({ listings: response.data })
    })
    .catch((error) => {
        console.log(error);
 })};


deleteListing(id) {
    axios.delete('http://localhost:8000/listings/'+id)
    .then(res => console.log(res.data));
    this.setState({
        listings: this.state.listings.filter(el => el._id !== id)
    })
}

listingList() {
    return this.state.listings.map(currentlisting =>{
        return <Listing listing={currentlisting} deleteListing={this.deleteListing} key={currentlisting._id} />
    })
}

render() {
    return (
      <div className="listing-display">
        <h2>Current Listings</h2>
        <div>
          <table className="listing-table">
            <tbody>
              {this.listingList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }}