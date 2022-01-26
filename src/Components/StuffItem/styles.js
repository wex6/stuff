import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  item: {
    aspectRatio:0.73,
    borderRadius: 12,
    width: '44%',
    overflow:'hidden',
    backgroundColor: '#fcebd0',
    margin: '3%',
    marginVertical: 12,
  },
  image: {
    width:'100%', 
    height:'100%',
    borderRadius:12
  },
  label: {
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 3,
    position: 'absolute',
    bottom: 12,
    left: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default styles
