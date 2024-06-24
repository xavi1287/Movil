import { Button, ButtonGroup, Layout, Text, IndexPath, Select, SelectItem } from '@ui-kitten/components'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import {servicio, diasMes} from '../../../config/constants/constants';
import PrimaryButton from '../../components/PrimaryButton';
import { agendarStyles } from '../../theme/Agendar/agendarStyles';
import { Formik } from 'formik';
import { globalColors } from '../../theme/theme';
import { Linking } from 'react-native';

const dataNucleo = [
    'Para mí',
    'Para Camila, Hija',
    'Para Angela, Mamá',
];

const dataServicio = [
    'ODONTOLOGÍA',
    'PSICOLOGÍA',
    'MEDICINA GENERAL',
    'DISCAPACIDAD',
];

const dataEstab = [
    'GUAMANÍ',
    'EL BLAMQUEADO',
    'QUITUMBE',
    'MARTHA BUCARAN',
];

const dataMotivo = [
    'CITA MEDICA',
    'PLANIFICACIÓN FAMILIAR',
    'SALUD SEXUAL Y REPRODUCTIVA'
];


export const AgendarCitaScreen = () => {

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(new IndexPath(0));
    const displayValueNucleo = dataNucleo[selectedIndex.row];
    const displayValueServicio = dataServicio[selectedIndex.row];
    const displayValueEstab = dataEstab[selectedIndex.row];
    const displayValueMotivo = dataMotivo[selectedIndex.row];
    const renderOption = (title: string): React.ReactElement => (
        <SelectItem title={title} />
    );
    return (
        <Formik 
            initialValues={servicio}
            onSubmit={ values => console.log(values)}
        >
            {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
                <Layout style={{flex: 1, backgroundColor: globalColors.white}}>
                    <ScrollView style={{flex: 1}}>
                        <Layout style={agendarStyles.containerAgendar}>
                            <Text style={agendarStyles.titulosAgendar}>¿Para quién es esta cita?</Text>
                            <Layout
                                style={agendarStyles.containerSelect}
                                // level='1'
                            >
                                <Select
                                    style={agendarStyles.select}
                                    placeholder='Default'
                                    value={displayValueNucleo}
                                    selectedIndex={selectedIndex}
                                    onSelect={(index: any) => setSelectedIndex(index)}
                                >
                                    {dataNucleo.map(renderOption)}
                                </Select>
                            </Layout>
                            <Layout style={agendarStyles.camposData}>
                                <Text style={agendarStyles.dataTexto}>Quito, Pichincha</Text>
                            </Layout>
                            <Layout style={agendarStyles.camposData}>
                                <Text style={agendarStyles.dataTexto}>Zona 9 - 04D06</Text>
                            </Layout>
                            <Text style={agendarStyles.titulosAgendar}>Seleccione un servicio</Text>
                            <Layout
                                style={agendarStyles.containerSelect}
                                // level='1'
                            >
                                <Select
                                    style={agendarStyles.select}
                                    placeholder='Default'
                                    value={displayValueServicio}
                                    selectedIndex={selectedIndex}
                                    onSelect={(index: any) => setSelectedIndex(index)}
                                >
                                    {dataServicio.map(renderOption)}
                                </Select>
                            </Layout>
                            <Text style={agendarStyles.titulosAgendar}>Seleccione un establecimiento de salud</Text>
                            <Layout
                                style={agendarStyles.containerSelect}
                                // level='1'
                            >
                                <Select
                                    style={agendarStyles.select}
                                    placeholder='Default'
                                    value={displayValueEstab}
                                    selectedIndex={selectedIndex}
                                    onSelect={(index: any) => setSelectedIndex(index)}
                                >
                                    {dataEstab.map(renderOption)}
                                </Select>
                            </Layout>
                            <Layout style={agendarStyles.camposDataCompuesto}>
                                <Layout style={{width: '60%', backgroundColor: '#EDF4FF', borderRadius: 15, paddingTop: 15}}>
                                    <Text style={agendarStyles.dataTexto}>Av. Pedro Vicente Maldonado - Maria Teresa Ambato</Text>
                                </Layout>
                                <Layout style={{width: '40%', backgroundColor: '#EDF4FF', borderRadius: 15, paddingTop: 15, paddingRight: 20, alignItems:'flex-end'}}>
                                    <PrimaryButton
                                        label="Cómo llegar"
                                        buttonColor= "#265170"
                                        appearance="filled"
                                        whithPercentaje="70%"
                                        height={40}
                                        nameIcon="arrow-forward-outline"
                                        colorIcon="color-primary-100"
                                        showIcon={false}
                                        textColor={'white'}
                                        textSize={12}
                                        onPress={() => {
                                            const latitude = 1.000007; // Assuming 'latitud' is your latitude property
                                            const longitude = -2.0000006; // Assuming 'longitud' is your longitude property
                                            const url = `https://www.google.com/maps/dir/?api=1&query=${latitude},${longitude}`; // Construct the Google Maps URL
                                            Linking.openURL(url); // Open the URL using Linking
                                        }}
                                    />
                                </Layout>
                            </Layout>
                            <Text style={agendarStyles.titulosAgendar}>Seleccione un motivo</Text>
                            <Layout
                                style={agendarStyles.containerSelect}
                                // level='1'
                            >
                                <Select
                                    style={agendarStyles.select}
                                    placeholder='Default'
                                    value={displayValueMotivo}
                                    selectedIndex={selectedIndex}
                                    onSelect={(index: any) => setSelectedIndex(index)}
                                >
                                    {dataMotivo.map(renderOption)}
                                </Select>
                            </Layout>
                            <Text style={agendarStyles.titulosAgendar}>Disponibilidad</Text>
                            <Layout
                                style={agendarStyles.containerButtonGroup}
                                level='1'
                            >
                                <ButtonGroup
                                    size="giant"
                                    appearance="outline"
                                >
                                    {diasMes.map(diaMes => (
                                        <Button
                                            onPress={() => setFieldValue('diaMes', diaMes)}
                                            key={diaMes}
                                            // style={{
                                            //     flex: 1,
                                            //     backgroundColor: values.diasMes.startsWith(diaMes)
                                            //     ? theme['color-primary-200']
                                            //     : undefined,
                                            // }}
                                        >
                                            {diaMes}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Layout>
                            
                            <Text style={agendarStyles.titulosAgendar}>Mañana</Text>
                            <Text style={agendarStyles.titulosAgendar}>Tarde</Text>
                            <PrimaryButton
                                label="Agendar"
                                buttonColor= "#4285F4"
                                appearance="filled"
                                whithPercentaje="80%"
                                height={53}
                                nameIcon="save-outline"
                                widthIcon={27}
                                heightIcon={27}
                                iconPosition={'left'}
                                textColor={'white'}
                                textSize={20}
                                onPress={() => console.log('Guardar Cita')}
                            />
                        </Layout>
                        {/* <Text style={{color:'black'}}>{JSON.stringify(values, null, 2)}</Text> */}
                        <Layout style={agendarStyles.spaceScrollView} />
                    </ScrollView>            
                </Layout>
            )
            }
            
        </Formik>
        
    )
}
