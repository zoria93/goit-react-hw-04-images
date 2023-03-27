import { LoadButton } from 'components/Button/Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <LoadButton onClick={onClick} type="button">
      Load more
    </LoadButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
