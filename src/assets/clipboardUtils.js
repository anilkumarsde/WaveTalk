import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

export const copyToClipboard = text => {
  Clipboard.setString(text);
};
export const pasteToClipboard = async () => {};
