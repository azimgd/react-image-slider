import React from 'react';
import { Link }  from 'react-router';
import Header from './header/header';
import Footer from './footer/footer';
import Webcam from './webcam/webcam';
import Gallery from './gallery/gallery';

export default React.createClass({
  getInitialState() {
    return {
      screenshot: null
    };
  },
  render() {
    return (
      <div>
        <Header />
        <Webcam />
        <Gallery />
        <Footer />
      </div>
    );
  }
});
