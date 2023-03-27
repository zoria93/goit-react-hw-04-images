import { Item } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;
    return (
      <>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        )}
        <Item onClick={this.toggleModal}>
          <img src={webformatURL} alt={tags} />
        </Item>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
