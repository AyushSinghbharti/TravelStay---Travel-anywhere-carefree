import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();

  const {startOAuthFlow: googleAuth} = useOAuth({strategy: 'oauth_google'});
  const {startOAuthFlow: facebookAuth} = useOAuth({strategy: 'oauth_facebook'});
  const {startOAuthFlow: appleAuth} = useOAuth({strategy: 'oauth_apple'});

  const onSelectAuth = async(strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
      [Strategy.Apple]: appleAuth,
    }[strategy];

    try{
      const {createdSessionId, setActive} = await selectedAuth();
      console.log("Output createdSessionID from loginPage: ",createdSessionId);

      if(createdSessionId){
        setActive!({session: createdSessionId});
        router.back();
      }

    }catch(error){
      console.log("Error occuring while login (login page error): ", error);
    }
  }

  return (
    <View style={[styles.container, defaultStyles.container]}>
      <TextInput
        autoCapitalize="none"
        placeholder="email"
        style={[defaultStyles.inputFeild, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={[defaultStyles.btn]}>
        <Text style={[defaultStyles.btnText]}>Login</Text>
      </TouchableOpacity>

      <View style={[styles.seperatorView]}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={[styles.seperator]}>Or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{gap: 20}}>
        <TouchableOpacity style={[styles.btnOutline]}>
          <Feather
            style={[defaultStyles.btnIcon]}
            name="phone"
            size={24}
            color="royalblue"
          />
          <Text style={[styles.btnOutlineText]}>Continue With Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnOutline]} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons
            style={[defaultStyles.btnIcon]}
            // name="md-logo-apple"
            name="logo-apple"
            size={25}
            color="black"
          />
          <Text style={[styles.btnOutlineText]}>Continue With Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnOutline]} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons
            style={[defaultStyles.btnIcon]}
            name="logo-google"
            size={25}
            color="royalblue"
          />
          <Text style={[styles.btnOutlineText]}>Continue With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnOutline]} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons
            style={[defaultStyles.btnIcon]}
            name="logo-facebook"
            size={25}
            color="royalblue"
          />
          <Text style={[styles.btnOutlineText]}>Continue With Facebook</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "rob-sb",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 50,
  },
  btnOutlineText: {
    color: Colors.grey,
    fontSize: 16,
    fontFamily: "mon-b",
  },
});

export default Page;
