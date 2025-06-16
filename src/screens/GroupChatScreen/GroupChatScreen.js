import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const GroupChatScreen = () => {
  const route = useRoute();
  const {groupId, groupName, members} = route.params;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  const memberMap = {};
  members.forEach(member => {
    memberMap[member.uid] = member;
  });

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      });

    return () => unsubscribe();
  }, [groupId]);

  const sendMessage = async () => {
    const currentUser = auth().currentUser;
    if (!inputText.trim()) return;

    await firestore()
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .add({
        text: inputText,
        senderId: currentUser.uid,
        senderName: memberMap[currentUser.uid]?.name || 'Unknown',
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

    setInputText('');
  };

  const renderItem = ({item}) => {
    const isCurrentUser = item.senderId === auth().currentUser?.uid;
    const senderName = memberMap[item.senderId]?.name || 'Unknown';

    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.myMessage : styles.theirMessage,
        ]}>
        {!isCurrentUser && <Text style={styles.senderName}>{senderName}</Text>}
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        }
        onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
        contentContainerStyle={{paddingVertical: 10}}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
        style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{color: 'white'}}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C5',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEE',
  },
  senderName: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: '#f2f2f2',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
