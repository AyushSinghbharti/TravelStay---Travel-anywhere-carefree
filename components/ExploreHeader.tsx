import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from 'expo-haptics'

const categories = [
  { name: "Accommodation", logo: "bed" },
  { name: "Adventure", logo: "planet" },
  { name: "Beach", logo: "umbrella" },
  { name: "Camping", logo: "bonfire" },
  { name: "City Tours", logo: "navigate" },
  { name: "Cultural Experiences", logo: "earth" },
  { name: "Food & Dining", logo: "restaurant" },
  { name: "Hiking", logo: "walk" },
  { name: "Historical Sites", logo: "flag" },
  { name: "Luxury", logo: "diamond" },
  { name: "Nature", logo: "leaf" },
  { name: "Nightlife", logo: "beer" },
  { name: "Outdoor Activities", logo: "bicycle" },
  { name: "Photography", logo: "camera" },
  { name: "Relaxation", logo: "water" },
  { name: "Shopping", logo: "cart" },
  { name: "Sightseeing", logo: "eye" },
  { name: "Spa & Wellness", logo: "medkit" },
  { name: "Sports", logo: "football" },
  { name: "Theme Parks", logo: "game-controller" },
  { name: "Water Sports", logo: "boat" },
  // Add more categories as needed
];

interface Props {
  onCategoryChanged: (category: string) => void
}

const ExploreHeader = ({onCategoryChanged}: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };
  return (
    <View style={[styles.main]}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
                <Text style={{ fontFamily: "rob" }}>Anywhere . Any week</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={24} color={"black"} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectCategory(index)}
              ref={(el) => (itemsRef.current[index] = el)}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
            >
              <Ionicons
                name={item.logo as any}
                size={24}
                color={activeIndex === index ? "black" : Colors.grey}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 35,
  },
  container: {
    backgroundColor: "white",
    height: 150,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
    gap: 10,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 25,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2",
    borderWidth: 1,
    flex: 1,
    borderRadius: 30,
    padding: 10,
    backgroundColor: "white",
    elevation: 5,
    shadowOpacity: 0.15,
    shadowColor: "black",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "rob",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "black",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
export default ExploreHeader;
