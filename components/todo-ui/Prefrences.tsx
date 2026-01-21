import {useTheme} from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.style";
import { LinearGradient } from "expo-linear-gradient";
import {Switch, Text , View} from 'react-native';
import { useState, useEffect} from 'react';
import { Ionicons } from "@expo/vector-icons";
import  { IosSwitch }  from '@/components/todo-ui/IosSwitch';



const Preferences = () => {

  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);


  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Preferences</Text>
      {/* Dark mode */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.primary} style={settingsStyles.settingIcon}>
            <Ionicons name="moon" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Dark Mode</Text>
        </View>
        <IosSwitch 
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          activeColor={colors.primary}
          inActiveColor={colors.border} // or '#E5E5EA' for standard grey
        />
      </View>

      {/* NOTIFICATONS */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.warning} style={settingsStyles.settingIcon}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Notifications</Text>
        </View>
        <IosSwitch
          value={isNotificationsEnabled}
          onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
          activeColor={colors.warning}
          inActiveColor={colors.border}

        />
      </View>

      {/* AUTO-SYNC */}
      <View style={settingsStyles.settingItem}>
        <View style={settingsStyles.settingLeft}>
          <LinearGradient colors={colors.gradients.success} style={settingsStyles.settingIcon}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.settingText}>Auto Sync</Text>
        </View>
        <IosSwitch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync(!isAutoSync)}
          activeColor={colors.success}
          inActiveColor={colors.border}

        />
      </View>

    </LinearGradient>

  );

};


export default Preferences;