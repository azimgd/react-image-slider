# React image slider
Responsive, css transitions based image slider/gallery/carousel for react.js

![](https://github.com/azimgd/react-image-slider/blob/master/docs/slider.gif?raw=true)

## Installation

```
npm install react-image-slider
```

and add css file from `./node_modules/react-image-slider/lib/image-slider.css`

## Example

```javascript
import React from 'react';
import Slider from 'react-image-slider';

export default React.createClass({
  render() {
    const images = [
      '//placehold.it/600/1abc9c',
      '//placehold.it/600/3498db',
      '//placehold.it/600/2ecc71',
      '//placehold.it/600/9b59b6',
      '//placehold.it/600/f1c40f',
      '//placehold.it/600/e74c3c',
      '//placehold.it/600/e67e22',
    ];

    return (
      <Slider images={images} isInfinite delay={5000}>
        {images.map((image, key) => <div key={key}><img src={image} /></div>)}
      </Slider>
    );
  }
});
```

## Demo

In order to run demo, execute:
```
cd example
npm install
npm start
```
and then navigate to *http://localhost:8080*

## License

The MIT License (MIT)

Copyright (c) 2016 React Image Slider &lt;me@azimgd.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
