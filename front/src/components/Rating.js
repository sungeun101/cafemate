import React from 'react';
import { Rate } from 'antd';

const Rating = ({ form }) => {
  const onChange = (rate) => {
    form.setFieldsValue({ star: rate });
  };

  return <Rate allowHalf onChange={onChange} />;
};

export default Rating;
