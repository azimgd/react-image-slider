import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      images: [],
      currentPosition: 0,
      visibleItems: 4
    };
  },
  componentDidMount() {
    this.setImages(this.props.images);
    this.setItemDimensions('slider-item');
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
      window.removeEventListener('resize', this.handleResize);
  },
  scrollLeft() {
    this.updatePosition(this.state.currentPosition - 1);
  },
  scrollRight() {
    this.updatePosition(this.state.currentPosition + 1);
  },
  handleResize() {
    this.setItemDimensions();
  },
  updatePosition(position) {
    const whole = position + this.state.visibleItems;

    if(whole > this.state.images.length || position < 0) {
      return false;
    }

    this.setState({ currentPosition: position });
  },
  calculateShift(offset, amount) {
    return offset * amount;
  },
  setImages(images) {
    this.setState({ images });
  },
  setItemDimensions(classname) {
    const items = document.getElementsByClassName(classname);
    const itemWidth = (items[0]) ? items[0].offsetWidth : 0;
    this.setState({ itemWidth });
  },
  sliderStyle() {
    const shift = this.calculateShift(this.state.itemWidth, this.state.currentPosition);
    const transform = `translateX(-${shift}px)`;

    return { transform };
  },
  isOpaque(key) {
    const opaque = this.state.images.slice(this.state.currentPosition, this.state.visibleItems + this.state.currentPosition);

    return (opaque.indexOf(this.state.images[key]) !== -1);
  },
  render() {
    const sliderStyle = this.sliderStyle();
    const images = this.state.images || [];

    return (
      <div className="container">
        <div className="slider" style={sliderStyle}>
          {images.map((item, key) => {
            const isOpaque = this.isOpaque(key);
            const itemClass = (isOpaque) ? 'slider-item' : 'slider-item slider-item_transparent';

            return <div className={itemClass} key={key}>
              <img src={item} className="slider-item-img" />
            </div>
          })}
        </div>
        {images.length > this.state.visibleItems ?
        <div>
          <div className="navigation navigation_left arrow_left" onClick={this.scrollLeft}></div>
          <div className="navigation navigation_right arrow_right" onClick={this.scrollRight}></div>
        </div>
        :null}
      </div>
    );
  }
});
