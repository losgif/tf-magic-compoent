import React, { Component } from 'react';
import style from './style.module.less';

class ComponentB extends Component {
  render() {
    return <div className={style.box}>ComponentB</div>;
  }
}

export default ComponentB;
