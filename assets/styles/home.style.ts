import { ColorScheme } from "@/hooks/useTheme";
import { Platform, StyleSheet } from "react-native";


export const createHomeStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create ({
    container: {
      flex: 1
    },
    
    safearea: {
      flex: 1
    },

    // header UI Styling Start 
    header: {
      paddingHorizontal: 24,
      paddingVertical: 28,
      paddingBottom: 24,
    },
    
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },

    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 18,
    },
    
    titleTextContainer: {
      flex: 1,
    },

    title: {
      fontSize: 32,
      fontWeight: "700",
      letterSpacing: -1,
      marginBottom: 4,
      color: colors.text,
    },
    
    subtitle: {
      fontSize: 17,
      fontWeight: "500",
      color: colors.textMuted,
    },
    // header UI Styling End

    // Progress Bar UI Styling Start 
    progressContainer: {
      marginTop: 8,
    },
    
    progressBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    
    progressBar: {
      flex: 1,
      height: 12,
      borderRadius: 6,
      overflow: "hidden",
      backgroundColor: colors.border,
    },
    
    progressFill: {
      height: "100%",
      borderRadius: 6,
    },
    
    progressText: {
      fontSize: 16,
      fontWeight: "700",
      minWidth: 40,
      textAlign: "center",
      color: colors.success,
    },
    // Progress Bar UI Styling Start 

    // Input Bar UI Styling Start 
    inputSection: {
      paddingHorizontal: 24,
      paddingBottom: 12,
    },
    
    inputWrapper: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 16,
    },
    
    input: {
      flex: 1,
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 17,
      maxHeight: 120,
      fontWeight: "500",
      backgroundColor: colors.backgrounds.input,
      borderColor: colors.border,
      color: colors.text,
    },
    
    inputFocused: {
      borderColor: colors.primary,
    },
    // Input Bar UI Styling End here 

    // Add Button UI Styling Start 
    addButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    
    addButtonDisabled: {
      opacity: 0.5,
    },
    // Add Button UI Styling End here

    // Loading UI Styling Start 
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    
    loadingText: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: "500",
      color: colors.text,
    },
    // Loading UI Styling End Here

    // Todo Items UI Styling Start 
    todoList: {
      flex: 1,
    },
    
    todoListContent: {
      paddingHorizontal: 24,
      paddingBottom: 100,
    },

    todoItemWrapper: {
      marginVertical: 12,
    },

    todoItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 20,
      borderRadius: 20,
    },

    // check box UI start 
    checkbox: {
      marginRight: 16,
      marginTop: 2,
    },
    
    checkboxInner: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      borderColor: 'transparent',
    },
    // check box UI end

    // Todo text UI Start 
    todoTextContainer: {
      flex: 1,
    },
    
    todoText: {
      fontSize: 17,
      lineHeight: 24,
      fontWeight: "500",
      marginBottom: 16,
      color: colors.text,
    },
    // Todo text UI End

    // Delete and Edit button UI Start
    todoActions: {
      flexDirection: "row",
      gap: 12,
    },
    
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    // Delete and Edit button UI End

    // Empty UI Start 
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 80,
    },
    
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
    },
    
    emptyText: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 8,
      color: colors.text,
    },
    
    emptySubtext: {
      fontSize: 17,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 24,
      color: colors.textMuted,
    },
    // Empty UI End 



    // Edit UI Start 
    editContainer: {
      flex: 1,
    },
    
    editInput: {
      borderWidth: 2,
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 17,
      fontWeight: "500",
      marginBottom: 16,
      backgroundColor: colors.backgrounds.editInput,
      borderColor: colors.primary,
      color: colors.text,
    },
    
    editButtons: {
      flexDirection: "row",
      gap: 12,
    },
    
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
    },
    
    editButtonText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "600",
    },
    // Edit UI End


    // Selection UI Start
    
    selectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.surface,
      borderRadius: 15,
      marginBottom: 0,
      elevation: 4,
      },

    selectionCount: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '700',
      marginLeft: 15,
      },

    touchableArea: {
      borderRadius: 20, // Must match the gradient
      backgroundColor: 'transparent', // FIX: Prevents the black underlay box
    },

    todoItemSelection: {
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 20,   
      },
    
    // Selection UI Delete Button and Bar
    bottomActionBar: {
      position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.surface, // Use your dark theme surface color
        borderTopWidth: 1,
        borderTopColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        // 🔥 THE SECRET SAUCE:
        // Adds extra padding at the bottom for iPhone notches/Android bars
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 35 : 45, 
        paddingHorizontal: 25,

        // Shadow to make it look like it's floating over the list
        elevation: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        zIndex: 1000, // Ensures it stays on top of all other elements
      },

    bottomActionItem: {
      flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.danger + '20', // Subtle red tint
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.danger + '40',
        gap: 15,
        width: '100%', // Makes it a nice wide professional button
    },

    deleteIconCircle: {
      backgroundColor: colors.danger,
      padding: 6,
      borderRadius: 8,
    },

    bottomActionText: {
      color: colors.danger,
      fontSize: 16,
      fontWeight: '700',
    },
    
    // Selection UI End

    // Search UI Start 
    
    SearchHeader: {
     fontSize: 34, 
     fontWeight: '600', 
     color: colors.text,
     letterSpacing: -0.5,
     left: 17
    },

    searchHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 15,
      gap: 12,
    },

    backButton: {
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      // Shadow for depth
      shadowColor: "#fff",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    searchBarContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 15,
      height: 48,
      borderWidth: 1,
      borderColor: colors.border,
      // Subtle shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },

    searchInput: {
      flex: 1,
      height: '100%',
      color: colors.text,
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '500',
    },

    // --- Empty States (No Results / Start Typing) ---
    centerSearchIconContainer: {
      flex: 0.8, // Pushes content slightly up from dead center
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },

    SearchiconCircle: {
      backgroundColor: colors.surface,
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      elevation: 4,
    },

    searchIconTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },

    searchIconSubtitle: {
      fontSize: 16,
      color: colors.textMuted,
      textAlign: 'center',
      lineHeight: 22,
    },

    searchFabContainer: {
      position: 'absolute',
      bottom: 25,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      // High-quality Shadow for iOS
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      // Elevation for Android
      elevation: 8,
      zIndex: 1000,
      },

    searchFabGradient: {
      flex: 1,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)', // Subtle inner border for a "glass" look
      },
  });

  return styles;
};


