import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecentsScreen() {
  const [lastConversion, setLastConversion] = useState(null);

  const fetchLastConversion = async () => {
    try {
      const data = await AsyncStorage.getItem("lastConversion");
      if (data) {
        setLastConversion(JSON.parse(data));
      } else {
        setLastConversion(null);
      }
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = () => {
      // Listen for any navigation focus events to refresh data
      fetchLastConversion();
    };

    unsubscribe();
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Last Conversion</Text>
      {lastConversion ? (
        <View style={styles.conversionContainer}>
          <Text style={styles.text}>
            {lastConversion.amount} {lastConversion.from} ➔ {lastConversion.to}
          </Text>
          <Text style={styles.result}>{lastConversion.result}</Text>
        </View>
      ) : (
        <Text style={styles.noData}>No recent conversions found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00BCD4",
    marginBottom: 20,
  },
  conversionContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#00BCD4",
    borderRadius: 10,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  result: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00BCD4",
    marginTop: 10,
  },
  noData: {
    fontSize: 18,
    color: "#A0A0A0",
  },
});
