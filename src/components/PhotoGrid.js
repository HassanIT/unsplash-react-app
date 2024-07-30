'use client';

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ModalImage from 'react-modal-image';
import { fetchPhotos } from '../lib/unsplash';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

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

  return (
    <div>
      <InfiniteScroll
        dataLength={photos.length}
        next={loadMorePhotos}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className="photo-item">
              <ModalImage
                small={photo.urls.small}
                large={photo.urls.full}
                alt={photo.alt_description}
                hideDownload={true}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PhotoGrid;
