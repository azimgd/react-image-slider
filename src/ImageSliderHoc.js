import React, { PropTypes } from 'react';

export default function ImageSliderHoc(Component) {
  class WrapperComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    renameImages(images) {
      const imagesArray = Array.isArray(images) ? images : [];
      return imagesArray.map((image, count) => {
        return image + `?rscver${count}`;
      });
    }

    positionCalculator(options) {
      const calculator = ({
        skipScrollIfNonInfinite: (visibleItems, currentPosition, nextPosition) => {
          if (!options.isInfinite && nextPosition < 0) {
            return currentPosition;
          }
        },

        scrollIfInfinite: (visibleItems, currentPosition, nextPosition) =>  {
          if (options.isInfinite && nextPosition < 0) {
            return nextPosition + visibleItems;
          }
        },

        scrollToBeginningIfEnd: (visibleItems, currentPosition, nextPosition) => {
          if (nextPosition + visibleItems > options.totalItems)  {
            return 0;
          }
        },

        skipScrollIfEnd: (visibleItems, currentPosition, nextPosition) => {
          if (!options.isInfinite && nextPosition + visibleItems > options.totalItems) {
            return currentPosition;
          }
          if (!options.isInfinite && nextPosition < 0) {
            return currentPosition;
          }
        },
      });
      return calculator;
    }

    render() {
      const images = this.renameImages(this.props.children);
      const calculator = this.positionCalculator({
        isInfinite: this.props.isInfinite,
        totalItems: this.props.children.length,
      });
      return (
        <Component
          {...this.props}
          images={images}
          calculator={calculator}
        />
      );
    }
  }

  WrapperComponent.propTypes = React.PropTypes.shape({
    visibleItems: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    delay: PropTypes.number.isRequired,
    isInfinite: PropTypes.bool.isRequired,
  }).isRequired;

  WrapperComponent.defaultProps = {
    isInfinite: true,
    delay: 5000,
    visibleItems: 4,
  };

  return WrapperComponent;
}
