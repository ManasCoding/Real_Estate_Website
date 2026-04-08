const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const pointCoordinatesValidator = {
  validator(value) {
    if (value === undefined || value === null) {
      return true;
    }

    return (
      Array.isArray(value) &&
      value.length === 2 &&
      value.every((coordinate) => Number.isFinite(coordinate))
    );
  },
  message: 'Coordinates must contain [longitude, latitude].',
};

const halfStepRatingValidator = {
  validator(value) {
    if (value === undefined || value === null) {
      return true;
    }

    return value >= 1 && value <= 5 && Math.round(value * 2) === value * 2;
  },
  message: 'Rating must be between 1 and 5 in 0.5 increments.',
};

function nonEmptyArrayValidator(label) {
  return {
    validator(value) {
      return Array.isArray(value) && value.length > 0;
    },
    message: `${label} must contain at least one value.`,
  };
}

module.exports = {
  emailRegex,
  halfStepRatingValidator,
  nonEmptyArrayValidator,
  pointCoordinatesValidator,
  timeRegex,
};
