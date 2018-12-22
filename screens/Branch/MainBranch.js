import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { MapView, Permissions, Location, Constants } from "expo";
import { Option, OptionList, Select, updatePosition } from "react-native-dropdown";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Platform,
  Alert
} from "react-native";
import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import { OpenMapDirections } from "react-native-navigation-directions";
import { isEmpty } from "../../utils/validate";

import branches from "../../utils/branches";
import CardHeader from "../../components/CardHeader";
import MapPopup from "../../components/MapPopup";
import ProfileHeader from "../../components/ProfileHeader";
import { TabHeading } from "native-base";

const { Marker, Callout } = MapView;
const latitudeDelta = 0.0922,
  longitudeDelta = 0.0421;

class MainBranchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ProfileHeader navigation={navigation} />,
    headerRight: <CardHeader />
  });

  constructor(props) {
    super(props);
    this.mapRef = {};
    this.inputRefs = {};
    this.state = {
      selectedBranch: undefined,
      branches: [],
      initialRegion: {
        latitude: 13.736717,
        longitude: 100.523186,
        latitudeDelta,
        longitudeDelta
      },
      mapRegion: {
        latitude: 13.736717,
        longitude: 100.523186,
        latitudeDelta,
        longitudeDelta
      }
    };

    this.renderMapView = this.renderMapView.bind(this);
    this.onBranchChange = this.onBranchChange.bind(this);
    this.getDirection = this.getDirection.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentDidMount() {
    this.getCurrentLocation();

    const lang = this.props.setting.params.language;
    const branchesDDL = branches[lang].map(branch => {
      return { label: branch.name, value: branch.id };
    });
    this.setState({ branches: branchesDDL });

    const mapId = this.props.navigation.getParam("mapId");
    if (!isEmpty(mapId)) {
      console.log(mapId);
      this.setState({ selectedBranch: mapId });
    }
  }

  onBranchChange(value) {
    const lang = this.props.setting.params.language;
    this.setState({ selectedBranch: value });
    const selectedBranch = branches[lang].filter(item => {
      return item.id == value;
    });
    if (selectedBranch.length > 0) {
      const { latitude, longitude } = selectedBranch[0].location;
      this.setState(
        {
          mapRegion: {
            ...this.state.mapRegion,
            latitude,
            longitude
          }
        },
        () => {
          this.mapRef.animateToRegion(this.state.mapRegion, 500);
        }
      );
    }
  }

  getDirection = async () => {
    const startPoint = {
      longitude: this.state.initialRegion.longitude,
      latitude: this.state.initialRegion.latitude
    };
    const endPoint = {
      longitude: this.state.mapRegion.longitude,
      latitude: this.state.mapRegion.latitude
    };
    const transportPlan = "d";

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res);
    });
  };

  getCurrentLocation = async () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      Alert.alert(
        "Error",
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        Alert.alert("Error", "Permission to access location was denied");
      } else {
        let { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        this.setState(
          {
            mapRegion: {
              ...this.state.mapRegion,
              latitude,
              longitude
            },
            initialRegion: {
              ...this.state.initialRegion,
              latitude,
              longitude
            }
          },
          () => {
            this.mapRef.animateToRegion(this.state.mapRegion, 500);
          }
        );
      }
    }
  };

  handleNavigation() {
    if (this.state.selectedBranch !== undefined) {
      this.getDirection();
    }
  }

  renderMapMarker = (item, key) => {
    return (
      <Marker key={key} image={require("../../assets/makro_pin.png")} coordinate={item.location}>
        <Callout tooltip={true}>
          <MapPopup title={item.name} address={item.address} tel={item.tel} />
        </Callout>
      </Marker>
    );
  };

  renderMapView() {
    const lang = this.props.setting.params.language;
    return (
      <MapView
        ref={e => {
          this.mapRef = e;
        }}
        style={styles.mapView__map}
        initialRegion={this.state.initialRegion}
        mapRegion={this.state.mapRegion}
      >
        {branches[lang].map(this.renderMapMarker)}
      </MapView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          <View style={styles.mapView__menu}>
            <View style={[styles.mapView__menu_dropdown]}>
              <FormattedMessage id="branch.branch">
                {msg => (
                  <RNPickerSelect
                    style={{ ...pickerStyles }}
                    placeholder={{ label: msg, value: null }}
                    items={this.state.branches}
                    onValueChange={this.onBranchChange}
                    value={this.state.selectedBranch}
                    ref={el => {
                      this.inputRefs.branchPicker = el;
                    }}
                  />
                )}
              </FormattedMessage>
            </View>
          </View>
          {this.renderMapView()}
        </View>
        <TouchableHighlight style={styles.navigateButton} onPress={this.handleNavigation}>
          <Text style={styles.navigateButton__text}>
            <FormattedMessage id="branch.navigate" />
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapView: {
    flex: 1,
    width: "100%"
  },
  mapView__map: {
    width: "100%",
    height: "100%"
  },
  mapView__menu: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
    margin: 10
  },
  mapView__menu_dropdown: {
    flex: 1,
    width: "50%"
  },
  mapView__menu_dropdown__left: {
    paddingRight: 5
  },
  mapView__menu_dropdown__right: {
    paddingRight: 5
  },
  navigateButton: {
    flex: 0,
    width: "100%",
    height: 45,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center"
  },
  navigateButton__text: {
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});
const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#FFFFFF",
    flex: 1,
    width: "100%"
  },
  inputAndroid: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#FFFFFF",
    flex: 1,
    width: "100%"
  },
  icon: {
    top: 20,
    right: 15,
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderLeftWidth: 6,
    borderTopColor: "#999999"
  }
});

const mapStateToProps = state => ({
  setting: state.settingReducer
});
export default connect(mapStateToProps)(MainBranchScreen);
