import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screeenWrapper'
import { colors } from '../Themes/themes'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setuserLoading } from '../redux/slices/user'


export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userloading } = useSelector(state => state.user);


  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {

    if (email && password) {
      // navigation.navigate('Home');

      try {
        dispatch(setuserLoading(true));
        await createUserWithEmailAndPassword(auth, email, password);
        dispatch(setuserLoading(false));
      } catch (e) {
        dispatch(setuserLoading(false));
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red'
        });
      }
    } else {
      // show error
      Snackbar.show({
        text: 'Email and password are required',
        backgroundColor: 'red'
      });
    }
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "padding"}>
          <View className="flex justify-between h-full mx-4">
            <View >
              <View className="relative mt-5">
                <View className="absolute top-0 left-0 z-10">
                  <BackButton />
                </View>

                <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
              </View>

              <View className="flex-row justify-center my-3 mt-5">
                <Image source={require('../assests/images/signup.png')} className="h-80 w-80" />
              </View>
              <View className="space-y-2 mx-2">
                <Text className={`${colors.heading} text-lg font-bold`} >Email</Text>
                <TextInput value={email} onChangeText={value => setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
                <Text className={`${colors.heading} text-lg font-bold`} >Password</Text>
                <TextInput value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
              </View>
            </View>
            <View>
              {
                userloading ? (
                  <Loading />
                ) : (
                  <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm mx-2">
                    <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ScreenWrapper >
  )
}