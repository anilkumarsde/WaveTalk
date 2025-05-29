import firestore from '@react-native-firebase/firestore';

export async function checkNumberExists(number) {
  try {
    const querySnapshot = await firestore()
      .collection('users')
      .where('phoneNumber', '==', number)
      .get();

    return !querySnapshot.empty;  // true if exists, false otherwise
  } catch (error) {
    console.error('Error checking number existence:', error);
    return false; // treat as not exists on error
  }
}
