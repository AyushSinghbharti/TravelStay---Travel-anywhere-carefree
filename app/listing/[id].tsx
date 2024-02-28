import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const Page = () => {
  const {id} = useLocalSearchParams<{id: String}>();
  console.log("Seached id on [id] page: ", id);
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default Page