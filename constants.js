import { Dimensions, PixelRatio  } from 'react-native';


export const BASE_URL = 'https://salepage-server-rherm.appengine.bfcplatform.vn'

export const SCREEN_WIDTH = Dimensions.get('window').width;

export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const MAIN_LOGO_URL = "https://thuvienlogo.com/data/03/logo-ban-hang-dep-01.jpg";

export const getTextStyle = () => {
  const fontScale = PixelRatio.getFontScale();
  const fontSize = SCREEN_WIDTH < 350 ? 14 : SCREEN_WIDTH < 500 ? 16 : SCREEN_WIDTH < 750 ? 18 : 20;
  const lineHeight = Math.round(fontSize * 1.5);

  return {
    fontSize: fontSize * fontScale,
    lineHeight: lineHeight * fontScale,
  };
}