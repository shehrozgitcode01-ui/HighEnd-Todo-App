import {Text, TouchableOpacity, View, StatusBar, FlatList, Alert, TextInput, BackHandler} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {useAlert} from '../../hooks/AlertContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { createHomeStyles } from "@/assets/styles/home.style";
import { getTodos, markTodoDone, markTodoUnDone, deleteTodo, editTodo, deleteMultipleTodos } from '@/services/api';
import{ useState, useEffect } from 'react';
import Header from '@/components/todo-ui/header';
import {useSelectionMode} from '@/hooks/SelectionLock';
import TodoInput from '@/components/todo-ui/TodoInput';
import SearchOverlay from '@/components/todo-ui/SearchOverlay';
import LoadingSpinner from '@/components/todo-ui/LoadingSpinner';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import EmptyState from '@/components/todo-ui/EmptyState';


type Todo = {
  _id: string,
  text: string,
  isCompleted: boolean,
  isTemp?: boolean
}


export default function Index () {

  // useTheme and homestyle
  const {colors} = useTheme();
  const homestyles = createHomeStyles(colors);

  const [refreshKey, setRefreshKey] = useState(0);
  
  // todo States
  const [todos, setTodos] = useState<Todo[]>([]);
  // loding State
  const [loading, setLoading] = useState(true);

  // Alert State
  const {showAlert} = useAlert();

  // Editing States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [edittext, setEditText] = useState('');

  // Selection States
  const {isSelectionMode, setSelectionMode} = useSelectionMode();
  const [selectedIds, setselectedIds] = useState<string[]>([]);

  // Search State
  const [isSearchOpen, setisSearchOpen] =  useState(false);
  
  // FRONTEND API CALL GET 
  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
    setLoading(false); // when the data loads we close the loading spinner UI
  };

  // refresh function
  useEffect(() => {
    loadTodos();
  }, [refreshKey]);

  // FRONTEND API CALL PUT
  // FAST UI AND UX FOR TOGGLE TODO
  const ToggleTodo = async (todo: Todo) => {

    // STEP 1, OPTIMISTIC UPDATE (Instant UI Change)
    // We update the local state imediatetly before the api call
    setTodos(prev => prev.map(t => t._id === todo._id ? {...t, isCompleted: !t.isCompleted} : t))

    // STEP 2, API CALL
    try {
      if (todo.isCompleted) {
        await markTodoUnDone(todo._id);
      }
      else {
        await markTodoDone(todo._id)
      }
      // No need to call loadTodos() here unless you need to sync server-side timestamps
    }
    // STEP 3, ROLLBACK (IF API FAILS)
    // We filp the value back and tell the user
      
    catch (err) {
      setTodos(prev => prev.map(t => t._id === todo._id ? { ...t, isCompleted: todo.isCompleted} : t));
      Alert.alert("Sync Error", "Could not update task. Please try again.")
    }
    
  };

  // FRONTEND API CALL DELETE
  // Fast UI AND UX FOR DELETE TODO
  const HandleDeleteTodo = async (id: string, text: string) => {
    const message =  `Are you sure you wanna delete this todo > ${text}`
    
    showAlert( async () => {
      
      // Step 1: backup of current todo list 
      const previoustodos = [...todos];

      // Step 2: OPTIMISTIC UPDATE, Instant remove a todo 
      setTodos(prev => prev.filter(todo => todo._id !== id));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Step 3: Backend Call
      try {
        await deleteTodo(id);
        // No need to call loadTodos because UI Updated
      }

      catch (err) {
        // Step 4: Roll Back If API Fails
        // we put the items back
        setTodos(previoustodos)
        Alert.alert('Server Error', 'Could not delete task. Please try again later')
      
      } 
    }, message )
  };
  

  // FRONTEND API CALL DELETE MULTPLE
  // FAST UI AND UX FOR DELETE MULTPLE 

  const handleDeleteSelected = () => {
    const message = `Are you sure you want to delete > ${selectedIds.length} selected todos ?`;

    showAlert(async () => {
      // 1. SNAPSHOT: Save a backup of all todos in case the API fails
      const previousTodos = [...todos];
      // Capture IDs immediately because cancelSelection() will clear the state
      const idsToDelete = [...selectedIds]; 

      // 2. OPTIMISTIC UPDATE: Remove selected items from UI immediately
      setTodos(prev => prev.filter(todo => !idsToDelete.includes(todo._id)));

      // 3. UI RESET: Exit selection mode instantly so the user can keep working
      cancelSelection(); 
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      try {
        // 4. API CALL: Happens in the background
        await deleteMultipleTodos(idsToDelete);

        // Success! No need to refresh, the UI is already correct.
      } catch (error) {
        // 5. ROLLBACK: If server fails, put everything back
        setTodos(previousTodos);
        Alert.alert("Error", "Failed to delete items. Restored.");
      }
    }, message);
  };




  
  // EDIT UI FUNCTIONS START
  const HandleEditTodo = (todo: Todo) => {
    setEditText(todo.text)
    setEditingId(todo._id)
  }

  // API CALL PUT 
  const handleSaveEdit = async () => {
    if (editingId && edittext.trim() !== '') {
      try {
         await editTodo(editingId, edittext.trim());
         setEditingId(null);
         setEditText('');
         loadTodos();
      }
      catch (err) {
        console.log(err)
      }
    }
      
  }

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('')

  }
  // EDIT UI FUNCTIONS END 
  

  // SELECTION UI FUNCTIONS START 

  const toggleselection = (id: string) => {
    setselectedIds(prev => {
      const newselection = prev.includes(id)
      ? prev.filter(i => i !== id)
      : [...prev, id];
      if (newselection.length === 0)
      setSelectionMode(false)
      return newselection
    });
  };

  const handleLongpress = (id : string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSelectionMode(true)
    toggleselection(id)
  };


  const handleSelectAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (selectedIds.length === todos.length) {
      setselectedIds([])
      setSelectionMode(false)
    }
    else {
      const allIds = todos.map(i => i._id)
      setselectedIds(allIds)
    }
  }

  const cancelSelection = () => {
    setSelectionMode(false);
    setselectedIds([])
  }

  // ANDROID BACK BUTTON LOGIC --- FOR SELECTION UI
  useEffect(() => {
    const backAction = () => {
      if (isSelectionMode) {
        cancelSelection();
        return true; // Stop the app from closing
      }
      return false; // Normal back behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isSelectionMode]);

  // SELECTION UI FUNCTIONS END
  
  // loading circle 
  if (loading) return <LoadingSpinner/>

  // Todo List UI Start 
  const renderTodoItemView = ({item}: {item:Todo}) => {

    const isEditing = editingId === item._id;
    const isSelected = selectedIds.includes(item._id);
    
    return (
      <View style={homestyles.todoItemWrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          onLongPress={() => handleLongpress(item._id)}
          delayLongPress={300}
          onPress={() => isSelectionMode ? toggleselection(item._id) : null}>
        
        <LinearGradient
          style={[homestyles.todoItem, isSelected && homestyles.todoItemSelection]}
          colors={colors.gradients.surface}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>


          {/* Selection Checkbox UI Start */}
          {isSelectionMode && (
            <View style={{ marginRight: 10 }}>
              <Ionicons 
                name={isSelected ? "checkbox" : "square-outline"} 
                size={24} 
                color={isSelected ? colors.primary : colors.textMuted} 
              />
            </View>
          )}
          {/* Selection Checkbox UI End */}


          {/* Main Check box icon UI Start */}
          {!isSelectionMode && (
            <TouchableOpacity
              style={[homestyles.checkbox, item.isTemp && {opacity: 0.4}]}
              activeOpacity={0.6}
              // Disable the Toggle Button while id is temporary
              disabled={item.isTemp}
              onPress={() => {ToggleTodo(item)}}>
              <LinearGradient
                style={homestyles.checkboxInner}
                colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}>
                {item.isCompleted && <Ionicons name='checkmark' size={18} color='#fff'/>}
              </LinearGradient>
            </TouchableOpacity>
          )}
          {/* Main Check box icon UI End */}

          

          {isEditing ? (

            // editing UI Start 
            <View style={homestyles.editContainer}>
              <TextInput 
                style={homestyles.editInput}
                value={edittext}
                onChangeText={setEditText}
                autoFocus
                multiline
                />
              <View style={homestyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit}>
                  <LinearGradient colors={colors.gradients.success} style={homestyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homestyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelEdit}>
                  <LinearGradient colors={colors.gradients.muted} style={homestyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homestyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            // editing UI End
          ) : (
            
            // Text UI Start
            <View style={homestyles.todoTextContainer}>
              <Text
                style={[homestyles.todoText, 
                        item.isCompleted &&
                        {textDecorationLine: 'line-through', color: colors.textMuted, opacity: 0.8} ]}>
                {item.text}
              </Text>
              {/* Text UI End */}
      

              {!isSelectionMode && (
              
              //  Delete and Edit Button UI Start 
              <View style={[homestyles.todoActions, item.isTemp && {opacity: 0.4}]}>
                <TouchableOpacity onPress={() => HandleEditTodo(item)}
                  activeOpacity={0.3}
                  // Disable the Edit Button while id is temporary 
                  disabled={item.isTemp}>
                  <LinearGradient style={homestyles.actionButton} colors={colors.gradients.warning}>
                    <Ionicons name='pencil' size={14} color='#fff'/>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => HandleDeleteTodo(item._id, item.text)} 
                  activeOpacity={0.3}
                  // Disable the Delete Button while id is temporary
                  disabled={item.isTemp}
                  >
                  <LinearGradient style={homestyles.actionButton} colors={colors.gradients.danger}>
                    <Ionicons name='trash' size={14} color='#fff'/>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              // Delete and Edit Button UI End 
              
              )}
              
            </View>
            
          )}

          
        </LinearGradient>
        </TouchableOpacity>
      </View>
    );  
  };

  // Todo List UI End
  
  // Main UI Screen 
  return (
    <LinearGradient colors={colors.gradients.background} style={homestyles.container}>
      <StatusBar translucent={true} barStyle={colors.statusBarStyle} backgroundColor="transparent" />
      <SafeAreaView style={homestyles.safearea} edges={['top']}>


        {isSelectionMode ? (
        // Selection UI Header
          <View style={homestyles.selectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={cancelSelection}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
              <Text style={homestyles.selectionCount}>{selectedIds.length} Selected</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
              <TouchableOpacity onPress={handleSelectAll} activeOpacity={0.7}>
                <Ionicons 
                  name={selectedIds.length === todos.length ? "checkbox" : "copy-outline"} 
                  size={24} 
                  color={colors.primary} 
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // WE HIDE THE MAIN HEADER IN SELECTION MODE
          <Header todos={todos} />
        )}
        
        {/*We hide the add input in selection mode */}
        {!isSelectionMode && (
        <TodoInput onAdded={loadTodos} onOptimisticAdd={(tempTodo) => setTodos(prev => [tempTodo, ...prev])} />
        )}

        {/*  SELECTION UI BOTTOM ACTION DELETE BUTTON BAR */}
        {isSelectionMode && (
          <View style={homestyles.bottomActionBar}>
            <TouchableOpacity 
              onPress={handleDeleteSelected} 
              style={homestyles.bottomActionItem}
              activeOpacity={0.7}
            >
              <View style={homestyles.deleteIconCircle}>
                <Ionicons name="trash" size={20} color="#fff" />
              </View>
              <Text style={homestyles.bottomActionText}>Delete Selected ({selectedIds.length})</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SEARCH BUTTON */}
        {!isSelectionMode && (
          <TouchableOpacity 
            style={homestyles.searchFabContainer}
            onPress={() => setisSearchOpen(true)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={colors.gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={homestyles.searchFabGradient}
            >
              <Ionicons name="search" size={26} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        )}
        
        <FlatList 
          data={todos}
          renderItem={renderTodoItemView}
          keyExtractor={(item) => item._id}
          style={homestyles.todoList}
          contentContainerStyle={homestyles.todoListContent}
          // Empty State UI
          ListEmptyComponent={<EmptyState/>}
          // Vertical Scroll Indicator 
          showsVerticalScrollIndicator={false}/>

        <SearchOverlay   
          visible={isSearchOpen} 
          setTodos={setTodos}
          todos={todos}
          onClose={() => setisSearchOpen(false)} 
          onToggleTodo={ToggleTodo}
          onDeleteTodo={HandleDeleteTodo}/>
        
      </SafeAreaView>
    </LinearGradient>
  )
}


// default rendering, {todos?.map((Todo) => <Text >{Todo.text}</Text>)}