import React, { Component } from 'react';
import NavBar from '../components/Navbar';
import axios from 'axios';

export default class CreateListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      price: '',
      description: '',
      images: [],
      currentImageIndex: 0,
    };
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  onChangePrice = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onImageUpload = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      this.setState((prevState) => ({
        images: [...prevState.images, imageFile],
      }))
    }
  };

  onImageDelete = (index) => {
    this.setState((prevState) => {
      const images = [...prevState.images];
      images.splice(index, 1);
      const currentImageIndex =
        prevState.currentImageIndex >= images.length
          ? images.length - 1
          : prevState.currentImageIndex;
      return { images, currentImageIndex };
    });
  };

  onNextImage = () => {
    this.setState((prevState) => ({
      currentImageIndex: (prevState.currentImageIndex + 1) % prevState.images.length,
    }));
  };

  onPrevImage = () => {
    this.setState((prevState) => ({
      currentImageIndex:
        (prevState.currentImageIndex - 1 + prevState.images.length) % prevState.images.length,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('price', this.state.price);
    formData.append('description', this.state.description);

    this.state.images.forEach((image) => {
      formData.append("images", image);
      
    });

    axios.post('http://localhost:8000/listings/add', formData)
      .then(({ data }) => {
        console.log('Listing created!', data);
        window.location = '/';
      })
      .catch(error => {
        console.error('Error creating Listing :(', error);
      });
  };

  render() {
    const { images, currentImageIndex } = this.state;
    return (
      <div>
        <NavBar />
        <div className="full-create-screen">
          <div className="create-container">
            <h3>Create New Listing</h3>
            <form encType="multipart/form-data" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                name="title"
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
                  name="price"
                  type="number"
                  required
                  className="form-control"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                ></input>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  name ="description"
                  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <input
                  name="images"
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
                    images.map((image, index) => (
                      <div className="slideshow-image" key={index}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                        />
                        {/* Delete button */}
                        <button
                          onClick={() => this.onImageDelete(index)}
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
              </div>
              <div className="form-group">
                <button className="submit-listing-button" type="submit">Post listing</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
