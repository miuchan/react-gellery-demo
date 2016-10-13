'use strict';

import React from 'react';

class ImgFigure extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.centralize();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let styleObj = {};

    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    if (this.props.arrange.rotate) {
      styleObj['transform'] = `rotate(${this.props.arrange.rotate}deg)`;
    }

    let className = 'img-figure';
    className += this.props.arrange.isInverse ? ' inverse' : '';

    return ( <
      figure className = {
        className
      }
      style = {
        styleObj
      }
      onClick = {
        this.handleClick
      } >
      <
      img src = {
        this.props.data.imageURL
      }
      alt = {
        this.props.data.title
      }
      /> <
      figcaption >
      <
      h2 className = "img-title" > {
        this.props.data.title
      } < /h2> <
      div className = "img-back"
      onClick = {
        this.handleClick
      } >
      <
      p > {
        this.props.data.desc
      } <
      /p> <
      /div> <
      /figcaption> <
      /figure>
    );
  }
}

ImgFigure.defaultProps = {

};

export default ImgFigure;
