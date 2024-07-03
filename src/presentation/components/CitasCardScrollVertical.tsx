import { Layout, Text } from '@ui-kitten/components'
import React, { useCallback, useState } from 'react'
import { citasStyles } from '../theme/home/citasStyles'
import PrimaryButton from './PrimaryButton'
import { useDataStore } from '../../core/Infraestructura/adapters/UseDataStore'
import { FlatList, Image, useWindowDimensions } from 'react-native'
import CitasVigentesRepositorio from '../../modules/Citas/CitasVigentesRepositorio'
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useUtils } from '../hooks/useUtils'
import { ModalPopUp } from './ModalPopUp'
import DeleteCitaRepositorio from '../../modules/Citas/DeleteCitaRepositorio'
import { RootTabParams } from '../routes/BottomTabsNavigator'
import { Lstcitavigente } from '../../core/Aplicacion/Dto/CitasVigentesDto'

interface Props {
    personaId: number;
}

export const CitasCardScrollVertical = ({personaId}:Props) => {

    const { width, height } = useWindowDimensions();

    const navigation = useNavigation<NavigationProp<RootTabParams>>();
    const citasVigentesRepositorio = new CitasVigentesRepositorio();
    const deleCitaRepositorio = new DeleteCitaRepositorio();

    const { 
        saveDataCitasVigentesNucleos, 
        dataCitasvigentesNucleos, 
        saveDataCitaVigente 
    } = useDataStore();

    const [selectedCita, setSelectedCita] = useState(0); // Store the selected cita information
    const [tipoModal, setTipoModal] = useState('');
    const [tipoTitle, setTipoTitle] = useState('');


    useFocusEffect(
        useCallback(() => {
            
            obtenerCitasVigentes();
        }, [personaId])
    );

    const obtenerCitasVigentes = async () => {
        const resp = await citasVigentesRepositorio.obtenerCitasVigentes(
                        personaId,
                        personaId,
                        0
                    )
        if ( !resp.isSuccessful ) {
        return;
        }
        
        saveDataCitasVigentesNucleos( resp.data );
    }

    function formatDateToYearMonthDay(dateString: string) {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const day = dateObject.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    function formatTimeTo12Hour(dateString: string) {
        const dateObject = new Date(dateString);
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const amPm = hours < 12 ? 'AM' : 'PM';
        return `${hours}:${minutes} ${amPm}`;
    }

    const {
        abrirModal,
        cerrarModal,
        isModalVisible,
        mensajePopUp,
        setMensajePopUp
    } = useUtils();

    const handleCancelar = async (citaId: number) => {
        
        setSelectedCita(citaId);        
        setTipoModal('confirmarCancelacion');
        setTipoTitle('Cancelar Cita');
        setMensajePopUp('Esta seguro que desea cancelar la cita seleccionada.');
        abrirModal();
        
        
    }

    const cancelarCita = async ()=> {
        const resp = await deleCitaRepositorio.deleteCita(selectedCita, 0);
        
        setTipoModal('citaCancelada');
        if ( !resp.isSuccessful ) {
            setTipoTitle('Error al Cancelar Cita');
            setMensajePopUp(resp.message);
            abrirModal();
            // return;
        } else {
            if(resp.data?.codigo === 200)
            {
                // Update UI after successful cancellation
                setTipoTitle('Cita Cancelada');
                setMensajePopUp('Cita cancelada exitosamente.');
                abrirModal();
                // Refresh citas data after successful cancellation
                obtenerCitasVigentes(); // Call to fetch updated data
            } else {
                setTipoTitle('Alerta');
                setMensajePopUp(resp.data?.mensaje!);
                abrirModal();
            }            
        }
    }

    const handleNavigation = (cita: Lstcitavigente) => {
        saveDataCitaVigente(cita);
        navigation.navigate('Reagendar', {personaId: personaId, citaId: cita.citaid})
    }

    const renderItem = ({item}: {item: Lstcitavigente}) => (
        <Layout style={citasStyles.containerCardCitasVertical}>
            <Layout style={citasStyles.containerInformacion}>
                <Layout style={citasStyles.informacionLeft}>
                    <Text style={[citasStyles.textDetalleCita, {fontSize: (6 + (width * 0.015))}]}>
                        <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: (6 + (width * 0.015)) }}>Establecimiento:</Text> {item.nombreestablecimiento}
                    </Text>
                    <Text style={[citasStyles.textDetalleCita, {fontSize: (6 + (width * 0.015))}]}>
                        <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: (6 + (width * 0.015)) }}>Servicio:</Text> {item.nombreservicio}
                    </Text>
                    <Text style={[citasStyles.textDetalleCita, {fontSize: (6 + (width * 0.015))}]}>
                        <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: (6 + (width * 0.015)) }}>Motivo:</Text> {item.citaMotivo}
                    </Text>
                </Layout>
                <Layout style={citasStyles.informacionRight}>
                    <Layout style={citasStyles.containerHoraVertical}>
                        <Text style={[citasStyles.textDetalleCita, {fontSize: (6 + (width * 0.015))}]}>
                            <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: (6 + (width * 0.015)) }}>Fecha:</Text> {formatDateToYearMonthDay(item.fechahoraprogramada.toString())}
                        </Text>                                            
                        <Text style={[citasStyles.textHora, {fontSize: (8 + (width * 0.015))}]}>
                            HORA: <Text style={[citasStyles.textHora, {fontSize: (8 + (width * 0.015))}]}>{formatTimeTo12Hour(item.fechahoraprogramada.toString())}</Text>
                        </Text>                                                
                        <Layout style={citasStyles.citasEstatus}>                                                
                            <Text style={{color:'#2C338B'}}>Asignada </Text>
                            <Layout style={citasStyles.shapeSpot}></Layout>
                        </Layout> 
                    </Layout>                                                                                      
                </Layout>
            </Layout>                                
            <Layout style={citasStyles.containerButtons}>
                <PrimaryButton
                    label="Reagendar"
                    buttonColor="#4285F4"
                    appearance="filled"
                    whithPercentaje="46%"
                    height={50}
                    nameIcon="arrow-forward-outline"
                    colorIcon="color-primary-100"
                    showIcon={false}
                    textColor={'white'}
                    textSize={16}
                    onPress={() => {handleNavigation(item)}}
                />
                <PrimaryButton
                    label="Cancelar"
                    buttonColor="#265170"
                    appearance="filled"
                    whithPercentaje="46%"
                    height={50}
                    nameIcon="arrow-forward-outline"
                    colorIcon="color-primary-100"
                    showIcon={false}
                    textColor={'white'}
                    textSize={16}
                    onPress={() => {handleCancelar(item.citaid)}}
                />
            </Layout>
        </Layout>
    );

    return (
        <Layout>
        { 
            dataCitasvigentesNucleos?.codigo === 101  ?
            (
                <Layout style={ citasStyles.containerCitasVertical }>
                    <Text style={ citasStyles.titleCitasVertical }>Reagenda o cancela tus citas</Text>
                    <Layout style={ citasStyles.containerCardCitasDefault }>
                        <Image
                            source={require('../../assets/imgs/ICONCALENDAR.png')}
                            style={{ width: 120, height: 120 }}
                        />
                        <Text style={{
                            color: '#828282',
                            width: '50%',
                            textAlign: 'center',
                            fontSize: 20
                            }}>Actualmente la persona seleccionada no tiene citas vigentes.</Text>
                    </Layout>
                </Layout>
            ) :
            (  
                <>
                    <Text style={ citasStyles.titleCitasVertical }>Reagenda o cancela tus citas</Text>
                    <FlatList
                        data={dataCitasvigentesNucleos?.lstcitavigente}
                        keyExtractor={(item) => item.citaid.toString()}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        nestedScrollEnabled={true}
                    />
                </>
            )
        }
        <Layout style={{height: 20}}></Layout>
        {tipoModal === 'confirmarCancelacion' && (
            <ModalPopUp
                titulo={tipoTitle}
                isModalVisible={isModalVisible}
                descripcion={mensajePopUp}
                esModalConfirmacion={true}
                onCancel={ () => {cerrarModal();}}            
                onConfirm={cancelarCita}            
            />
        )}
        {tipoModal === 'citaCancelada' && (
            <ModalPopUp
                titulo={tipoTitle}
                isModalVisible={isModalVisible}
                descripcion={mensajePopUp}
                onAcept={(() => {cerrarModal();})}
            />
        )}        
        </Layout>        
    )
}
