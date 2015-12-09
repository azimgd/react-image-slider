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
    this.setItemDimensions('rsc-slider-item');
    window.addEventListener('resize', this.setItemDimensions.bind(this, 'rsc-slider-item'));
  },
  componentWillMount() {
    const images = (this.props.images || []).map((image, count) => {
      return image + `?rscver${count}`;
    });
    this.setState({images});
  },
  componentWillUnmount() {
      window.removeEventListener('resize', this.setItemDimensions.bind(this, 'rsc-slider-item'));
  },
  scrollLeft() {
    this.updatePosition(this.state.currentPosition - 1);
  },
  scrollRight() {
    this.updatePosition(this.state.currentPosition + 1);
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
    const nextPosition = this.state.visibleItems + this.state.currentPosition;
    const opaque = this.state.images.slice(this.state.currentPosition, nextPosition);

    return (opaque.indexOf(this.state.images[key]) !== -1);
  },
  render() {
    const sliderStyle = this.sliderStyle();
    const images = this.state.images;

    return (
      <div className="rsc-container">
        <div className="rsc-slider" style={sliderStyle}>
          {images.map((item, key) => {
            const isOpaque = this.isOpaque(key);
            const itemClass = (isOpaque) ? 'rsc-slider-item' : 'rsc-slider-item rsc-slider-item_transparent';

            return <div className={itemClass} key={key}>
              <img src={item} className="rsc-slider-item-img" />
            </div>
          })}
        </div>
        {images.length > this.state.visibleItems ?
        <div>
          <div className="rsc-navigation rsc-navigation_left rsc-arrow_left" onClick={this.scrollLeft}></div>
          <div className="rsc-navigation rsc-navigation_right rsc-arrow_right" onClick={this.scrollRight}></div>
        </div>
        :null}
      </div>
    );
  }
});
