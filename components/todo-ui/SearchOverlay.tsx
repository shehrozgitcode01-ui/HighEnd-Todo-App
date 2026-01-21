import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomAlert } from '@/components/todo-ui/CustomAlert'; 
import { useTheme } from '../../hooks/useTheme';
import { editTodo } from '@/services/api';
import {createHomeStyles} from '@/assets/styles/home.style';
import Modal from 'react-native-modal';

type Todo = { _id: string; text: string; isCompleted: boolean; };

interface Props {
  visible: boolean;
  onClose: () => void;
  todos: Todo[];
  onToggleTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: string, text: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export default function SearchOverlay({ visible, onClose, todos, setTodos,  onToggleTodo, onDeleteTodo }: Props) {
  const [query, setQuery] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null);
  
  const { isDarkMode, colors } = useTheme();
  const homestyles = createHomeStyles(colors);

  // --- EDITING STATES ---
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    id: '',
    text: ''
  });

  // --- EDITING HANDLERS ---
  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = async () => {
    if (editingId && editText.trim() !== "") {
      try {
        await editTodo(editingId, editText.trim());

        // Update the main source of truth
        setTodos(prev => prev.map(t => t._id === editingId ? { ...t, text: editText.trim() } : t));

        // Update the local filtered search results
        if (filteredTodos) {
          setFilteredTodos(prev => prev ? prev.map(t => t._id === editingId ? { ...t, text: editText.trim() } : t) : null);
        }

        setEditingId(null);
        setEditText("");
      } catch (error) {
        Alert.alert("Error", "Failed to update todo");
      }
    }
  };

  const handleLocalDelete = (id: string, text: string) => {
    setAlertConfig({ visible: true, id, text });
  };

  const handleSearchChange = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      setFilteredTodos(null); 
    } else {
      setFilteredTodos(null);
    }
  };

  useEffect(() => {
    if (query.trim().length === 0) return;

    const delayDebounceFn = setTimeout(() => {
      const filtered = todos.filter(todo =>
        todo.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTodos(filtered);
    }, 200); 

    return () => clearTimeout(delayDebounceFn);
  }, [query, todos]);


  return (
      <Modal isVisible={visible}
        animationIn="slideInRight" 
        animationOut="slideOutRight"
        animationInTiming={350}
        animationOutTiming={300}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        // Smoothness settings
        backdropTransitionInTiming={350}
        backdropTransitionOutTiming={300}
        style={{margin: 0}}
      
        statusBarTranslucent={true}>
        
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
        <LinearGradient colors={colors.gradients.background} style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }} edges={['top']}>

            {/* Header */}
            <View>
              <Text style={homestyles.SearchHeader}>
                Search
              </Text>
            </View>

            {/* Search Bar UI */}
            <View style={homestyles.searchHeaderContainer}>
              <TouchableOpacity 
                onPress={onClose}
                style={homestyles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>


              <View style={homestyles.searchBarContainer}>
                <Ionicons name="search-outline" size={20} color={colors.textMuted} />

                <TextInput
                  style={homestyles.searchInput}
                  placeholder="Search your todos..."
                  placeholderTextColor={colors.textMuted}
                  value={query}
                  onChangeText={handleSearchChange}
                  autoFocus
                  returnKeyType="search"
                />

                {query.length > 0 && (
                  <TouchableOpacity onPress={() => handleSearchChange("")}>
                    <Ionicons name="close-circle" size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* Search Bar UI End */}

            {/* Results Area */}
            {query.trim().length === 0 ? (
              <View style={homestyles.centerSearchIconContainer}>
                <View style={homestyles.SearchiconCircle}>
                  <Ionicons name="search-outline" size={50} color={colors.primary} />
                </View>
                <Text style={homestyles.searchIconTitle}>Search Todos</Text>
                <Text style={homestyles.searchIconSubtitle}>
                  Start typing to find specific todos in list
                </Text>
              </View>
            ) : filteredTodos === null ? (
              <View style={{ flex: 1 }} />
            ) : filteredTodos.length === 0 ? (
              <View style={homestyles.centerSearchIconContainer}>
                <Ionicons name="alert-circle-outline" size={80} color={colors.textMuted} />
                <Text style={homestyles.searchIconTitle}>No results found</Text>
                <Text style={homestyles.searchIconSubtitle}>
                  We couldn't find any tasks matching "{query}"
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredTodos}
                keyExtractor={(item) => item._id}
                style={homestyles.todoList}
                contentContainerStyle={homestyles.todoListContent}
                renderItem={({ item }) => {
                  const isEditing = editingId === item._id;

                  return (
                    <View style={homestyles.todoItemWrapper}>
                      <LinearGradient colors={colors.gradients.surface} style={homestyles.todoItem}>
                        <TouchableOpacity 
                          style={[homestyles.checkbox, { borderWidth: 0 }]} 
                          onPress={() => onToggleTodo(item)}
                        >
                          <LinearGradient
                            colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
                            style={homestyles.checkboxInner}
                          >
                            {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
                          </LinearGradient>
                        </TouchableOpacity>

                        {isEditing ? (
                          <View style={homestyles.editContainer}>
                            <TextInput
                              style={homestyles.editInput}
                              value={editText}
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
                        ) : (
                          <View style={homestyles.todoTextContainer}>
                            <Text style={[homestyles.todoText, item.isCompleted && { textDecorationLine: "line-through", color: colors.textMuted }]}>
                              {item.text}
                            </Text>
                            <View style={homestyles.todoActions}>
                              <TouchableOpacity onPress={() => handleEditTodo(item)}>
                                <LinearGradient colors={colors.gradients.warning} style={homestyles.actionButton}>
                                  <Ionicons name="pencil" size={14} color="#fff" />
                                </LinearGradient>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => handleLocalDelete(item._id, item.text)}>
                                <LinearGradient colors={colors.gradients.danger} style={homestyles.actionButton}>
                                  <Ionicons name="trash" size={14} color="#fff" />
                                </LinearGradient>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      </LinearGradient>
                    </View>
                  );
                }}
              />
            )}

            <CustomAlert 
              visible={alertConfig.visible}
              title="⚠️ Delete Task"
              message={`Are you sure you want to delete > ${alertConfig.text} ?`}
              isDarkMode={isDarkMode} 
              onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
              onConfirm={async () => {
                setAlertConfig(prev => ({ ...prev, visible: false }));
                setTodos(prev => prev.filter(t => t._id !== alertConfig.id));
                setTimeout(() => {
                  onDeleteTodo(alertConfig.id, alertConfig.text);
                }, 100); 
              }}
            />
          </SafeAreaView>
        </LinearGradient>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }