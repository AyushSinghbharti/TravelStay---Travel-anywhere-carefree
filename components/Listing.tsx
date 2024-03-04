import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { useRef } from "react";
import { Link } from "expo-router";
import { ListingJs } from "@/interfaces/listing";
import { ListRenderItem } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

// interface Props {
//   listing: any[];
//   category: string;
// }

// const Listing = ({ listing: items, category }: Props) => {
//   const [loading, setLoading] = useState(false);
//   const listRef = useRef<FlatList>(null);
//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 200);
//   }, [category]);

//   const renderRow: ListRenderItem<ListingJs> = ({ item }) => (
//     <Link href={`/listing/${item.id}`} asChild>
//       <TouchableOpacity>
//         <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
//           <Image source={{ uri: item.medium_url }} style={styles.image} />
//           <TouchableOpacity
//             style={{ position: "absolute", right: 30, top: 30 }}
//           >
//             <Ionicons name="heart-outline" size={24} color={"black"} />
//           </TouchableOpacity>

//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
//               {item.name}
//             </Text>
//             <View style={{ flexDirection: "row", gap: 4 }}>
//               <Ionicons name="star" size={16} />
//               <Text>{item.review_scores_rating / 20}</Text>
//             </View>
//           </View>

//           <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>
//           <View style={{ flexDirection: "row", gap: 4 }}>
//             <Text style={{ fontFamily: "rob-sb", fontSize: 18 }}>
//               $ {item.price}
//             </Text>
//             <Text style={{ fontFamily: "rob", fontSize: 15 }}>/night</Text>
//           </View>
//         </Animated.View>
//       </TouchableOpacity>
//     </Link>
//   );

//   return (
//     <View style={defaultStyles.container}>
//       <FlatList
//         renderItem={renderRow}
//         ref={listRef}
//         data={loading ? [] : items}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   listing: {
//     padding: 10,
//     gap: 10,
//     marginVertical: 16,
//   },
//   image: {
//     width: "100%",
//     height: 300,
//     borderRadius: 10,
//   },
// });
// export default Listing;

// import { View, Text, StyleSheet, ListRenderItem, TouchableOpacity } from 'react-native';
// import { defaultStyles } from '@/constants/Styles';
// import { Ionicons } from '@expo/vector-icons';
// import { Link } from 'expo-router';
// import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
// import { useEffect, useRef, useState } from 'react';

interface Props {
  listing: any[];
  refresh: number;
  category: string;
}

const Listing = ({ listing: items, refresh, category }: Props) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  // Render one listing row for the FlatList
  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <Animated.Image
            source={{ uri: item.medium_url }}
            style={styles.image}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: "mon-sb" }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>
          <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb" }}>€ {item.price}</Text>
            <Text style={{ fontFamily: "mon" }}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
        ListHeaderComponent={
          <Text style={styles.info}>{items ? items.length : 0} homes</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listing;
