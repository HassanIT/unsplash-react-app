import Head from 'next/head';
import PhotoGrid from '../components/PhotoGrid';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Unsplash Photo Grid</title>
        <meta name="description" content="A simple React app to display a grid of photos from Unsplash" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Unsplash Photo Grid</h1>
        <PhotoGrid />
      </main>
    </div>
  );
}
