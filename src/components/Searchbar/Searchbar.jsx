import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Header,
  SearchForm,
  Button,
} from 'components/Searchbar/Searchbar.styled';
import { BiSearch } from 'react-icons/bi';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      alert('Fill in Search query');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit} className="form">
        <Button type="submit">
          <span>
            <BiSearch />
          </span>
        </Button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          value={imageName}
          onChange={handleNameChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
