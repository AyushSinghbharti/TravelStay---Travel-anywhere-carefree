import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import Colors from "@/constants/Colors";

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10, flex: 1, paddingRight: 50}}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === 0 ? "#000" : Colors.grey,
            textDecorationLine: active === 0 ? "underline" : "none",
          }}
        >
          Stay
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === 1 ? "#000" : Colors.grey,
            textDecorationLine: active === 1 ? "underline" : "none",
          }}
        >
          Experience
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeaderText;

const styles = StyleSheet.create({});
