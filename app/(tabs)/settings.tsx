import {ScrollView, Text, View} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {createSettingsStyles}  from '@/assets/styles/settings.style';
import { Ionicons } from '@expo/vector-icons';
import ProgressStats from '@/components/todo-ui/ProgressStats';
import Prefrences from '@/components/todo-ui/Prefrences';

export default function settingScreen () {
  const {toggleDarkMode, colors} = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  
  return (
    <LinearGradient colors={colors.gradients.background} style={settingsStyles.container}>
      <SafeAreaView style={settingsStyles.safeArea} edges={['top']}>
        <View>
          <View style={settingsStyles.header}>
            <View style={settingsStyles.titleContainer}>
              <LinearGradient colors={colors.gradients.primary} style={settingsStyles.iconContainer}>
                <Ionicons name="settings" size={30} color="#ffffff" />
              </LinearGradient>
              <Text style={settingsStyles.title}>Settings</Text>
            </View>
          </View>
        </View>
        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}>
          <ProgressStats/>
          <Prefrences/>
        </ScrollView>      
      </SafeAreaView>
    </LinearGradient>
  )
}