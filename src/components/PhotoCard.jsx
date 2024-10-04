import { Camera } from 'lucide-react'
import React from 'react'

const PhotoCard = ({photo, openLightbox}) => {
  return (
    <div
            key={photo.id}
            className="photo-card"
            onClick={() => openLightbox(photo)}
          >
            <img
              width={200}
              height={300}
              src={photo.urls.raw}
              alt={photo.alt_description}
              className='photo'
            />
            <div className="photo-details">
              <p>Title: <br />{photo.alt_description || 'Untitled'}</p>
              <p><span className='photographer-name'>Photographer <Camera style={{paddingLeft: "5px"}}/>: </span> {photo.user.name}</p>
            </div>
          </div>
  )
}

export default PhotoCard