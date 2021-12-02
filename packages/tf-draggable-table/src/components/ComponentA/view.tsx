import React, { Component } from 'react';
import style from './style.module.less';
interface iProps {
  componentName: string;
}
interface iState {}
class View extends Component<iProps, iState> {
  render() {
    const { componentName } = this.props;

    return <div className={style.box}>{componentName}</div>;
  }
}

export default View;
