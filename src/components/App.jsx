import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { getImages } from 'services/api';
import { Button } from 'components/Button/Button';
import { Conteiner } from 'components/App.styled';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [imageName, setImageName] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setIsVisible(false);
    setLoading(true);
    getImages(imageName, page)
      .then(imagesEl => {
        if (imagesEl) {
          setTotalPage(imagesEl.totalHits / 12);
          return imagesEl.hits;
        }
      })
      .then(imagesHits => {
        if (imagesHits.length !== 0) {
          setImages(prevImages => [...prevImages, ...imagesHits]);

          setIsVisible(true);
        } else {
          alert(`No photo with name ${imageName}`);
          setIsVisible(false);
        }
      })
      .catch(error => console.log(error.message))
      .finally(() => {
        setLoading(false);
      });
  }, [imageName, page]);

  const handleFormSubmit = query => {
    if (imageName === query) {
      return;
    }
    setImageName(query);
    setImages([]);
    setPage(1);
  };

  const handleButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Conteiner>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery gallery={images} />
      {loading && <Loader />}
      {isVisible && page <= totalPage && <Button onClick={handleButtonClick} />}
    </Conteiner>
  );
};
