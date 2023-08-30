import React from "react";
import { Alert } from "react-native";

export const AlertBox = ({ title, message, buttonText, onButtonPress }) => {
  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    }
  };

  Alert.alert(title, message, [
    {
      text: buttonText,
      onPress: handleButtonPress,
      style: "default",
    },
  ]);

  return null;
};
