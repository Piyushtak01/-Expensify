import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screeenWrapper'
import { colors } from '../Themes/themes';
import RandomImage from '../assests/images/RandomImages';
import Emptylist from '../components/emptylist';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import Expensecard from '../components/Expensecard';
import { doc, getDocs, query, where } from 'firebase/firestore';
import { expensesRef } from '../config/firebase';


const items = [
    {
        id: 1,
        title: 'ate sandwitch',
        amount: 4,
        category: 'food',
    },
    {
        id: 2,
        title: 'bought a jacket',
        amount: 50,
        category: 'shopping',
    },
    {
        id: 3,
        title: 'watched a movie',
        amount: 100,
        category: 'entertainment',
    },
]


export default function TripExpensesScreen(props) {
    const { id, place, country } = props.route.params;
    const navigation = useNavigation();
    const [Expense, setExpenses] = useState([]);
    const isFocused = useIsFocused();

    const fetchExpenses = async () => {
      const q = query(expensesRef, where("tripsId", "==",id));
      const querysnapshot = await getDocs(q);
      let data = [];
      querysnapshot.forEach(doc => {
        //console.log("document:", doc.data());
        data.push({ ...doc.data(), id: doc.id })
      })
      setExpenses(data);
    }
  
  
    useEffect(() => {
      if (isFocused)
        fetchExpenses();
    }, [isFocused])


    return (
        <ScreenWrapper className="flex-1">
            <View className="px-4">
                <View className="relative mt-5">
                    <View className="absolute top-2 left-0 z-10">
                        <BackButton />
                    </View>
                    <View>

                        <Text className={`${colors.heading} text-xl font-bold text-center`}> {place}</Text>
                        <Text className={`${colors.heading} text-xs  text-center`}>{country}</Text>
                    </View>
                </View>

                <View className="flex-row justify-center items-center rounded-full  mb-4">
                    <Image source={require('../assests/images/7.png')} className="w-80 h-80" />
                </View>
                <View className="space-y-3">
                    <View className="flex-row justify-between items-center">
                        <Text className={`${colors.heading} font-bold text-xl`} >Expenses</Text>
                        <TouchableOpacity
                         onPress={() => navigation.navigate('AddExpense' , {id , place ,country})} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                            <Text className={colors.heading}>Add Expense</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 430 }}>
                        <FlatList
                            data={Expense}
                            ListEmptyComponent={<Emptylist message={"You haven't recorded any Expenses yet"} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            className="mx-1"
                            renderItem={({ item }) => {
                                return (
                                    <Expensecard item={item} />
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
        </ScreenWrapper>


    );
} 