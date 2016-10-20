'use strict';

import React from 'react';

class ControllerUnit extends React.Component {

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
    e.preventDefault();
    e.stopPropagation();
  }
  render() {
    let className = 'nav-unit';

    className += this.props.arrange.isCenter ? ' active' : '';
    className += this.props.arrange.isInverse ? ' inverse' : '';
    
    return (
      <span className={className}
            onClick={this.handleClick}></span>
    )
  }
}

export default ControllerUnit;
