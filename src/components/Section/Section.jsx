import PropTypes from 'prop-types';

const Section = ({ children }) => <section>{children}</section>;

export default Section;

Section.propTypes = {
  nameForClass: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
