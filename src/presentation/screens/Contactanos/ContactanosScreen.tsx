import { Icon, type IconProps } from "@ui-kitten/components";
import { Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import call from 'react-native-phone-call';
import PrimaryButton from "../../components/PrimaryButton";
import { globalColors, globalStyles } from "../../theme/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CanGoBackHeader } from "../../components/shared/CanGoBackHeader";

export const ContactanosScreen = () => {
  const { top } = useSafeAreaInsets();

  const handleCall = () => {
    const args = {
      number: '171', // Número de teléfono a llamar
      prompt: true,  // Muestra un prompt antes de realizar la llamada
    };
    call(args).catch(console.error);
  };

  const handleVisitWebsite = () => {
    Linking.openURL('http://www.citas.med.ec').catch((err) => console.error('An error occurred', err));
  };

  return (
    
    <View style={{
      flex: 1,
      // paddingHorizontal: 20,
      marginTop: top,
      backgroundColor: '#FAF9FC'
    }}>
      <CanGoBackHeader parm={true}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{...globalStyles.container, backgroundColor: '#FAF9FC'}}>
          <View style={styles.contenedorLogo}>
            <Image

              source={require('../../../assets/imgs/LogoContacto.png')} />
          </View>
          <Text style={styles.subHeader}>Contáctanos</Text>
          <Text style={styles.description}>
            Comunícate con nuestro Call Center para recibir atención personalizada y resolver cualquier duda.
          </Text>
          <PrimaryButton
            label="Llamar al 171"
            buttonColor={globalColors.primary}
            appearance={'filled'}
            height={55}
            whithPercentaje={'100%'}
            textColor={'white'}
            showIcon={true}
            nameIcon="phone-outline"
            iconPosition="left"
            textSize={18}
            onPress={handleCall}
          />
          <PrimaryButton
            label="Visita www.citas.med.ec"
            buttonColor={globalColors.primary}
            appearance={'filled'}
            height={55}
            whithPercentaje={'100%'}
            textColor={'white'}
            showIcon={false}
            textSize={18}
            onPress={handleVisitWebsite}
          />
        </View>

        <View style={styles.imageFooter}>
          <Image
            style={styles.logoImage}
            source={require('../../../assets/imgs/logoCallCenter.png')} />
        </View>
      </ScrollView>

    </View>

  )
}
const styles = StyleSheet.create({
  contenedorLogo: {
    // flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',

  },
  contenedorPrincipal: {
    flex: 1,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    paddingHorizontal: 50,
    paddingTop: 40,
    backgroundColor: globalColors.white,
  },

  subHeader: {
    marginVertical: 10,
    lineHeight: 20.57,
    textAlign: 'center',
    marginTop: 50,
  },
  description: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  imageFooter: {
    // width: '100%',
    height: 450
  },
  logoImage: {
    flex: 1, // Make the image itself take all available space within the container
    resizeMode: 'cover', // Maintain
    width: '100%'
  }
});

