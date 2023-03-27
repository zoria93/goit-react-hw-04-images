import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { getImages } from 'services/api';
import { Button } from 'components/Button/Button';
import { Conteiner } from 'components/App.styled';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    loading: false,
    page: 1,
    renderBtn: true,
    isVisible: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevPageNumber = prevState.page;
    const pageNumber = this.state.page;
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    if (prevName !== nextName) {
      this.setState({ images: [] });
      this.setState({ isVisible: false });
      this.setState({ loading: true });
      getImages(nextName)
        .then(images => {
          if (images.hits.length !== 0) {
            this.setState({ images: images.hits });
            this.setState({ isVisible: true });
          } else {
            this.setState({ isVisible: false });
            alert(`No photo with name ${nextName}`);
          }
        })
        .catch(error => console.log(error.message))
        .finally(() => {
          this.setState({ loading: false });
        });
    }

    if (prevPageNumber !== pageNumber) {
      this.setState({ isVisible: false });
      this.setState({ loading: true });
      getImages(nextName, pageNumber)
        .then(images => {
          if (this.state.images.length === images.totalHits) {
            this.setState({ renderBtn: false });
          }
          if (images) {
            const imagesHits = images.hits;
            return imagesHits;
          }
        })
        .then(imagesHits =>
          this.setState(prevState => {
            return { images: [...prevState.images, ...imagesHits] };
          })
        )
        .catch(error => console.log(error.message))
        .finally(() => {
          this.setState({ loading: false });
          this.setState({ isVisible: true });
        });
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  handleButtonClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const gallery = this.state.images;
    const { loading, renderBtn, isVisible } = this.state;
    return (
      <Conteiner>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery gallery={gallery} />
        {loading && <Loader />}
        {isVisible && renderBtn && <Button onClick={this.handleButtonClick} />}
      </Conteiner>
    );
  }
}
