import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import PrimaryButton from './PrimaryButton';
import Swiper from 'react-native-swiper';
import { bannerData } from '../../domain/entities/constans';
import { Image, Linking } from 'react-native';
import { canalStyles } from '../theme/home/canalStyles';
import { useDataStore } from '../../core/Infraestructura/adapters/UseDataStore';

export const CanalCradSlider = () => {

    const handleOpenURL = (url: string) => {
        Linking.openURL(url);
    };

    const { dataPersona } = useDataStore();

    return (
        <Layout style={canalStyles.containerCanales}>
            <Text style={canalStyles.titleMenuFirst}>Bienvenido {dataPersona?.primerNombre  ?? ''}</Text>            
            <Swiper
                dotStyle={{ backgroundColor: 'gray' }}
                activeDotStyle={{ backgroundColor: 'black' }}
                autoplay={true}
                autoplayTimeout={4}
            >
                {bannerData.map((item: BannerDataTypes, index: number) => (
                <Layout
                    key={index}
                    style={{...canalStyles.cardCanales, backgroundColor: item.colorFondo}}
                >
                    <Layout
                        style={{
                            backgroundColor: item.colorFondo,
                            width: '40%',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                        source={item.bannerImageUrl}
                        style={{ width: 81, height: 92 }}
                        />
                    </Layout>
                    
                    <Layout
                        style={{
                            backgroundColor: item.colorFondo,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '60%'
                        }}
                    >
                    <Text
                        style={{
                            textAlign: 'center',
                            maxWidth: "100%",
                            padding: 10,
                            color: 'white'
                        }}
                    >{item.title}</Text>
                    <PrimaryButton
                        label="Empezar"
                        buttonColor= "white"
                        appearance="filled"
                        whithPercentaje="80%"
                        height={50}
                        nameIcon="arrow-forward-outline"
                        colorIcon="color-primary-100"
                        showIcon={false}
                        textColor={item.colorFondo}
                        textSize={14}
                        onPress={() => handleOpenURL(item.url)}
                    />
                    </Layout>
                </Layout>
                ))}
            </Swiper>
        </Layout>
    );
};