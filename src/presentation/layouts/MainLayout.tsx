import React, { useState, useEffect } from 'react';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction, BottomNavigation, BottomNavigationTab, IconElement, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';
import { StyleSheet } from 'react-native';
import { RootStackParams } from '../routes/StackNavigator';

interface Props {
  title: string;
  subTitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;
  children?: React.ReactNode;
}

const HomeIcon = (pros: any): IconElement => (
  <Icon
    {...pros}
    name='home-outline'
  />
);

const CalendarIcon = (pros: any): IconElement => (
  <Icon
    {...pros}
    name='calendar-outline'
  />
);

const PersonIcon = (pros: any): IconElement => (
  <Icon
    {...pros}
    name='person-outline'
  />
);

export const MainLayout = ({
  title,
  subTitle,
  rightAction,
  rightActionIcon,
  children,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderBackAction = () => (
    <TopNavigationAction 
      icon={ <MyIcon name="arrow-back-outline" color='white'/> }
      onPress={ goBack }
    />
  )

  const RenderRightAction = () => {
    if ( rightAction === undefined || rightActionIcon === undefined ) return null;

    return (
      <TopNavigationAction 
        onPress={ rightAction }
        icon={ <MyIcon name={rightActionIcon} color='white' /> }
      />
    )
  }

  // Define styles for the title
  const titleStyles = StyleSheet.create({
    title: {
      fontSize: 20, // Adjust the font size as desired (e.g., 18, 22)
      fontWeight: 'bold', // Add the bold property
      color: 'white'
    },
  });

  const handleNavigation = (index: number) => {
    setSelectedIndex(index);
    switch (index) {
      case 0:
        navigation.navigate('HomeScreen');
        break;
      case 1:
        navigation.navigate('AgendarCitaScreen');
        break;
      case 2:
        navigation.navigate('PerfilScreen');
        break;
    }
  };

  return (
    <Layout style={{ flex: 1, paddingTop: top, backgroundColor: 'white' }}>
      <TopNavigation 
        title={ () => <Text style={titleStyles.title}>{title}</Text> }
        subtitle={ subTitle }
        alignment="center"
        accessoryLeft={ canGoBack() ? renderBackAction : undefined }
        accessoryRight={ () => <RenderRightAction /> }
        style = {{backgroundColor: '#28516F', height: 63}}
      />
      <Divider />

      <Layout style={{ flex: 1, backgroundColor: 'white' }}>
        {children}
      </Layout>

      <Divider/>
      
      <BottomNavigation
          selectedIndex={selectedIndex}
          onSelect={handleNavigation}
          style = {{backgroundColor: 'white', height: 74}}
        >
          <BottomNavigationTab title='Inicio' icon={HomeIcon}/>
          <BottomNavigationTab title='Nueva Cita' icon={CalendarIcon}/>
          <BottomNavigationTab title='Perfil' icon={PersonIcon}/>
      </BottomNavigation>
    </Layout>
  );
};