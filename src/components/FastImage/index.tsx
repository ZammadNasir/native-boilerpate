import React, { useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  ActivityIndicator,
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import FastImage, {
  FastImageProps as FastImageProp,
  ImageStyle,
  Priority,
  Source,
} from 'react-native-fast-image';

export type FastImageProps = Omit<FastImageProp, 'source'>;
FastImage.clearMemoryCache();
FastImage.clearDiskCache();
export interface ImageProps extends FastImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  style?: ImageStyle;
  priority?: Priority;
  uploading?: boolean;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  showIndicator?: boolean;
  indicatorSize?: number;
  source?: string | Source | number;
  loaderColor?: string;
}

export const Image = React.memo((props: ImageProps) => {
  const {
    children,
    containerStyle,
    indicatorSize = 20,
    loaderColor,
    priority,
    resizeMode,
    showIndicator = true,
    source,
    style,
    uploading,
    width,
    ...rest
  } = props;

  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  useEffect(() => {
    if (typeof uploading !== 'undefined' && uploading !== loading) {
      setLoading(uploading);
    }
  }, [loading, uploading]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (layout && layout.height === height && layout.width === width) {
      return;
    }
    setLayout(e.nativeEvent.layout);
  };

  const shouldShowIndicator =
    showIndicator &&
    typeof source === 'string' &&
    (source.startsWith('http') || source.startsWith('https'));

  let indicator = null;
  if (loading && shouldShowIndicator) {
    indicator = (
      <View style={styles.indicator}>
        <ActivityIndicator
          color={loaderColor ?? '#fff'}
          size={indicatorSize}
          animating={loading}
        />
      </View>
    );
  }

  let imageSource: number | Source | undefined = {
    priority: priority || FastImage.priority.normal,
    uri: source as string,
  };

  if (typeof source !== 'string') {
    // Local image
    imageSource = source;
  }

  let imageStyle: StyleProp<ImageStyle> = style || {};

  if (imageStyle.flex === 1 && layout) {
    imageStyle = { ...style };
    delete imageStyle.flex;
    imageStyle = { ...imageStyle, ...layout };
  }

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <FastImage
        style={imageStyle}
        source={imageSource}
        resizeMode={resizeMode || FastImage.resizeMode.contain}
        onLoadStart={() => {
          !loading && setLoading(true);
        }}
        onError={() => {
          loading && setLoading(false);
        }}
        onLoadEnd={() => {
          loading && setLoading(false);
        }}
        // fallback={true}
        {...rest}>
        {children}
      </FastImage>

      {indicator}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  indicator: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
