import { getFontSize } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundIcon: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: (200),
    height: (200),
    opacity: 0.2,
    zIndex: -1,
  },
  picture: {
    width: getFontSize(200),
    height: getFontSize(200),
  },
  imagePokemon: {
    alignSelf: 'center',
    position: 'absolute',
    top: -getFontSize(140),
    zIndex: 1
  },
  body: {
    marginTop: getFontSize(140),
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center'
  },
  subtitle: {
    marginVertical: 12
  },
  about: {
    flex: 1/3
  },
  flavor: {
    height: 60,
    textAlignVertical: 'center',
    textAlign: 'justify'
  },
  navigationBtn: {
    width: getFontSize(24),
    height: getFontSize(24)
  }
})