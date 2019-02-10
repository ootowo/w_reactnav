import React, { Component } from "react";

import { View, ActivityIndicator, FlatList, StyleSheet, Alert } from "react-native";
import { List, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import HeaderTitle from "../../components/HeaderTitle";

import { fetchTodayOfferApi } from "../../apis/todayOfferApi";
import { setCountingOffer } from "../../actions/countingAction";

class OfferScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="home.menu.offer" />,
    headerBackTitle: null,
    headerTintColor: "#000000"
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: true
    };
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);

    this.renderFooter = this.renderFooter.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);
  }

  componentDidMount() {
    this.props.setCountingOffer({
      ...this.props.counting.internal,
      offer: this.props.counting.external.offer
    });

    this.makeRemoteRequest();
  }
  makeRemoteRequest() {
    const { page, seed } = this.state;
    this.setState({ loading: true });
    fetchTodayOfferApi(this.props.user.user.member_code)
      .then(res => {
        // if (res.data.length < 1) {
        //   if (this.props.setting.params.language == "en") {
        //     Alert.alert("Makro", "Today's Offer not available");
        //   } else {
        //     Alert.alert("Makro", "មិនទាន់មានព័ត៌មាន");
        //   }
        // }
        this.setState({
          data: res.data,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
        console.log(error.message);
        Alert.alert("Makro", "Error while loading, please try again");
      });
  }

  handleRefresh() {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }

  handleLoadMore() {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  }

  renderSeparator() {
    return (
      <View
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  }

  render() {
    const { language } = this.props.setting.params;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List
          containerStyle={{
            flex: 1,
            marginTop: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
        >
          <FlatList
            style={{ flex: 1 }}
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                avatarStyle={{ width: 80, height: 80 }}
                avatarContainerStyle={{ width: 80, height: 80 }}
                title={`${language == "en" ? item.name : item.name_cambodia}`}
                titleNumberOfLines={1}
                subtitle={`${moment(item.valid_from_date, "YYYY-MM-DD").format("DD MMM YYYY")}`}
                avatar={{ uri: item.file_path ? item.file_path : null }}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => navigate("OfferView", { offer_detail: item })}
              />
            )}
            keyExtractor={item => item.id}
            ListFooterComponent={this.renderFooter}
            ItemSeparatorComponent={this.renderSeparator}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            // onEndReached={this.handleLoadMore}
            /// onEndReachedThreshold={50}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => ({
  user: state.userReducer,
  setting: state.settingReducer,
  counting: state.countingReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ setCountingOffer }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferScreen);
