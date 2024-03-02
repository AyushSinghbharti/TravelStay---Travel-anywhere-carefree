import { View, Text } from 'react-native'
import React, {useState, useMemo} from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listing from '@/components/Listing';
import listingsData from '@/assets/data/airbnb-listings.json';

const Page = () => {
  const [category, setCategory] = useState('Tiny Homes');
  const items = useMemo(() => listingsData as any, [])
  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{flex: 1, marginTop: 145, backgroundColor: 'red'}}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
      }}/>
      <Listing listing={items} category={category} />
    </View>
  )
}

export default Page