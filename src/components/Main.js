require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imageDatas = require('../datas/imageDatas.json');

// Get the real URL of imageDatas
imageDatas = (function (imageDatasArr) {
  for(let i = 0, length = imageDatasArr.length; i < length; i++) {
    let imageData = imageDatasArr[i];
    imageData.imageURL = require('../images' + imageData.imageName);

    imageDatasArr[i] = imageData;
  }

  return imageDatasArr;
})(imageDatas);

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <section className="gellery">
        <section className="img-sec"></section>
        <nav className="nav-sec"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
