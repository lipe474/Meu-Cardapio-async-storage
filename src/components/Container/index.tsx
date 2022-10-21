import { StyleSheet } from "react-native";
import { Container } from "./styles";

export function GeneralContainer(props: any) {
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    },
  });

  return (
    <Container
    source={require('../../../assets/1.png')}
    style={styles.image}
    resizeMode="cover"
    >
      {props.children}
    </Container>

  )
}