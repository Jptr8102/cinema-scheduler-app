import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  Modal,
} from "react-native";

import { MovieContext, MovieProvider } from "./context/MovieContext.js";

function MainContext() {
  const { schedule, addMovie, editMovie, deleteMovie } =
    useContext(MovieContext);
  const [movieTitle, setMovieTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovieTitle, setEditedMovieTitle] = useState("");

  const addMovieHandler = () => {
    if (movieTitle) {
      const newMovie = {
        id: String(Date.now()),
        title: movieTitle,
      };
      addMovie(newMovie);
      setMovieTitle("");
      Keyboard.dismiss();
    }
  };

  const deleteMovieHandler = (id) => {
    deleteMovie(id);
    setModalVisible(false);
  };

  const editMovieHandler = () => {
    const updatedMovie = { ...selectedMovie, title: editedMovieTitle };
    editMovie(updatedMovie);
    setModalVisible(false);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setEditedMovieTitle(movie.title);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageCont}>
          <Image
            source={require("./assets/movie-symbol.png")}
            style={styles.mainImg}
            resizeMode="contain"
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Movie Title"
            value={movieTitle}
            onChangeText={setMovieTitle}
          />
          <TouchableOpacity style={styles.addButton} onPress={addMovieHandler}>
            <Text style={styles.addButtonText}>Add Movie</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <FlatList
          data={schedule}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Movie Details</Text>
              <TextInput
                style={styles.modalInput}
                value={editedMovieTitle}
                onChangeText={setEditedMovieTitle}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={editMovieHandler}
                >
                  <Text style={styles.modalButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalDeleteButton}
                  onPress={() => deleteMovieHandler(selectedMovie.id)}
                >
                  <Text style={styles.modalButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

export default function App() {
  return (
    <MovieProvider>
      <MainContext />
    </MovieProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  imageCont: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
  },
  mainImg: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#3B8ACA",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#3B8ACA",
  },
  modalDeleteButton: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "red",
  },
  modalCloseButton: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightblue",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
