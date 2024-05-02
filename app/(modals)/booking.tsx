import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { ExperimentalBlurMethod } from "expo-blur";
import { defaultStyles } from "@/constants/Styles";
import { FadeIn, SlideInDown } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";
import DateTimePicker from "@react-native-community/datetimepicker";
//@ts-ignore
// import DatePickerAndroid from "react-native-datepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const Page = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSeletedPlace] = useState(0);
  const [placeName, setPlaceName] = useState("I'm Flexible");
  const [groups, setGroups] = useState(guestsGroups);

  //Test
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  //@ts-ignore
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  //Test

  const onClearAll = () => {
    setSeletedPlace(0);
    setOpenCard(0);
  };
  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      intensity={90}
      tint="light"
      style={styles.container}
    >
      {/* when */}
      {/* where */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeIn.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>{placeName}</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <>
            <Text style={styles.cardHeader}>Where to?</Text>
            <View style={styles.cardbody}>
              <View style={styles.searchSection}>
                <Ionicons
                  style={styles.searchIcon}
                  name="search-outline"
                  size={24}
                  color={Colors.grey}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destination"
                  placeholderTextColor={Colors.grey}
                />
              </View>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 25,
                paddingLeft: 20,
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {places.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSeletedPlace(index);
                    setPlaceName(item.title);
                  }}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={item.img}
                    style={
                      selectedPlace === index
                        ? styles.placeSelected
                        : styles.place
                    }
                  />
                  <Text
                    style={[
                      { fontFamily: "mon", paddingTop: 6 },
                      selectedPlace === index
                        ? { fontFamily: "mon-sb" }
                        : { fontFamily: "mon" },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {/* when */}
      {/* where */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeIn.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week?</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && (
          <View>
            <Text style={[styles.cardHeader, {}]}>When's your trip?</Text>
            <View style={[styles.cardbody, { paddingBottom: 0 }]}>
              <Text style={styles.date}>{date.toDateString()}</Text>
              <TouchableOpacity
                onPress={() => setShow(true)}
                style={styles.dateButton}
              >
                <Text style={styles.dateButtonTitle}>Show Date Picker</Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* when */}
      {/* where */}
      <View style={styles.card}>
        {openCard !== 2 && (
          <TouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guest</Text>
          </TouchableOpacity>
        )}

        {openCard === 2 && (
          <View>
            <Text style={styles.cardHeader}>Who's coming?</Text>
            <View style={styles.cardbody}>
              {/* Rendering guest items */}
              {groups.map((group, index) => (
                <View key={index} style={styles.guestItem}>
                  <Text style={{ fontFamily: "mon", fontSize: 16 }}>
                    {group.name}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 20 }}>
                    <TouchableOpacity
                      onPress={() =>
                        setGroups((prev) => {
                          const newGroups = [...prev];
                          newGroups[index].count -= 1;
                          return newGroups;
                        })
                      }
                    >
                      <Ionicons name="remove" size={24} color={Colors.grey} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "mon", fontSize: 16 }}>
                      {group.count}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setGroups((prev) => {
                          const newGroups = [...prev];
                          newGroups[index].count += 1;
                          return newGroups;
                        })
                      }
                    >
                      <Ionicons name="add" size={24} color={Colors.grey} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Footer */}
      <View
        style={defaultStyles.footer}
        // entering={SlideInDown.delay(300)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={onClearAll}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mon-sb",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClearAll}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={"white"}
              style={[defaultStyles.btnIcon]}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: "mon-sb",
                color: "white",
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    gap: 20,
  },
  previewText: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: "mon-sb",
    fontSize: 14,
    color: Colors.grey,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mon-sb",
    fontSize: 24,
    padding: 20,
  },
  cardbody: {
    paddingHorizontal: 20,
    // paddingBottom: 20,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  placesContainer: {
    flexDirection: "row",
    gap: 25,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 130,
    height: 130,
  },
  dateButton: {
    height: 35,
    backgroundColor: "#55c2da",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  dateButtonTitle: {
    fontFamily: "mon-sb",
    color: "white",
    fontSize: 18,
  },
  date: {
    fontFamily: "mon-sb",
    color: Colors.grey,
    alignSelf: "center",
    paddingBottom: 10,
  },
  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
});

export default Page;
