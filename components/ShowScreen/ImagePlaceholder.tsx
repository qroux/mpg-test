import React from 'react';
import { View } from '../Themed';

type PlaceholderProps = {
  size: number;
};

export default function ImagePlaceholder({ size }: PlaceholderProps) {
  return <View style={{ height: size, width: size }}></View>;
}
