import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AlertBox } from "../../components/AlertBox";
const phone = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
  }, []);

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };
  return (
    showAlert && (
      <AlertBox
        title="Kontakt"
        message="21212122"
        buttonText="Luk"
        onButtonPress={handleAlertDismiss}
      />
    )
  );
};

export default phone;
