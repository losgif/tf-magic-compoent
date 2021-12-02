import React, { useState, useEffect } from 'react';
import View from './view';
import { getComponentName } from './service';

function ComponentA() {
  const [data, setData]: any = useState(0);

  if (!data) {
    getComponentName({
      pageSize: 5,
    }).then((res: any) => {
      if (!(res && res.data)) {
        return;
      }
      setData({
        componentName: res.data.componentName,
      });
    });
  }

  return (
    <>
      <View componentName={data.componentName}></View>
    </>
  );
}

export default ComponentA;
