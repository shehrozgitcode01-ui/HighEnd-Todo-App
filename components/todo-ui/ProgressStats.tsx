import {Text , View} from 'react-native';
import { useState, useEffect} from 'react';
import { getTodos } from '@/services/api';
import {useTheme} from "@/hooks/useTheme";
import { createSettingsStyles } from "@/assets/styles/settings.style";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';


type Todo = {
  _id: string;
  text: string;
  isCompleted: boolean;
};

const ProgressStats = () => {

  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  });

  const completedCount = todos.filter(t => t.isCompleted).length;
  const totalCount = todos.length;
  const activeTodos = totalCount - completedCount

  
  return (
    <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>
      <View style={settingsStyles.statsContainer}>

        {/* TOTAL TODOS */}
        <LinearGradient colors={colors.gradients.background}
          style={[settingsStyles.statCard, {borderLeftColor: colors.primary}]}>
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingsStyles.statIcon}>
              <Ionicons name="list" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{totalCount}</Text>
            <Text style={settingsStyles.statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>

        {/* COMPLETED TODOS */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={colors.gradients.success} style={settingsStyles.statIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{completedCount}</Text>
            <Text style={settingsStyles.statLabel}>Completed</Text>
          </View>
        </LinearGradient>

        {/* ACTIVE TODOS */}

        <LinearGradient
          colors={colors.gradients.background}
          style={[settingsStyles.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={settingsStyles.statIconContainer}>
            <LinearGradient colors={colors.gradients.warning} style={settingsStyles.statIcon}>
              <Ionicons name="time" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={settingsStyles.statNumber}>{activeTodos}</Text>
            <Text style={settingsStyles.statLabel}>Active</Text>
          </View>
        </LinearGradient>
        
      </View>
    </LinearGradient>
    
  );
};

export default ProgressStats;