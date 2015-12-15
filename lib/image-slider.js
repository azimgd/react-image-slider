'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'repl',

  getDefaultProps: function getDefaultProps() {
    return {
      isInfinite: true,
      delay: 2000
    };
  },
  getInitialState: function getInitialState() {
    return {
      images: [],
      currentPosition: 0,
      visibleItems: 4,
      interval: null
    };
  },
  componentDidMount: function componentDidMount() {
    this.setItemDimensions('rsc-slider-item');
    this.animate();

    window.addEventListener('resize', this.setItemDimensions.bind(this, 'rsc-slider-item'));
  },
  componentWillMount: function componentWillMount() {
    var images = (this.props.images || []).map(function (image, count) {
      return image + ('?rscver' + count);
    });
    this.setState({ images: images });
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.setItemDimensions.bind(this, 'rsc-slider-item'));
  },
  scrollLeft: function scrollLeft() {
    this.updatePosition(this.state.currentPosition - 1);
    this.animate();
  },
  scrollRight: function scrollRight() {
    this.updatePosition(this.state.currentPosition + 1);
    this.animate();
  },
  updatePosition: function updatePosition(position) {
    var whole = position + this.state.visibleItems;

    if (this.props.isInfinite && position < 0) {
      this.setState({ currentPosition: whole });
    }

    if (this.props.isInfinite && whole > this.state.images.length) {
      this.setState({ currentPosition: 0 });
    }

    if (whole > this.state.images.length || position < 0) {
      return;
    }

    this.setState({ currentPosition: position });
  },
  calculateShift: function calculateShift(offset, amount) {
    return offset * amount;
  },
  setItemDimensions: function setItemDimensions(classname) {
    var items = document.getElementsByClassName(classname);
    var itemWidth = items[0] ? items[0].offsetWidth : 0;
    this.setState({ itemWidth: itemWidth });
  },
  sliderStyle: function sliderStyle() {
    var shift = this.calculateShift(this.state.itemWidth, this.state.currentPosition);
    var transform = 'translateX(-' + shift + 'px)';

    return { transform: transform };
  },
  isOpaque: function isOpaque(key) {
    var nextPosition = this.state.visibleItems + this.state.currentPosition;
    var opaque = this.state.images.slice(this.state.currentPosition, nextPosition);

    return opaque.indexOf(this.state.images[key]) !== -1;
  },
  animate: function animate() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }

    var interval = setInterval(this.scrollRight, this.props.delay);
    this.setState({ interval: interval });
  },
  render: function render() {
    var _this = this;

    var sliderStyle = this.sliderStyle();
    var images = this.state.images;
    var delay = this.props.delay;

    return _react2['default'].createElement(
      'div',
      { className: 'rsc-container' },
      _react2['default'].createElement(
        'div',
        { className: 'rsc-slider', style: sliderStyle },
        images.map(function (item, key) {
          var isOpaque = _this.isOpaque(key);
          var itemClass = isOpaque ? 'rsc-slider-item' : 'rsc-slider-item rsc-slider-item_transparent';

          return _react2['default'].createElement(
            'div',
            { className: itemClass, key: key },
            _react2['default'].createElement('img', { src: item, className: 'rsc-slider-item-img' })
          );
        })
      ),
      images.length > this.state.visibleItems ? _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement('div', { className: 'rsc-navigation rsc-navigation_left rsc-arrow_left', onClick: this.scrollLeft }),
        _react2['default'].createElement('div', { className: 'rsc-navigation rsc-navigation_right rsc-arrow_right', onClick: this.scrollRight })
      ) : null
    );
  }
});
module.exports = exports['default'];
