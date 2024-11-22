import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RecentsScreen from "./recents";
// import RecentsScreen from "./recents";
const Tab = createMaterialTopTabNavigator();

export default function foryou() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HOME" component={HomeScreen} />
    </Tab.Navigator>
  );
}

// Home Screen
const HomeScreen = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Fetch exchange rates on mount
    const fetchCurrencies = async () => {
      const rates = await fetchExchangeRates("USD"); // Default to USD
      if (rates) {
        setCurrencies(Object.keys(rates));
      }
    };
    fetchCurrencies();
  }, []);

  const fetchExchangeRates = async (baseCurrency) => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/700a98f839be057583795c24/latest/${baseCurrency}`
      );
      const data = await response.json();

      if (data.result === "success") {
        return data.conversion_rates;
      } else {
        console.error("Error fetching rates:", data["error-type"]);
      }
    } catch (error) {
      console.error("Error with API call:", error);
    }
  };

  const handleConvert = async () => {
    if (!amount) {
      alert("Please enter an amount to convert.");
      return;
    }

    const rates = await fetchExchangeRates(fromCurrency);
    if (rates) {
      const result = (parseFloat(amount) * rates[toCurrency]).toFixed(2);
      setConvertedAmount(result);

      // Save the last conversion to AsyncStorage
      try {
        const conversion = {
          from: fromCurrency,
          to: toCurrency,
          amount: amount,
          result: result,
        };
        await AsyncStorage.setItem(
          "lastConversion",
          JSON.stringify(conversion)
        );
        console.log("Saved successfully:", conversion);
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    }
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleAmountChange = (value) => {
    setAmount(value);

    // Clear the output when the input amount is empty
    if (value === "") {
      setConvertedAmount("0");
    }
  };

  return (
    <View style={styles.container}>
      {/* App Name */}
      <Text style={styles.heading}>XchAnGE</Text>

      {/* Dropdown for 'From' Currency */}
      <View style={styles.currencySelector}>
        <Picker
          selectedValue={fromCurrency}
          onValueChange={(itemValue) => setFromCurrency(itemValue)}
          style={styles.picker}
        >
          {currencies.map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color="#00BCD4" // Change the arrow color here
          style={styles.arrowIcon}
        />
      </View>

      {/* Input for Amount */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.swapIcon} onPress={handleSwap}>
          <Text style={styles.swapIconText}>↑↓</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          placeholderTextColor="#A0A0A0"
          onChangeText={handleAmountChange}
        />
      </View>

      {/* Dropdown for 'To' Currency */}
      <View style={styles.currencySelector}>
        <Picker
          selectedValue={toCurrency}
          onValueChange={(itemValue) => setToCurrency(itemValue)}
          style={styles.picker}
        >
          {currencies.map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color="#00BCD4" // Change the arrow color here
          style={styles.arrowIcon}
        />
      </View>

      {/* GO Button */}
      <TouchableOpacity style={styles.goButton} onPress={handleConvert}>
        <Text style={styles.goText}>GO</Text>
      </TouchableOpacity>

      {/* Output Field */}
      <View style={styles.outputField}>
        <Text style={styles.outputLabel}>
          {fromCurrency} ➔ {toCurrency}
        </Text>
        <Text style={styles.outputValue}>{convertedAmount || "0.00"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212", // Dark blue background
  },

  dropdownContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // borderWidth: 2,
    // borderColor: "#00BCD4", // Cyan border
    // borderRadius: 20,
    // backgroundColor: "#1E1E1E", // Dark gray background
    // padding: 10,
    // width: "80%",
    // marginVertical: 10,

    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#00BCD4", // Cyan border
    borderRadius: 20,
    backgroundColor: "#1E1E1E", // Dark gray background
    padding: 10,
    width: "80%",
    marginVertical: 10,
  },
  heading: {
    fontSize: 49,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -90,
    marginBottom: 100,
    color: "#00BCD4", // Cyan
    textShadowColor: "#A0A0A0", // Light gray shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  currencySelector: {
    borderWidth: 2,
    borderColor: "#00BCD4", // Cyan
    borderRadius: 20,
    width: "80%",
    marginVertical: 10,
    backgroundColor: "#1E1E1E", // Dark gray for dropdown
    padding: 10,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#FFFFFF", // White text
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  swapIcon: {
    borderWidth: 2,
    borderColor: "#00BCD4", // Cyan border
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    backgroundColor: "#1E1E1E", // Dark background for the icon
  },
  swapIconText: {
    color: "#FFFFFF", // White text for icon
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#00BCD4", // Cyan border
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#1E1E1E", // Dark gray input background
    color: "#FFFFFF", // White text
  },
  goButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#00BCD4", // Cyan background
    borderWidth: 1.2,
    borderRadius: 20,
    width: "40%",
  },
  goText: {
    textAlign: "center",
    color: "#121212", // Dark text for contrast
    fontWeight: "bold",
    fontSize: 16,
  },
  outputField: {
    borderWidth: 2,
    borderColor: "#00BCD4", // Cyan border
    borderRadius: 10,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#1E1E1E", // Dark gray output field
  },
  outputLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A0A0A0", // Light gray text
    textAlign: "center",
    marginBottom: 5,
  },
  outputValue: {
    fontSize: 28,
    color: "#00BCD4", // Cyan for emphasis
    textAlign: "center",
  },
});

// function RecentsScreen() {
//   return (
//     <View>
//       <Text style={{ textAlign: "center" }}>Recent Computations</Text>
//     </View>
//   );
// }

function Updates() {
  return;
}
