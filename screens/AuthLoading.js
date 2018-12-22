import React, { Component } from "react";
import { ActivityIndicator, View, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isEmpty } from "../utils/validate";
import { syncAuthen } from "../actions/userAction";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync = this.bootstrapAsync.bind(this);
  }

  componentDidMount() {
    this.bootstrapAsync();
  }

  bootstrapAsync() {
    new Promise((resolve, reject) => {
      this.props.syncAuthen(resolve, reject);
    })
      .then(result => {
        if (result) {
          this.props.navigation.navigate("Main");
        } else {
          this.props.navigation.navigate("Authen");
        }
      })
      .catch(error => {
        Alert.alert("Error", typeof error === "string" ? error : JSON.stringify(error));
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  user: state.userReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ syncAuthen }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
