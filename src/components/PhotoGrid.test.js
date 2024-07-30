import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PhotoGrid from './PhotoGrid';
import { fetchPhotos } from '../lib/unsplash';

jest.mock('../lib/unsplash');

const mockPhotos = [
  {
    id: '1',
    urls: {
      small: 'https://example.com/photo1-small.jpg',
      full: 'https://example.com/photo1-full.jpg',
    },
    alt_description: 'Photo 1',
  },
  {
    id: '2',
    urls: {
      small: 'https://example.com/photo2-small.jpg',
      full: 'https://example.com/photo2-full.jpg',
    },
    alt_description: 'Photo 2',
  },
];

describe('PhotoGrid', () => {
  beforeEach(() => {
    fetchPhotos.mockResolvedValue(mockPhotos);
  });

  it('renders without crashing and shows loading initially', () => {
    render(<PhotoGrid />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays photos', async () => {
    render(<PhotoGrid />);

    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toBe(mockPhotos.length);
    });

    mockPhotos.forEach((photo) => {
      expect(screen.getByAltText(photo.alt_description)).toBeInTheDocument();
    });
  });
});
