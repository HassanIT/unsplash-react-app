export async function fetchPhotos(page = 1) {
  try {
    const response = await fetch(`https://api.unsplash.com/photos?page=${page}&client_id=g8Z0gQAhbMs8GiDaEn22snot-G9tgDdrGtdB9fBIcSk`);
    
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
