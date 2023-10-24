import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    // Fetch listing details based on the ID
    axios.get(`http://localhost:8000/listings/${id}`)
      .then(response => {
        setListing(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    const newComment = {
      id: Date.now(), // A basic way to generate a unique ID
      author: 'User123', // Replace with actual user information or use authentication
      text: comment,
    };

    setComments([...comments, newComment]);
    setComment('');
  };

  const handleEditComment = (commentId) => {
    setEditingComment(commentId);
  };

  const handleSaveEditComment = (commentId, newText) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, text: newText };
      }
      return comment;
    });
    setComments(updatedComments);
    setEditingComment(null);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>No data available.</div>;
  }

  return (
    <div className="listing-detail">
      <div className="listing-left">
      <h3>{listing.title}</h3>
      <p>${listing.price}</p>
      <p>{listing.description}</p>
      {listing.images.map((image, index) => (
        <img
          key={index}
          src={`/listings/${image}`}
          alt={`Image ${index}`}
        />
      ))}
      </div>
      
      {/* Comment Section */}
      <div className="comment-section">
        <h4>Comments</h4>
        <textarea
          rows="4"
          placeholder="Add your comment"
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={comment.id} className="comment">
              {editingComment === comment.id ? (
                <div>
                  <textarea
                    rows="4"
                    value={comment.text}
                    onChange={(e) => handleSaveEditComment(comment.id, e.target.value)}
                  />
                  <button onClick={() => handleSaveEditComment(comment.id, comment.text)}>Save</button>
                </div>
              ) : (
                
                <div>
                  <p>{comment.text}</p>
                  <p>By: {comment.author}</p>
                  <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
