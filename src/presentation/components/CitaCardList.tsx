
import { FlatList, StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { Lstcitavigente } from '../../core/Aplicacion/Dto/CitasVigentesDto';
import { citasStyles } from '../theme/home/citasStyles';
import { formatDateToYearMonthDay, formatTimeTo12Hour } from '../../shared/helpers';

interface Props {
    lstCitas: Lstcitavigente[];
}

export const CitaCardList = ({ lstCitas }: Props) => {

    return (
        <FlatList
            data={ lstCitas }
            keyExtractor={(item) => item.citaid.toString()}                            
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <Layout style={ style.containerCardCitasVertical }>
                    <Layout style={ citasStyles.containerInformacion }>
                        <Layout style={citasStyles.informacionLeft}>
                            <Text style={citasStyles.textDetalleCita}>
                                <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: 15 }}>Establecimiento:</Text> {item.nombreestablecimiento}</Text>
                            <Text style={citasStyles.textDetalleCita}>
                                <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: 15 }}>Servicio:</Text> {item.nombreservicio}</Text>
                            <Text style={citasStyles.textDetalleCita}>
                                <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: 15 }}>Motivo:</Text> {item.citaMotivo}</Text>
                            
                        </Layout>
                        <Layout style={citasStyles.informacionRight}>
                            <Layout style={citasStyles.containerHoraVertical}>
                                <Text style={citasStyles.textDetalleCita}>
                                    <Text style={{ ...citasStyles.textDetalleCita, fontWeight: 'bold', fontSize: 15 }}>Fecha:</Text> {formatDateToYearMonthDay(item.fechahoraprogramada.toString())}</Text>                                            
                                <Text style={citasStyles.textHora}>
                                    HORA: <Text style={citasStyles.textHora}>{formatTimeTo12Hour(item.fechahoraprogramada.toString())}</Text></Text>                                                
                                {/* <Layout style={citasStyles.citasEstatus}>                                                
                                    <Text style={{color:'#2C338B'}}>Asignada </Text>
                                    <Layout style={citasStyles.shapeSpot }></Layout>
                                </Layout>  */}
                            </Layout>                                                                                      
                        </Layout>
                    </Layout>
                </Layout>
            )}
        />
    )

}

const style = StyleSheet.create({
    containerCardCitasVertical: {
        backgroundColor: '#F5F4F4',
        borderRadius: 15,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginBottom: 20,
        paddingVertical: 10
    },
});