

import { Icons, Images } from '@src/assets';
import { Image, ImageProps } from '../FastImage';

export type ImageSource = Images | string | Icons;

export interface AppImageProps extends Omit<ImageProps, 'source'> {
  source: ImageSource;
}

export const AppImage = (props: AppImageProps) => {
  
  return (
    <Image
      defaultSource={Images.PLACEHOLDER_IMAGE}
      resizeMode="contain"
      {...props}
    />
  );
};
