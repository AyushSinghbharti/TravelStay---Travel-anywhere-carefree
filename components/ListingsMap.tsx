import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { ListingGeo } from "@/interfaces/mapListings";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = ({ listings }: Props) => {
  const router = useRouter();
  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };

  return (
      <MapView
        clusterColor="white"
        clusterTextColor="black"
        clusterFontFamily="rob-sb"
        animationEnabled={false}
        style={[StyleSheet.absoluteFill, defaultStyles.container]}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={INITIAL_REGION}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>
                $ {item.properties.price} /per night
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
  );
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: "white",
    padding: 6,
    elevation: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  markerText: {
    fontFamily: "rob-b",
  },
});
export default ListingsMap;
