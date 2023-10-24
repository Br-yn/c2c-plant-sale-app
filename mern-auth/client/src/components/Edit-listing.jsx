import React, { Component } from 'react';
import NavBar from './Navbar';
import axios from 'axios';



export default class EditListing extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onImageDelete = this.onImageDelete.bind(this);
    this.onNextImage = this.onNextImage.bind(this);
    this.onPrevImage = this.onPrevImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '', // Use colons (:) instead of equals (=) for state properties
      price: '', // Use colons (:) instead of equals (=) for state properties
      description: '',
      images: [],
      currentImageIndex: 0, // Use colons (:) instead of equals (=) for state properties
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/listings/'+this.props.match.params.id)
    .then(response => {
            this.setState({
                image: response.data.image,
                title: response.data.title,
                price: response.data.price,
                description: response.data.description
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }
  

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onImageUpload(e) {
    // Handle image upload and add it to the images array
    const imageFile = e.target.files[0];
    this.setState((prevState) => ({
      images: [...prevState.images, imageFile],
    }));
  }

  onImageDelete(index) {
    // Handle image deletion based on index
    this.setState((prevState) => {
      const images = [...prevState.images];
      images.splice(index, 1);
      const currentImageIndex =
      prevState.currentImageIndex >= images.length
        ? images.length - 1
        : prevState.currentImageIndex;
    return { images, currentImageIndex };
  });
}

  onNextImage() {
    this.setState((prevState) => ({
      currentImageIndex:
        (prevState.currentImageIndex + 1) % prevState.images.length,
    }));
  }

  onPrevImage() {
    this.setState((prevState) => ({
      currentImageIndex:
        (prevState.currentImageIndex - 1 + prevState.images.length) %
        prevState.images.length,
    }));
  }


  onSubmit(e) {
    e.preventDefault();

    const listing = {
      title: this.state.title,
      price: this.state.price,
      images: this.state.images,
      description: this.state.description,
    };

    axios.post('/listings/update/'+this.props.match.params.id, listing)
    .then(response => {
      console.log('Listing created!', response.data);

    })
    .catch(error => {
      console.error('error creaing Lsiting :(')
    })

    

    window.location = '/';
  }

  render() {
    const { images, currentImageIndex } = this.state;
    return (
      <div>
        <NavBar />
        <div className="full-edit-screen">
          <div className="edit-container">
            <h3>Edit New Listing</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                ></input>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file"
                  onChange={this.onImageUpload}
                  accept="image/*"
                  multiple // Allow multiple image uploads
                />
                {/* Display uploaded images and provide a delete option */}
                <div className="slideshow-container">
                  {images.length === 0 ? (
                    <li className="image-placeholder">
                      <i className="bi bi-image" style={{ fontSize: '48px' }}></i>
                      <p>No images uploaded</p>
                    </li>
                  ) : (
                    images.map((image, currentImageIndex) => (
                    <div className="slideshow-image" key={currentImageIndex}>
                      <img
                        src={URL.createObjectURL(images[currentImageIndex])}
                        alt={`Image ${currentImageIndex}`}
                      />
                      {/* Delete button */}
                      <button
                        onClick={() => this.onImageDelete(currentImageIndex)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                  )}

                  {/* Left arrow button */}
                  <a className="prev" onClick={this.onPrevImage}>
                    &#10094;
                  </a>

                  {/* Right arrow button */}
                  <a className="next" onClick={this.onNextImage}>
                    &#10095;
                  </a>
                </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
              <button className="submit-listing-button"
              type="submit">Repost listing</button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
