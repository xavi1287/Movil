import { Layout, Spinner } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';


export const FullScreenLoader = () => {

  const {height} = useWindowDimensions();

  return (
    <Layout style={{ 
        height: height - 63, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
      <Spinner 
        size="giant" 
      />
    </Layout>
  )
}