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
    justifyContent: 'center',
    marginLeft: 12,
    height: 44,
    width: 44,
    backgroundColor: 'red',
  },
  pageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: 'black',
  },
})

export default styles
