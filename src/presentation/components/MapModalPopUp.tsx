
import { Modal, StyleSheet, Text, View } from 'react-native'
import { globalColors } from '../theme/theme'
import PrimaryButton from './PrimaryButton';
import { Location, Mapa } from './Mapa';

interface Props {
    isModalVisible: boolean;
    initialLocation: Location;
    onConfirm: () => void;
    onCancel: () => void;
}

export const MapModalPopUp = ({
    isModalVisible = false,
    initialLocation,
    onConfirm,
    onCancel,
}: Props) => {

    return (
        <View style={ styles.contenedorPrincipal } >
            <Modal
                animationType="fade"
                transparent={true}
                visible={ isModalVisible }
            >
                <View style={ styles.contenedorPrincipal2 }>
                    <View style={ styles.modal } >
                        <Text style={ styles.titulo } >Actualizar ubicación</Text>

                        <View style={{ height:300, marginBottom: 20 }} >
                            <Mapa initialLocation={ initialLocation } />
                        </View>
                        
                        <View style={ styles.contenedorBotones }>
                            <PrimaryButton
                                label='Cancelar'
                                textColor={ 'white' }
                                showIcon={ false }
                                appearance={ 'filled' }
                                textSize={ 18 }
                                height={ 55 }
                                marginButton={ 0 }
                                onPress={ onCancel }
                                buttonColor={ globalColors.primary }
                                whithPercentaje={ '45%' }
                            />

                            <PrimaryButton
                                label='Aceptar'
                                textColor={ 'white' }
                                showIcon={ false }
                                appearance={ 'filled' }
                                textSize={ 18 }
                                height={ 55 }
                                marginButton={ 0 }
                                onPress={ onConfirm }
                                buttonColor={ globalColors.primary }
                                whithPercentaje={ '45%' }
                            />
                        </View>
                        
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles= StyleSheet.create({
  contenedorPrincipal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorPrincipal2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modal: {
    width: '80%',
    borderRadius: 30,
    padding: 30,
    backgroundColor: globalColors.white
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black'
  }
});