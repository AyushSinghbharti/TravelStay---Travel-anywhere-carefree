import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";


interface Props {
  listing: any[];
  category: string;
}

const Listing = ({ listing, category }: Props) => {
  useEffect(() => {
    console.log("reload listing", listing.length);
  }, [category]);
  return (
    <View style={{paddingTop: 20 }}>
      <Text>Listing</Text>
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({});
