import React from 'react';
import PropTypes from 'prop-types';

const Trip = ({ name }) => (
  <div>
    TripName:
    {name}
  </div>
);

Trip.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Trip;
