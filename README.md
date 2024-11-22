# Currency Converter App

This is a Currency Converter App built with **React Native** and **Expo**. The app enables users to convert between different currencies using live exchange rates.

## Get Started

1. Install Dependencies  
   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

2. Start the App  
   Use the following command to start the app:

   ```bash
   npx expo start
   ```

   You can open the app in:
   - Development build
   - Android emulator
   - iOS simulator
   - Expo Go, a limited sandbox for trying out app development with Expo

3. Reset Project  
   To start with a blank project, use:

   ```bash
   npm run reset-project
   ```

   This will reset your app directory for fresh development.

## Features Overview

1. **Top Tab Navigator Setup**  
   `@react-navigation/material-top-tabs` is used to create the `Tab.Navigator`.  
   A single tab (HOME) is linked to the `HomeScreen` component.

2. **Home Screen State Variables**  
   The app uses `useState` to manage the following:
   - `fromCurrency` and `toCurrency` for selected currencies.
   - `amount` for the user-entered input.
   - `convertedAmount` for storing the conversion result.
   - `currencies` for storing the available currency list fetched from the API.

3. **API Key Integration**  
   The `dotenv` library loads the `API_KEY` for the Exchange Rate API.  
   The `fetchExchangeRates` function dynamically fetches exchange rates based on the selected base currency.

4. **Currency Fetch on Component Mount**  
   The `useEffect` hook calls `fetchCurrencies` when the component mounts.  
   - Fetches rates for a default currency (USD) and updates the list of available currencies.

5. **Conversion Logic**  
   The `handleConvert` function:
   - Ensures a valid amount is entered.
   - Fetches rates for `fromCurrency` using `fetchExchangeRates`.
   - Calculates and displays the converted amount (`amount × rate`).
   - Saves the conversion details to `AsyncStorage` for future access.

6. **Currency Swap Feature**  
   The `handleSwap` function swaps `fromCurrency` and `toCurrency`.  
   - Improves usability for quick conversions.

7. **Dynamic Amount Input Handling**  
   The `handleAmountChange` function updates the `amount`.  
   - Clears `convertedAmount` if the input is empty.

8. **UI Components**  
   - **Currency Pickers**:  
     Dropdown options for selecting currencies using `Picker`.  
     Styled with dark themes, cyan borders, and icons for better UX.
   - **Amount Input**:  
     `TextInput` with numeric keyboard and placeholder text.  
     Styled for a dark mode appearance.

9. **Buttons and Output**  
   - **Swap Button**: Allows users to swap the `fromCurrency` and `toCurrency`.
   - **GO Button**: Executes the conversion process.
   - **Output Field**: Displays the conversion result in the format:  
     ```
     fromCurrency ➔ toCurrency
     ```

10. **Styling**  
    Custom styles are defined using `StyleSheet`. Highlights:
    - Cyan and dark backgrounds for a modern, sleek aesthetic.
    - Borders and shadows for dropdowns and input fields.
    - Consistent font sizes and colors for a polished UI.

## Learn More
- **Expo Documentation**: Learn about developing apps with Expo.
- **React Navigation Documentation**: Explore advanced navigation options.

## Join the Community
- **Expo GitHub**: Contribute to the platform.
- **Expo Discord**: Ask questions and interact with the community.
