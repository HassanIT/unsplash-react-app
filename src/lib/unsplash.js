export async function fetchPhotos(page = 1) {
  try {
    const response = await fetch(`https://api.unsplash.com/photos?page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}
