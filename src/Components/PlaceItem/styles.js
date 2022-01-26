import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
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
