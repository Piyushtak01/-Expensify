import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screeenWrapper'
import { colors } from '../Themes/themes'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'

export default function AddTripScreen() {
    const [place, setplace] = useState();
    const [country, setcountry] = useState();
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(state => state.user);

    const navigation = useNavigation();

    const Addtriphandler = async () => {
        if (place && country) {
            // navigation.navigate('Home');'
            setLoading(true);
            let doc = await addDoc(tripsRef,{
                place,
                country,
                userId : user.uid
            });
            setLoading(false)
            if(doc && doc.id){
                navigation.goBack();
                
            }
        } else {
            // show error
            Snackbar.show({
                text: 'Place and Country are required',
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

                                <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Trip</Text>
                            </View>

                            <View className="flex-row justify-center my-3 mt-5">
                                <Image source={require('../assests/images/4.png')} className="h-72 w-72" />
                            </View>
                            <View className="space-y-2 mx-2">
                                <Text className={`${colors.heading} text-lg font-bold`} >Where on Earth?</Text>
                                <TextInput value={place} onChangeText={value => setplace(value)} className="p-4 bg-white rounded-full mb-3" />
                                <Text className={`${colors.heading} text-lg font-bold`} >Which Country</Text>
                                <TextInput value={country} onChangeText={value => setcountry(value)} className="p-4 bg-white rounded-full mb-3" />
                            </View>
                        </View>
                        <View>
                            {
                                loading ? (
                                    <Loading />
                                ) : (
                                    <TouchableOpacity onPress={Addtriphandler} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm mx-2">
                                        <Text className="text-center text-white text-lg font-bold">Add Trip</Text>
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