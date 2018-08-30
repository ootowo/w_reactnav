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

import ProfileHeader from "../../components/ProfileHeader";
import CardHeader from "../../components/CardHeader";
import MapPopup from "../../components/MapPopup";

const { Marker, Callout } = MapView;
class MainBranchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ProfileHeader />,
    headerRight: <CardHeader />
  });

  constructor(props) {
    super(props);

    this.renderMapView = this.renderMapView.bind(this);
    this._getOptionListArea = this._getOptionListArea.bind(this);
    this._getOptionListBranch = this._getOptionListBranch.bind(this);
    this._setOptionArea = this._setOptionArea.bind(this);
    this._setOptionBranch = this._setOptionBranch.bind(this);
  }

  componentDidMount() {
    updatePosition(this.refs["SELECT_AREA"]);
    updatePosition(this.refs["OPTIONLIST_AREA"]);
    updatePosition(this.refs["SELECT_BRANCH"]);
    updatePosition(this.refs["OPTIONLIST_BRANCH"]);
  }

  _getOptionListArea() {
    return this.refs["OPTIONLIST_AREA"];
  }

  _getOptionListBranch() {
    return this.refs["OPTIONLIST_BRANCH"];
  }

  _setOptionArea(area) {
    this.setState({ area });
  }

  _setOptionBranch(branch) {
    this.setState({ branch });
  }

  renderMapMarker = (item, key) => {
    return (
      <Marker
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
            <View style={styles.mapView__menu_dropdown}>
              <Select
                style={{ backgroundColor: "#FFFFFF" }}
                width={(Dimensions.get("screen").width - 40) / 2}
                ref="SELECT_AREA"
                optionListRef={this._getOptionListArea.bind(this)}
                defaultValue="Area"
                onSelect={this._setOptionArea.bind(this)}
              >
                <Option>Bangkok</Option>
                <Option>Central</Option>
                <Option>West</Option>
                <Option>East</Option>
                <Option>North</Option>
                <Option>Northeastern</Option>
                <Option>South</Option>
              </Select>
              <OptionList ref="OPTIONLIST_AREA" />
            </View>
            <View style={styles.mapView__menu_dropdown}>
              <Select
                style={{ backgroundColor: "#FFFFFF" }}
                width={(Dimensions.get("screen").width - 20) / 2}
                ref="SELECT_BRANCH"
                optionListRef={this._getOptionListBranch.bind(this)}
                defaultValue="Branch"
                onSelect={this._setOptionBranch.bind(this)}
              >
                <Option>Kanlapaphruk</Option>
                <Option>British Columbia</Option>
                <Option>Manitoba</Option>
                <Option>New Brunswick</Option>
                <Option>Newfoundland and Labrador</Option>
                <Option>Northwest Territories</Option>
              </Select>
              <OptionList ref="OPTIONLIST_BRANCH" />
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

export default MainBranchScreen;
