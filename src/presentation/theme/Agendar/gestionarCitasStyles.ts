import { StyleSheet } from "react-native";
import { globalColors } from "../theme";

export const gestionarCitasStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: globalColors.white
  },
  title: {
    color: globalColors.darkSmoke,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerText: {
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
    marginVertical: 5,
  },
  cardTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0000FF',
  },
  cardDate: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0000FF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});