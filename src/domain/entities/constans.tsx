export const bannerData: BannerDataTypes[] = [
    {
        bannerImageUrl: require('../../assets/imgs/Banner001.png'),
        title: 'Utiliza nuestro canal de Facebook.',
        url: 'https://wabot.citas.med.ec/fb',
        colorFondo: '#4267FE'
    },
    {
        bannerImageUrl: require('../../assets/imgs/Banner002.png'),
        title: 'Utiliza nuestro canal de WhatsApp.',
        url: 'https://wabot.citas.med.ec/wa',
        colorFondo: '#4CD857'
    },
    {
        bannerImageUrl: require('../../assets/imgs/Banner003.png'),
        title: 'Utiliza nuestro canal de Agendamiento Web.',
        url: 'https://www.citas.med.ec/',
        colorFondo: '#5AA8DF'
    }
]

export enum Servicio {
    MedicinaGeneral = "Medicina General",
    Odontologia = "Odontología",
    Psicologia = "Psicología",
    Discapacidad = "Discapacidad",
    DiasMes = "2",
}

export enum DiasMes {
    Uno = "1",
    Dos = "2",
    Tres = "3",
    Cuatro = "4",
    Cinco = "5",
    Seis = "6",
    Siete = "7",
    Ocho = "8",
    Nueve = "9",
    Diez = "10",
    Once = "11",
    Doce = "12",
}