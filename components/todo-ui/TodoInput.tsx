import {Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import {addTask} from '@/services/api';
import {useTheme} from '@/hooks/useTheme';
import {createHomeStyles} from '@/assets/styles/home.style';
import {LinearGradient} from 'expo-linear-gradient';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type Todo = { 
  _id: string; 
  text: string; 
  isCompleted: boolean; 
  isTemp?: boolean; 
};

type Props = {
  onAdded: () => void;
  // 🔥 NEW PROP: Required to show the item instantly
  onOptimisticAdd: (todo: Todo) => void; 
};

const TodoInput = ({onAdded, onOptimisticAdd}: Props) => {
  const {colors} = useTheme();
  const homestyles = createHomeStyles(colors);
  // we use useState for dynamic data
  const [newTodo, setNewTodo] = useState("")
  const [isSaving, setIsSaving] = useState(false)


  // FAST UI AND UI FOR EDIT TODO
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    const textToSave = newTodo.trim();
    setIsSaving(true); // Prevent double submission

    // 1. Create a "Temporary" todo object
    const tempId = Date.now().toString(); 
    const tempTodo: Todo = {
      _id: tempId,
      text: textToSave,
      isCompleted: false,
      isTemp: true, 
    };

    // 2. OPTIMISTIC UPDATE: Add to UI immediately
    setNewTodo(""); // Clear input instantly

    // 🔥 PUSH TO PARENT: This makes it appear in the list instantly
    onOptimisticAdd(tempTodo); 

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      // 3. API CALL
      await addTask(textToSave); 

      // 4. SYNC: Refresh the data to get the real ID from Convex
      onAdded(); 
    } catch (err) {
      // 5. ROLLBACK: If server fails, remove the temp item and put text back
      setNewTodo(textToSave);
      Alert.alert("Error", "Could not save task. Please try again.");
      onAdded(); // Refresh to clean up the temp item
    }
    finally {
      setIsSaving(false);
    }
  };


  return (
    <View style={homestyles.inputSection}>
      <View style={homestyles.inputWrapper}>
        <TextInput
          style={homestyles.input}
          placeholder='Whats need to be done ?'
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
          />
          <TouchableOpacity 
            onPress={handleAddTodo}
            activeOpacity={0.8}>
            <LinearGradient 
              colors={
                newTodo.trim()
                  // ternary operator
                  ? colors.gradients.primary
                  : colors.gradients.muted
            }
              style={homestyles.addButton}>
              <Ionicons name='add' size={30} color='#ffffff'/>
            </LinearGradient>
            
          </TouchableOpacity>
      </View>
    </View>
  )
   
};


export default TodoInput;