### Preview
![Bottom Tab Demo](https://user-images.githubusercontent.com/93594492/235438583-a83b775d-8ec8-4389-8e88-5225a5fc4a9a.gif)

### Project Repo
```
git clone https://github.com/jjahanzebb/rn-custom-bottom-tabs.git
```

### Code
> File Path: project/App.js
```javascript
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { Foundation, FontAwesome5 } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import your colors here
const colors = {
  blue: "#088FF1",
  purewhite: "#FFFFFF",
  white: "#F6F8FA",
  lightgray: "#9EABBE",
};

// Import any SVG to be used as Icon
import FavoriteIcon from "./assets/icons/heart.4.svg";
import CategoryIcon from "./assets/icons/category.2.svg";

// Import your screens here
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import ShopsScreen from "./src/screens/ShopsScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";

// This line prevents the SplashScreen from automatically hiding while the app is loading.
SplashScreen.preventAutoHideAsync();

export default App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Main-Font": require("./assets/fonts/Main-Font.otf"),
          "Secondary-Font": require("./assets/fonts/Secondary-Font.otf"),
        });

        // Artificially delay for one second to simulate a slow loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  if (appIsReady) {
    SplashScreen.hideAsync();
  }

  if (!appIsReady) {
    return null;
  }

  // Stack Navigator
  const MainStack = createNativeStackNavigator();

  const MainStackNavigator = () => {
    return (
      <MainStack.Navigator
        initialRouteName="MainTabScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="MainTabScreen" component={MainTabScreen} />

        <MainStack.Screen name="Login" component={LoginScreen} />

        <MainStack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
        />
        <MainStack.Screen name="Favorites" component={FavoritesScreen} />
        <MainStack.Screen name="Shops" component={ShopsScreen} />
      </MainStack.Navigator>
    );
  };

  // Tab Navigator
  const Tab = createBottomTabNavigator();

  const MainTabScreen = () => {
    return (
      <Tab.Navigator
        // Style Bottom Tabs Navigator Container
        screenOptions={{
          tabBarStyle: {
            height: 75,
            backgroundColor: colors.purewhite,

            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.tabBarIconContainer]}>
                <Foundation
                  name="home"
                  size={28}
                  color={focused ? colors.blue : colors.lightgray}
                />
                {focused && <View style={styles.tabBarIconUnderline} />}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconContainer}>
                <CategoryIcon
                  width={26}
                  height={26}
                  fill={focused ? colors.blue : colors.lightgray}
                />

                {focused && <View style={styles.tabBarIconUnderline} />}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.tabBarIconContainer]}>
                <FavoriteIcon
                  width={30}
                  height={30}
                  fill={focused ? colors.blue : colors.lightgray}
                />

                {focused && <View style={styles.tabBarIconUnderline} />}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.tabBarIconContainer]}>
                <FontAwesome5
                  name="user-alt"
                  size={22}
                  color={focused ? colors.blue : colors.lightgray}
                />
                {focused && <View style={styles.tabBarIconUnderline} />}
              </View>
            ),
          }}
        />

        {/* Add more screens here... */}
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  tabBarIconContainer: {
    alignItems: "center",
  },
  tabBarIconUnderline: {
    marginTop: 5,
    height: 3,
    width: 10,
    backgroundColor: colors.blue,
    borderRadius: 10,
  },
});

```
