import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  name: string;
  size?: number;
  color?: string;
  paddingLeft?: number;
  paddingRight?: number;
  marginRight?: number;
}

export const IonIcon = ({ 
  name, 
  size = 25, 
  color = 'black', 
  paddingLeft = 0, 
  paddingRight = 0,
  marginRight = 0,  
}:Props) => {
  const iconStyle = {
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
    marginRight: marginRight,
  };
  return (
    <View style={iconStyle}>
      <Icon 
      name={ name } 
      size={ size } 
      color={ color }
    />
    </View>
    
  );
};