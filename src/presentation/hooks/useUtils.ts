
import { useState } from "react";

export const useUtils = () => {

    // PARA EL LOADING OVERLAY
    const [isLoadingData, setIsLoadingData] = useState(false);

    // PARA EL POPUP
    const [mensajePopUp, setMensajePopUp] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const abrirModal = () => {
        setIsModalVisible(true);
    }

    const cerrarModal = () => {
        setIsModalVisible(false);
    }

    return {
        // Properties
        mensajePopUp,
        isModalVisible,
        isLoadingData,
        
        //Methods
        setMensajePopUp,
        abrirModal,
        cerrarModal,
        setIsLoadingData,
    }

}