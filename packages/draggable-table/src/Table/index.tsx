import React from 'react';
import { Table } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';
import { TableProps } from 'antd/es/table'

const styledTable = <T extends object>(props: TableProps<T>) => {
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

