'use client';

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { fetchPhotos } from '../lib/unsplash';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    loadMorePhotos();
  }, []);

  const loadMorePhotos = async () => {
    const newPhotos = await fetchPhotos(page);
    if (Array.isArray(newPhotos)) {
      setPhotos([...photos, ...newPhotos]);
      setPage(page + 1);
    }
  };

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div>
      {isOpen && (
        <Lightbox
          mainSrc={photos[photoIndex].urls.full}
          onCloseRequest={() => setIsOpen(false)}
          nextSrc={photos[(photoIndex + 1) % photos.length].urls.full}
          prevSrc={photos[(photoIndex + photos.length - 1) % photos.length].urls.full}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + photos.length - 1) % photos.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % photos.length)}
        />
      )}
      <InfiniteScroll
        dataLength={photos.length}
        next={loadMorePhotos}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className="photo-item" onClick={() => openLightbox(index)}>
              <img src={photo.urls.small} alt={photo.alt_description} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PhotoGrid;
