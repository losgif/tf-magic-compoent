/*
 * 统一修改 Ant-design 的样式
 * @Author: wenzhe
 * @Date: 2019-07-01 11:25:50
 * @Last Modified by: wenzhe
 * @Last Modified time: 2019-07-01 14:49:13
 */
import React from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import { TableProps } from 'antd/es/table'

const styledTable = <T extends unknown>(props: TableProps<T>) => {
  const { className, ...restProps } = props;
  const prevClassName = `${styles.commonTable}`;

  return (
    <Table
      className={classNames(prevClassName, className)}
      {...restProps}
    />
  );
};

export default styledTable;

