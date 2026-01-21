import {Text, View} from 'react-native';
import {useTheme} from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import {createHomeStyles} from '@/assets/styles/home.style';
import { LinearGradient } from 'expo-linear-gradient';


type Props = {
  todos: {
    _id: string,
    text: string,
    isCompleted: boolean
  } [];
};


const Header = ({todos}: Props) => {
  const {colors} = useTheme();
  const homestyles = createHomeStyles(colors);

  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.isCompleted).length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    // Header UI Start
    <View style={homestyles.header}>
      <View style={homestyles.titleContainer}>
        <LinearGradient colors={colors.gradients.primary} style={homestyles.iconContainer}>
          <Ionicons name='flash-outline' size={31} color='#ffffff'/>
        </LinearGradient>
        <View>
          <Text style={homestyles.title}>Today's Tasks 👀</Text>
          <Text style={homestyles.subtitle}> Total  {totalCount}  |  Completed  {completedCount}</Text>
        </View>
      </View>
      {/* Header UI End */}

    {/* Progress Bar UI Start*/}
    <View style={homestyles.progressContainer}>
      <View style={homestyles.progressBarContainer}>
        <View style={homestyles.progressBar}>
          <LinearGradient colors={colors.gradients.success} style={[homestyles.progressFill, {width: `${progressPercentage}%`}]}/>
        </View>
        <Text style={homestyles.progressText}>{Math.round(progressPercentage)}%</Text>
      </View>
    </View>
    {/* Progress Bar UI End*/}
   
    </View>
    
  );
};

export default Header;