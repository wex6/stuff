import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingLeft: 26,
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
  },
  nameText: {
    fontSize: 28,
    marginTop: 12,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginBottom: 6,
  },
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
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:12
  }
})

export default styles
