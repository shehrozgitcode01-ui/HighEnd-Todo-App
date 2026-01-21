import React, { createContext, useContext, useState, ReactNode } from 'react';

type AlertContextType = {
  showAlert: (onConfirm: () => void, customMessage?: string) => void;
  hideAlert: () => void;
  isAlertVisible: boolean;
  alertConfig: { onConfirm: () => void };
  alertMessage: string; // New state for the message
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ onConfirm: () => {} });
  // Default message
  const [alertMessage, setAlertMessage] = useState("Are you sure you want to delete this todo?");

  const showAlert = (onConfirm: () => void, customMessage?: string) => {
    setAlertConfig({ onConfirm });
    // If a custom message is passed, use it; otherwise use default
    if (customMessage) {
      setAlertMessage(customMessage);
    } else {
      setAlertMessage("Are you sure you want to delete this todo?");
    }
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, isAlertVisible, alertConfig, alertMessage }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used with an AlertProvider');
  return context
  
};