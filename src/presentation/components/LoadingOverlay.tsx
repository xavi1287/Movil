import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AnimatedLoading from './ui/AnimatedLoading';

interface Props {
    isLoading?: boolean,
    children: React.ReactNode
}

export const LoadingOverlay = ({
    isLoading = false,
    children
}: Props) => {

    return (
        <View pointerEvents={ isLoading ? 'none' : 'auto'} style={{ flex: 1}}>
            {children}
            {
                isLoading
                ?
                    <View style={ styles.overlay }>
                        {/* <ActivityIndicator color='black' size='large' /> */}
                        <AnimatedLoading />
                    </View>
                :
                    <></>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});