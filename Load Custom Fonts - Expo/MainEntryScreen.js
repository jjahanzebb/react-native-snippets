
// The code imports React, some React Native components, and two Expo packages - SplashScreen and Font.

import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// This line prevents the SplashScreen from automatically hiding while the app is loading.

SplashScreen.preventAutoHideAsync();

// This is the main component of the app. It defines a state variable 'appIsReady' and a function to set the state - 'setAppIsReady'. It also defines a useEffect hook to run the 'prepare' function when the component mounts.

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // The 'prepare' function uses the Font package to load custom fonts from the assets folder. It sets a timeout of 1 second to simulate slow loading and then sets the 'appIsReady' state variable to true.

    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Font-One": require("./assets/fonts/Font-One.otf"),
          "Font-Two": require("./assets/fonts/Font-Two.otf"),
        });

        // Artificially delay for one second to simulate a slow loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // This function uses the 'useCallback' hook to create a memoized version of itself that only updates when 'appIsReady' changes. It checks if the app is ready and then uses the SplashScreen package to hide the splash screen.

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // This code checks if the app is ready. If not, it returns null. Otherwise, it returns the app component which renders some text with the custom fonts.

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text>Default Font STYLE</Text>

      <Text style={{ fontFamily: "Font-One" }}>Fone-One STYLE Demo!</Text>
      <Text style={{ fontFamily: "Font-Two" }}>Font-Two STYLE Demo!</Text>
    </View>
  );
}

// This code defines some styles for the app component.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
