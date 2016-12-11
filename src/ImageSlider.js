import React, { PropTypes } from 'react';
import ImageSliderHoc from './ImageSliderHoc';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.setVisibleItems = this.setVisibleItems.bind(this);
    this.sliderStyle = this.sliderStyle.bind(this);
    this.isOpaque = this.isOpaque.bind(this);
    this.animate = this.animate.bind(this);

    this.state = {
      images: [],
      currentPosition: 0,
      interval: null
    };
  }

  componentDidMount() {
    this.setVisibleItems(this.props.visibleItems);
    window.addEventListener('resize', this.setVisibleItems.bind(this, this.props.visibleItems));
  }

  componentWillUnmount() {
    this.clearAnimate();
    window.removeEventListener('resize', this.setVisibleItems.bind(this, this.props.visibleItems));
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.currentPosition !== nextState.currentPosition) {
      this.animate();
    }
  }

  scrollLeft() {
    const currentPosition = this.updatePosition(this.state.currentPosition - 1);
    this.setState({ currentPosition });
  }

  scrollRight() {
    const currentPosition = this.updatePosition(this.state.currentPosition + 1);
    this.setState({ currentPosition });
  }

  setVisibleItems(currentVisibleItems) {
    const container = document.querySelector('.rsc-slider');
    const visibleItems = (container && container.offsetWidth < 720) ? 1 : currentVisibleItems;
    this.setState({ visibleItems });
  }

  sliderStyle(classname) {
    const items = document.querySelector(classname);
    const itemWidth = items ? items.offsetWidth : 0;
    const shift = itemWidth * this.state.currentPosition;
    return { transform: `translateX(-${shift}px)` };
  }

  isOpaque(key) {
    const nextPosition = this.state.visibleItems + this.state.currentPosition;
    const opaque = this.props.children.slice(this.state.currentPosition, nextPosition);
    return opaque.indexOf(this.props.children[key]) !== -1;
  }

  animate() {
    if (this.state.interval) {
      window.clearInterval(this.state.interval);
    }
    if (!this.props.delay) {
      return false;
    }
    const interval = window.setInterval(this.scrollRight, this.props.delay);
    this.setState({ interval });
  }

  clearAnimate() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    }
  }

  updatePosition(nextPosition) {
    const { visibleItems, currentPosition } = this.state;
    const skipScrollIfEnd = this.props.calculator.skipScrollIfEnd(visibleItems, currentPosition, nextPosition);
    const skipScrollIfNonInfinite = this.props.calculator.skipScrollIfNonInfinite(visibleItems, currentPosition, nextPosition);
    const scrollIfInfinite = this.props.calculator.scrollIfInfinite(visibleItems, currentPosition, nextPosition);
    const scrollToBeginningIfEnd = this.props.calculator.scrollToBeginningIfEnd(visibleItems, currentPosition, nextPosition);
    if (skipScrollIfEnd !== undefined) {
      return skipScrollIfEnd;
    }
    if (skipScrollIfNonInfinite !== undefined) {
      return skipScrollIfNonInfinite;
    }
    if (scrollIfInfinite !== undefined) {
      return scrollIfInfinite;
    }
    if (scrollToBeginningIfEnd !== undefined) {
      return scrollToBeginningIfEnd;
    }
    return nextPosition;
  }

  render() {
    const sliderStyle = this.sliderStyle('.rsc-slider-item');
    const imgWidth = 100 / this.state.visibleItems;
    const images = this.props.children.map((item, key) => ({
      itemClass: this.isOpaque(key) ? 'rsc-slider-item' : 'rsc-slider-item rsc-slider-item_transparent',
      src: item,
    }));

    return (
      <div className="rsc-container">
        <div className="rsc-slider" style={sliderStyle}>
          {images.map((item, key) =>
            <div className={item.itemClass} key={key} style={{'flex': `0 0 ${imgWidth}%`}}>
              <div className="rsc-slider-item-img">{item.src}</div>
            </div>
          )}
        </div>
        {images.length > this.state.visibleItems ?
          <div>
            <div className="rsc-navigation rsc-navigation_left rsc-arrow_left" onClick={this.scrollLeft}></div>
            <div className="rsc-navigation rsc-navigation_right rsc-arrow_right" onClick={this.scrollRight}></div>
          </div>
        : null}
      </div>
    );
  }
}

Slider.propTypes = React.PropTypes.shape({
  visibleItems: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  delay: PropTypes.number.isRequired,
  calculator: PropTypes.func.isRequired,
}).isRequired;

export default ImageSliderHoc(Slider);
