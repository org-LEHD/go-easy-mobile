import React from "react";
import { Alert } from "react-native";
import { AlertDialog } from "./Types";
  

export const AlertBox: React.FC<AlertDialog> = ({ title, message, buttonText, onButtonPress }) => {
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
