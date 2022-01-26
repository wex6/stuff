import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  container: {},
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
  },
  nameText: {
    fontSize: 24,
    marginTop: 12,
    alignItems: 'center',
    textAlignVertical:'center',
    marginBottom: 6,
  },
  item: (selected)=>({
    borderRadius: 12,
    backgroundColor: selected?'#eb8677':'#fcebd0',
    marginHorizontal: 8,
    marginTop: 8,
    paddingVertical: 24,
    paddingHorizontal: 36,
  }),
})

export default styles
