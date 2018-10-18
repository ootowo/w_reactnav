import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { MapView } from "expo";
import {
  Option,
  OptionList,
  Select,
  updatePosition
} from "react-native-dropdown";
import RNPickerSelect from "react-native-picker-select";

import ProfileHeader from "../../components/ProfileHeader";
import CardHeader from "../../components/CardHeader";
import MapPopup from "../../components/MapPopup";

const { Marker, Callout } = MapView;
class MainBranchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ProfileHeader navigation={navigation} />,
    headerRight: <CardHeader />
  });

  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
      selectedSector: undefined,
      sectors: [
        { label: "Bangkok", value: "bangkok" },
        { label: "Central", value: "central" },
        { label: "North", value: "north" },
        { label: "South", value: "south" },
        { label: "North East", value: "north-east" }
      ],
      selectedBranch: undefined,
      branches: [
        { label: "Bangkok", value: "bangkok" },
        { label: "Central", value: "central" },
        { label: "North", value: "north" },
        { label: "South", value: "south" },
        { label: "North East", value: "north-east" }
      ]
    };

    this.renderMapView = this.renderMapView.bind(this);
  }

  componentDidMount() {}

  renderMapMarker = (item, key) => {
    return (
      <Marker
        key={key}
        image={require("../../assets/makro_pin.png")}
        coordinate={item.location}
      >
        <Callout tooltip={true}>
          <MapPopup title="Bangbon" tel="02-900-9000" />
        </Callout>
      </Marker>
    );
  };

  renderMapView() {
    const marker = [
      {
        location: {
          latitude: 13.702822,
          longitude: 100.445577
        }
      },
      {
        location: {
          latitude: 13.718646,
          longitude: 100.479137
        }
      },
      {
        location: {
          latitude: 13.671983,
          longitude: 100.456542
        }
      }
    ];
    return (
      <MapView
        style={styles.mapView__map}
        initialRegion={{
          latitude: 13.736717,
          longitude: 100.523186,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {marker.map(this.renderMapMarker)}
      </MapView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          <View style={styles.mapView__menu}>
            <View style={[styles.mapView__menu_dropdown]}>
              <RNPickerSelect
                style={{ ...pickerStyles }}
                placeholder={{ label: "Branch", value: null }}
                items={this.state.branches}
                onValueChange={value => {
                  this.setState({ selectedBranch: value });
                }}
                value={this.state.selectedBranch}
                ref={el => {
                  this.inputRefs.branchPicker = el;
                }}
              />
            </View>
          </View>
          {this.renderMapView()}
        </View>
        <TouchableHighlight style={styles.navigateButton}>
          <Text style={styles.navigateButton__text}>Navigate</Text>
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

export default MainBranchScreen;
