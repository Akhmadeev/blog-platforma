import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const shortText = (text) => text.split(' ').slice(0, 14).join(' ');

export const tagform = (tag) => {
  if (tag.length < 1) return 'no tags';
  return tag.map((elem) => (
    <Text key={elem} code>
      {elem}
    </Text>
  ));
};
