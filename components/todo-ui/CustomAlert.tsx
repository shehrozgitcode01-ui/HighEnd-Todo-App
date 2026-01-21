import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';



interface CustomAlertProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDarkMode: boolean;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ 
  visible, onClose, onConfirm, title, message, isDarkMode 
}) => {
  if (!visible) return null;

  return (
    <View style={styles.fullscreenOverlay} pointerEvents="auto">
      <View style={[styles.alertContainer, { backgroundColor: isDarkMode ? '#1E1E1E' : '#F2F2F2' }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>{title}</Text>
          <Text style={[styles.message, { color: isDarkMode ? '#FFF' : '#000' }]}>{message}</Text>
        </View>

        <View style={[styles.buttonRow, { borderTopColor: isDarkMode ? '#444' : '#C6C6C8' }]}>
          <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.5}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          {/* Vertical Divider Line */}
          <View style={[styles.verticalDivider, { backgroundColor: isDarkMode ? '#444' : '#C6C6C8' }]} />

          <TouchableOpacity style={styles.button} onPress={onConfirm} activeOpacity={0.5}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenOverlay: {
    position: 'absolute',
      top: 0, // Move start point up to cover status bar
      left: 0,
      right: 0,
      bottom: 0, // Move end point down to cover nav bar
      // removing fixed width/height makes it stretch naturally
      backgroundColor: 'rgba(0,0,0,0.6)', 
      justifyContent: 'center', 
      alignItems: 'center',
      zIndex: 999999,
      elevation: 1000,
  },
  alertContainer: {
    width: 275, // Standard iOS alert width
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 20,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    height: 45,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 0.5,
    height: '100%',
  },
  cancelText: {
    color: '#007AFF', // iOS Standard Blue
    fontSize: 17,
    fontWeight: '400',
  },
  deleteText: {
    color: '#FF3B30', // iOS Standard Red
    fontSize: 17,
    fontWeight: '600', // Bold for the destructive action
  },
});