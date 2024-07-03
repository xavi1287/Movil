import React from 'react'
import { Text, View } from 'react-native'
import { CanGoBackHeader } from '../../components/shared/CanGoBackHeader'
import { globalColors } from '../../theme/theme'
import WebView from 'react-native-webview'

export const PoliticasScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: globalColors.white}}>
        
        <CanGoBackHeader parm={true}/>
        
        <WebView
          style={{ flex: 1 }}
          source={{ uri: 'https://www.phuyu.ec/politicas/' }}
        />

    </View>
  )
}
