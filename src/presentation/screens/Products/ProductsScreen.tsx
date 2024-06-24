import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

const products = [
  {id:1, name: 'Producto 1'},
  {id:2, name: 'Producto 2'},
  {id:3, name: 'Producto 3'},
  {id:4, name: 'Producto 4'},
  {id:5, name: 'Producto 5'},
  {id:6, name: 'Producto 6'},
];

export const ProductsScreen = () => {
  return (
    <View style={{flex: 1, padding: 20, backgroundColor:'gray'}}>
        <Text style={{marginBottom: 10, fontSize:30}}>Productos</Text>
        <FlatList
          data={products}
          renderItem={({item}) => (
            <Pressable 
                style={{
                    backgroundColor: 'blue',
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                    width: '100%',
                    alignItems: 'center',
                }}
                onPress={() => console.log('button')}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 18,
                }}
                >{item.name}</Text>
            </Pressable>
          )}
        />



        <Text style={{marginBottom: 10, fontSize:30}}>Ajustes</Text> 
    </View>
  )
}
