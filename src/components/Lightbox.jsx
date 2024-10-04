import { X } from 'lucide-react';
import React from 'react'

const Lightbox = ({selectedPhoto, closeLightbox}) => {


  return (
    <div>{selectedPhoto && (
        <div className='lightbox-container'>
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <X className='lightbox-close' color='#f2f2f2'/>
            <img
              src={selectedPhoto.urls.full}
              alt={selectedPhoto.alt_description}
              className="lightbox-img"
            />
            <div className="lightbox-details">
              <h2>{selectedPhoto.alt_description || 'Untitled'}</h2>
              <p>Photographer: {selectedPhoto.user.username}</p>
              <p>Location: {selectedPhoto.user.location || 'Unknown'}</p>
            </div>
            <button className="close-button" onClick={closeLightbox}>
              Close
            </button>
          </div>
        </div>
      </div>
      )}</div>
  )
}

export default Lightbox;