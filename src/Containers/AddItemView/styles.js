import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 110,
    height: 164,
    borderRadius: 12,
    marginRight: 24,
  },
  imageContainer: {
    width: 110,
    height: 164,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cdeaf4',
    marginRight: 24,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 2,
    borderColor: '#cdeaf4',
    borderRadius: 12,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  addTag: {
    alignItems: 'center',
    backgroundColor: '#cdeaf4',
    borderRadius:999,
    justifyContent: 'center',
    marginLeft: 12,
    height: 44,
    width: 44
  },
  pageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: 'black',
  },
  bar: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:12,
    justifyContent:'space-between',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white'
  }
})

export default styles
