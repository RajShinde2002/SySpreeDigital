import { useEffect, useState } from 'react';
import './App.css';
import { Search } from 'lucide-react';
import Lightbox from './components/Lightbox';
import PhotoCard from './components/PhotoCard';
import {access_key} from '../../Assessment/secret'

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("")
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 4;
  

  //Used useEffect hook with an empty dependency array to make sure the fetching is carried only once.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos/?client_id=${access_key}`);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

//Implemented debouncing in order to reduce the number of api calls
  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedInput(input)
    }, 300)
    
    return ()=>clearTimeout(handler);
  }, [input])

  function handleChange(e) {
    setInput(e.target.value);
    setCurrentPage(1);
  }
  
  //Filtering the photos with respect to the title which user inputs
  const filteredPhotos = photos.filter((photo) =>
    photo.alt_description?.toLowerCase().includes(debouncedInput.toLowerCase())
);

const indexOfLastPhoto = currentPage * photosPerPage;
const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);

const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <div className='input-box-container'>
    <div className='input-box'>
      <input className='input-tag' type="text" onChange={handleChange} value={input} placeholder="Search by title..." />
      <Search width={20} height={20}/>
    </div>
    </div>
      <div className="grid-container">
        {currentPhotos.map((photo) => (
          <div key={photo.id}>
          <PhotoCard photo={photo} openLightbox={openLightbox} />
          </div>
        ))}
      </div>

      {filteredPhotos.length > photosPerPage && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
      <Lightbox selectedPhoto={selectedPhoto} closeLightbox={closeLightbox} />
    </>
  );
}

export default App;