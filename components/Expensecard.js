import { View, Text } from 'react-native'
import React from 'react'
import { categoryBG, colors } from '../Themes/themes'

export default function Expensecard({item}) {
  return (
    <View style={{backgroundColor:categoryBG[item.category]}} className="flex-row justify-between items-center p-3 px-5 mb-3 rounded-2xl">
     <View>
      <Text className={`${colors.heading} font-bold`}>{item.title}</Text>
      <Text className={`${colors.heading} font-xs`}>{item.category}</Text>
     </View>
     <View>
      <Text>${item.amount}</Text>
     </View>

    </View>
  )
}