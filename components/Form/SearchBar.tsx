import { Row } from '@/components/Layout/Row'
import { styles as typo } from '@/components/ThemedText/style'
import { Shadows } from '@/constants/shadows'
import { Image, StyleSheet, TextInput } from "react-native"

type Props = {
  value: string,
  onChange: (s: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <Row style={[styles.searchbar, Shadows.innerShadow]} gap={8}>
      <Image source={require('@/assets/images/search.png')} style={styles.icon}/>
      <TextInput 
        style={[styles.input, typo.body3]}
        onChangeText={onChange} 
        value={value}
        placeholder="search"
        textAlignVertical="center"
        
      />
    </Row>
  )
}

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: 'white',
    marginTop: 8,
    marginBottom: 6,
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    height: 32,
  },
  input: {
    color: 'black',
    paddingVertical: 0,             // ← Important
    paddingHorizontal: 0,
    flex: 1,
  },
  icon: {
    width: 16,
    height: 16
  }
})