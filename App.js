import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Animated, Image } from 'react-native';

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
}));

const { width, height } = Dimensions.get('screen');

const Tab = ({ item }) => {
  return (
    <View>
      <Text style={{
        color: 'white',
        fontSize: 84 / data.length,
        fontWeight: '800',
        textTransform: 'uppercase'

      }}>
        {item.title}
      </Text>
    </View>
  )
}
const Indicator = () => {
  return (
    <View style={{
      position: 'absolute',
      height: 40,
      width: 100,
      borderColor: 'white',
      bottom: -10
    }} />
  )
}

const Tabs = ({ data, scrollX }) => {
  return (
    <View style={{
      position: 'absolute',
      top: 100,
      width
    }}>
      <View style={{
        justifyContent: 'space-evenly',
        flex: 1,
        flexDirection: 'row'
      }}>
        {
          data.map(
            (item) => {
              return < Tab key={item.key} item={item} />
            }
          )
        }
      </View>
      <Indicator />
    </View>
    
  );
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={
          ({ item }) => {
            return <View style={{
              width, height
            }}>
              <Image source={{ uri: item.image }} style={{
                flex: 1, resize: "cover"
              }} />
              <View style={[StyleSheet.absoluteFillObject, {
                backgroundColor: 'rgba(0,0,0,0.3)'
              }]}>

              </View>
            </View>
          }
        }
      />
      <Tabs scrollX={scrollX} data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});