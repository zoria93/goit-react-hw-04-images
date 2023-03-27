import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  Header,
  SearchForm,
  Button,
} from 'components/Searchbar/Searchbar.styled';
import { BiSearch } from 'react-icons/bi';

export class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    this.setState({ imageName: e.target.value });
  };

  handleSubmit = e => {
    const { imageName } = this.state;
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      alert('Fill in Search query');
      return;
    }
    this.props.onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit} className="form">
          <Button type="submit" className="button">
            <span className="button-label">
              <BiSearch />
            </span>
          </Button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.imageName}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
