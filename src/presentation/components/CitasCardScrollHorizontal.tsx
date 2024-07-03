import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { citasStyles } from '../theme/home/citasStyles'
import PrimaryButton from './PrimaryButton'
import { useDataStore } from '../../core/Infraestructura/adapters/UseDataStore'
import { FlatList, Image, Linking, useWindowDimensions } from 'react-native'

export const CitasCardScrollHorizontal = () => {

    const { width, height } = useWindowDimensions();

    const { dataCitasvigentes } = useDataStore();

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

    return (
        <>
            { dataCitasvigentes?.codigo === 101 || dataCitasvigentes === undefined ?
                (
                    <Layout style={ citasStyles.containerCitas }>
                        <Text style={ citasStyles.titleCitas }>Tus Citas</Text>
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
                                }}>Actualmente la persona no tiene citas vigentes.</Text>
                        </Layout>
                    </Layout>
                ) :
                (                    
                    <Layout style={ [citasStyles.containerCitas, { width: dataCitasvigentes?.lstcitavigente.length === 1 ? width - 40 : '100%' }] }>
                        <Text style={ citasStyles.titleCitas }>Tus Citas</Text>
                        <FlatList
                            data={dataCitasvigentes?.lstcitavigente}
                            keyExtractor={(item) => item.citaid.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => (
                                <Layout style={ [citasStyles.containerCardCitas, { width: dataCitasvigentes?.lstcitavigente.length === 1 ? width - 40 : width - 70 }] }>                                
                                    <Layout style={citasStyles.containerCitasLeft}>
                                        <Text style={[citasStyles.textDetalleCita, {fontSize: (6 + (width * 0.015))}]}>
                                            <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: (8 + (width * 0.015)) }}>Establecimiento:</Text> {item.nombreestablecimiento}</Text>
                                        <Text style={[citasStyles.textDetalleCita, {fontSize: (6 + (width * 0.015))}]}>
                                            <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: (8 + (width * 0.015)) }}>Servicio:</Text> {item.nombreservicio}</Text>
                                        <Text style={[citasStyles.textDetalleCita, {fontSize: (6 + (width * 0.015))}]}>
                                            <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: (8 + (width * 0.015)) }}>Motivo:</Text> {item.citaMotivo}</Text>
                                        <Text style={[citasStyles.textDetalleCita, {fontSize: (6 + (width * 0.015))}]}>
                                            <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: (8 + (width * 0.015)) }}>Fecha:</Text> {formatDateToYearMonthDay(item.fechahoraprogramada.toString())}</Text>
                                        <Layout style={citasStyles.citasEstatus}>
                                            <Layout style={citasStyles.shapeSpot }></Layout>
                                            <Text style={{color:'#2C338B'}}> Asignada</Text>
                                        </Layout>
                                    </Layout>
                                    <Layout style={citasStyles.containerCitasRight}>
                                        <Layout style={citasStyles.containerHora}>
                                            <Text style={citasStyles.textHoraLabel}>HORA:</Text>
                                            <Text style={citasStyles.textHora}>{formatTimeTo12Hour(item.fechahoraprogramada.toString())}</Text>
                                        </Layout>
                                        <PrimaryButton
                                            label="Cómo llegar"
                                            buttonColor= "#265170"
                                            appearance="filled"
                                            whithPercentaje="100%"
                                            height={50}
                                            nameIcon="arrow-forward-outline"
                                            colorIcon="color-primary-100"
                                            showIcon={false}
                                            textColor={'white'}
                                            textSize={4 + (width * 0.015)}
                                            onPress={() => {
                                                const latitude = item.latitud; // Assuming 'latitud' is your latitude property
                                                const longitude = item.longitud; // Assuming 'longitud' is your longitude property
                                                const url = `https://www.google.com/maps/dir/?api=1&query=${latitude},${longitude}`; // Construct the Google Maps URL
                                                Linking.openURL(url); // Open the URL using Linking
                                            }}
                                        />
                                    </Layout>
                                </Layout>
                            )}
                        />                       
                    </Layout> 
                )
            }            
        </>        
    )
}
