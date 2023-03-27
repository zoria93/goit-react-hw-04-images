import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from 'components/ImageGallery/ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery }) => {
  return (
    <>
      {gallery.length > 0 && (
        <List className="gallery">
          {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
              />
            );
          })}
        </List>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
};
