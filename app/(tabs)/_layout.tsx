import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import {useTheme} from '../../hooks/useTheme';
import { AlertProvider, useAlert } from '@/hooks/AlertContext';
import { CustomAlert } from '@/components/todo-ui/CustomAlert';
import {useSelectionMode, SelectionProvider} from '@/hooks/SelectionLock';

// Create the swipable navigator wrapper
const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);




const Tabslayout = () => {
  
  const {colors, isDarkMode} = useTheme();
  const { isAlertVisible, hideAlert, alertConfig, alertMessage } = useAlert();
  const {isSelectionMode} = useSelectionMode();
  
  return (
    <>
    
    <MaterialTopTabs 
      tabBarPosition='bottom'
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        swipeEnabled: !isSelectionMode, // disable the swiping in selection mode
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          display: isSelectionMode ? 'none' : 'flex', // hide the tab bar in selection mode
          borderTopWidth: 1,
          height: 98,
          paddingBottom: 5,
          paddingTop: 0
          
        },
        tabBarLabelStyle: {fontSize: 12, fontWeight: '600', textTransform: 'none'},
        tabBarIndicatorStyle: {height: 0},  // Removes the default indicator-bar line
        tabBarPressColor: 'transparent', // Removes Android ripple to stay clean
        
      }}>
      <MaterialTopTabs.Screen
        name='index'
        options={{
          title: 'todos',
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name='flash-outline' color={color} size={20} />
          )
        }}/>
      
      <MaterialTopTabs.Screen
        name='settings'
        options={{
          title: 'settings',
          tabBarIcon: ({color} : {color: string }) => (
            <Ionicons name='settings' color={color} size={20} />
          )
        }}/>
      
      </MaterialTopTabs>


      <CustomAlert
        visible={isAlertVisible}
        title="⚠️ Delete Todo !"
        message={alertMessage}
        isDarkMode={isDarkMode}
        onClose={hideAlert}
        onConfirm={() => {
          alertConfig.onConfirm();
          hideAlert();
        }}
      />

    </>
    
    
    
  );
};

export default function TabLayout() {
  return (
    <AlertProvider>
      <SelectionProvider>
        <Tabslayout />
      </SelectionProvider>
    </AlertProvider>
  );
  
}