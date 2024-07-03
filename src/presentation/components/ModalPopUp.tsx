
import { Modal, StyleSheet, Text, View, Linking } from 'react-native'
import { globalColors } from '../theme/theme'
import PrimaryButton from './PrimaryButton';

interface Props {
    titulo: string,
    isModalVisible: boolean;
    descripcion?: string;
    componente?: JSX.Element | null;
    esModalConfirmacion?: boolean; // Si es true se usan los metodos onConfirm y onCancel, si es false onAcept
    onAcept?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export const ModalPopUp = ({
    titulo,
    isModalVisible = false,
    descripcion = '',
    componente = null,
    esModalConfirmacion = false,
    onAcept = () => {},
    onConfirm = () => {},
    onCancel = () => {},
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
                        <Text style={ styles.titulo } > { titulo }</Text>

                        {
                            ( descripcion === '' )
                            ?
                                <></>
                            :
                            <Text style={ styles.body }> {descripcion}</Text>                            
                        }
                        {componente}
                        {
                            esModalConfirmacion
                            ?
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
                                        buttonColor={ globalColors.darkSmoke }
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
                            :
                                <View style={{ alignItems: 'center' }}>
                                    <PrimaryButton
                                        label='Aceptar'
                                        textColor={ 'white' }
                                        showIcon={ false }
                                        appearance={ 'filled' }
                                        textSize={ 18 }
                                        height={ 55 }
                                        marginButton={ 0 }
                                        onPress={ onAcept }
                                        buttonColor={ globalColors.primary }
                                        whithPercentaje={ '50%' }
                                    />
                                </View>
                        }
                        
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
  },
  body: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black'
  }
});