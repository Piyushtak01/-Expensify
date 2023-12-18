import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screeenWrapper'
import { colors } from '../Themes/themes';
import RandomImage from '../assests/images/RandomImages';
import Emptylist from '../components/emptylist';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import { getDocs, query, where } from 'firebase/firestore';


const iteam = [
  {
    id: 1,
    place: 'Gujrat',
    country: 'Bharat'
  },
  {
    id: 2,
    place: 'London eye',
    country: 'England'
  },
  {
    id: 3,
    place: 'Washington dc',
    country: "America"
  },
  {
    id: 4,
    place: 'New York',
    country: 'America'
  },
  {
    id: 5,
    place: 'Rameshwaram',
    country: "Bharat"
  },
  {
    id: 6,
    place: 'kazakisthan',
    country: 'Russia'
  },
]


export default function HomeScreen() {
  const navigation = useNavigation();

  const { user } = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();



  const fetchTrips = async () => {
    const q = query(tripsRef, where("userId", "==", user.uid))
    const querysnapshot = await getDocs(q);
    let data = [];
    querysnapshot.forEach(doc => {
      //console.log("document:", doc.data());
      data.push({ ...doc.data(), id: doc.id })
    })
    setTrips(data);
  }


  useEffect(() => {
    if (isFocused)
      fetchTrips();
  }, [isFocused])


  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
          <Text className={colors.heading}>logOut</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
        <ImageBackground  className="w-60 h-60 bg-white " source={require('../assests/images/banner.png')} />
      </View>
      <View className="px-4 space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`} >Recent Trips</Text>

          <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} 
          className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 430 }}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<Emptylist message={"You haven't recorded any trips yet"} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            className="mx-1"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', { ...item })} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                  <View>
                    <Image className="w-36 h-36 mb-2"  source={RandomImage()} />
                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
} 