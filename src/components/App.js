'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import ImgFigure from './ImgFigure';
import ControllerUnit from './ControllerUnit';
import {getRamdomValueInRange, getRandomDeg} from '../utils/RandomUtils';
let imageDatas = require('../datas/imageDatas.json');

// Get the real URL of imageDatas
imageDatas = (function (imageDatasArr) {
  for(let i = 0, length = imageDatasArr.length; i < length; i++) {
    let imageData = imageDatasArr[i];
    imageData.imageURL = require('../images/' + imageData.fileName);
    imageDatasArr[i] = imageData;
  }
  return imageDatasArr;
})(imageDatas);



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgsArrangeArr: [
        /*
        pos: {
          left: 0,
          right: 0
        },
        rotate: 0,  // Rotation angle
        isInverse: false,  // Inverse or not
        isCenter: false
        */
      ]
    };

    this.posLimit = {
      centerPos: {  // Center position
        left: 0,
        top: 0
      },
      hPosRange: {  // Horizontal value range
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {  // Vertical value range
        topY: [0, 0],
        bottomY: [0, 0],
        x: [0, 0]
      }
    };
  }

  componentDidMount() {

    // Get gellery size
    let gelleryDOM = ReactDOM.findDOMNode(this.refs.gellery),
        gelleryW = gelleryDOM.scrollWidth,
        gelleryH = gelleryDOM.scrollHeight,
        halfGelleryW = Math.floor(gelleryW / 2),
        halfGelleryH = Math.floor(gelleryH / 2);

    // Get one ImgFigure's size
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        halfImgW = Math.floor(imgW / 2),
        halfImgH = Math.floor(imgW / 2);

    // Calculate the position of  image
    this.posLimit.centerPos = {
      left: halfGelleryW - halfImgW,
      top: halfGelleryH - halfImgH
    }

    this.posLimit.hPosRange.leftSecX[0] = -halfImgW;
    this.posLimit.hPosRange.leftSecX[1] = halfGelleryW - halfImgW * 2;
    this.posLimit.hPosRange.rightSecX[0] = halfGelleryW + halfImgW;
    this.posLimit.hPosRange.rightSecX[1] = gelleryW - halfImgW;
    this.posLimit.hPosRange.y[0] = -halfImgH;
    this.posLimit.hPosRange.y[1] = gelleryH - halfImgH;

    this.posLimit.vPosRange.topY[0] = -halfImgH;
    this.posLimit.vPosRange.topY[1] = halfGelleryH - halfImgH * 2;
    this.posLimit.vPosRange.x[0] = halfGelleryW - halfImgW;
    this.posLimit.vPosRange.x[1] = halfGelleryW;


    this.rearrange(0);
  }

  /*
  * Get the function that to be used to inverse image
  * @param index The index of the image that to be inverse in the image array
  * @return {Function} The real function to be invoke
  */
  getInverseFn(index) {
    return function() {
      let imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this);
  }

  /*
  * Rearrange all images
  * @param centerIndex Specified the index of center image
  */
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
        posLimit = this.posLimit,
        centerPos = posLimit.centerPos,
        hPosRange = posLimit.hPosRange,
        vPosRange = posLimit.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

    // Get the status of center image
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }

    // Get the status of top images
    topImgSpliceIndex = Math.floor(Math.random()
    * (imgsArrangeArr.length - 1 - topImgNum));

    imgsArrangeTopArr = imgsArrangeArr.splice(
      topImgSpliceIndex, topImgNum);

      imgsArrangeTopArr.forEach(function (value, index) {
        imgsArrangeTopArr[index] = {
          pos: {
            top: getRamdomValueInRange(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: getRamdomValueInRange(vPosRangeX[0], vPosRangeX[1])
          },
          rotate: getRandomDeg(),
          isCenter: false

        }
      });

      // Get the status of left and right images
      for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++ ) {

        // The first half part for left, second for right
        let hPosRangeX;
        if(i < k) {
          hPosRangeX = hPosRangeLeftSecX;
        } else {
          hPosRangeX = hPosRangeRightSecX;
        }

        imgsArrangeArr[i] = {
          pos: {
            top: getRamdomValueInRange(hPosRangeY[0], hPosRangeY[1]),
            left: getRamdomValueInRange(hPosRangeX[0], hPosRangeX[1])
          },
          rotate: getRandomDeg(),
          isCenter: false
        }
      }

      if (imgsArrangeTopArr[0]) {
        imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
      }

      imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }

  /*
  * Get the function that to be used to centralize the image clicked
  * @param index The index of the image that was clicked
  * @return Function
  */

  getCentralizeFn(index) {
    return function() {
      this.rearrange(index);
    }.bind(this);
  }

  render() {
    let controllerUnits = [],
    imgFigures = [];
    imageDatas.forEach(function (value, index) {

      // Initialize imgsArrangeArr
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }

      imgFigures.push(
        <ImgFigure
          key={value.imageURL}
          data={value}
          ref={'ImgFigure' + index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.getInverseFn(index)}
          centralize={this.getCentralizeFn(index)} />
      );
      controllerUnits.push(
        <ControllerUnit
          key={index}
          arrange={this.state.imgsArrangeArr[index]}
          inverse={this.getInverseFn(index)}
          centralize={this.getCentralizeFn(index)} />
       );
    }.bind(this));


    return (
      <section className="gellery" ref="gellery">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="nav-sec">
          {controllerUnits}
        </nav>
      </section>
    );
  }


}


export default App;
