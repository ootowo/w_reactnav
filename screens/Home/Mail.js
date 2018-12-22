import React, { Component } from "react";

import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import moment from "moment";

import { Banner } from "../../components/Banner";
import HeaderTitle from "../../components/HeaderTitle";
import { getFile } from "../../utils/shelfFilePath";
import { _HOST } from "../../utils/config";
import { isEmpty } from "../../utils/validate";

import { fetchMakroMailData } from "../../apis/makroMailApi";
import { setCountingMail } from "../../actions/countingAction";

class MailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle id="home.menu.mail" />,
    headerTintColor: "#000000",
    headerBackTitle: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: true,
      bannerHeight: 0,
      bookCoverWidth: 0
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);

    this.makeCalculateStackHeight = this.makeCalculateStackHeight.bind(this);

    this.renderBookItem = this.renderBookItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    this.props.setCountingMail({
      ...this.props.counting.internal,
      mail: this.props.counting.external.mail
    });
    this.makeRemoteRequest();
  }

  makeCalculateStackHeight() {
    const { height } = Dimensions.get("window");
    const { bannerHeight } = this.state;
    return height / 3 - (bannerHeight - 15);
  }

  makeRemoteRequest() {
    const { page, seed } = this.state;
    this.setState({ loading: true });
    fetchMakroMailData(this.props.user.user.member_code)
      .then(res => {
        // if (res.data.length < 1) {
        //   if (this.props.setting.params.language == "en") {
        //     Alert.alert("Makro", "Makro Mail not Available");
        //   } else {
        //     Alert.alert("Makro", "ម៉ាក្រូអ៊ីម៉ែលមិនមានទេ");
        //   }
        // }
        if (res.data.length % 2 != 0) {
          res.data.push({});
        }
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

  checkIndexIsEven(n) {
    return n % 2 == 0;
  }

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  }

  renderBookItem = ({ item, index }) => {
    const { navigate } = this.props.navigation;
    const { language } = this.props.setting.params;

    const validFrom = moment(item["valid_from_date"], "YYYY-MM-DD");
    const validTo = moment(item["valid_to_date"], "YYYY-MM-DD");

    return (
      <TouchableOpacity
        style={[styles.bookItem, { height: this.makeCalculateStackHeight() }]}
        onPress={() => navigate("MailView", item)}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingBottom: 38
          }}
        >
          {!isEmpty(item.file_path) && (
            <View style={styles.bookItem__thumbnail}>
              <Image
                style={{
                  width: this.state.bookCoverWidth,
                  height: "100%",
                  backgroundColor: "#FFFFFF"
                }}
                resizeMode="cover"
                source={{ uri: item.file_path }}
                onLayout={e =>
                  this.setState({
                    bookCoverWidth: e.nativeEvent.layout.height / 1.4
                  })
                }
              />
            </View>
          )}
          {!isEmpty(item.name) && (
            <View style={styles.bookItem__title}>
              <Text style={styles.bookItem__title_text} numberOfLines={1}>
                {validFrom.format("DD/MM/YYYY")} - {validTo.format("DD/MM/YYYY")}
              </Text>
            </View>
          )}
          <Image
            style={styles.bookItem__bg}
            source={
              this.checkIndexIsEven(index)
                ? getFile(this.props.setting.params.shelf, "left")
                : getFile(this.props.setting.params.shelf, "right")
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { mail } = this.props.banner;
    const mailBannerImages = mail.map(banner => {
      return {
        uri: _HOST + banner.file_path
      };
    });
    const mailBannerURLs = mail.map(banner => {
      return banner.file_url;
    });
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1, marginTop: 20 }}
          data={this.state.data}
          numColumns={2}
          renderItem={this.renderBookItem}
          keyExtractor={item => item.id}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={50}
        />
        <Banner
          onLayout={event => {
            this.setState({ bannerHeight: event.nativeEvent.layout.height });
          }}
          darkmode
          mini
          images={mailBannerImages}
          urls={mailBannerURLs}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%"
  },
  bookShelf__bg: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "repeat"
  },
  bookItem: {
    width: "50%",
    // height: "100%" / 3,
    flex: 1,
    alignItems: "center"
  },
  bookItem__bg: {
    width: "100%",
    height: 45,
    position: "absolute",
    bottom: 0,
    resizeMode: "cover",
    zIndex: 98
  },
  bookItem__thumbnail: {
    width: "100%",
    height: "100%",
    zIndex: 99,
    alignItems: "center"
  },
  bookItem__title: {
    width: "100%" - 24,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "rgba(136, 136, 136, 0.8)",
    position: "absolute",
    bottom: 43,
    left: 12,
    right: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    zIndex: 99
  },
  bookItem__title_text: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent"
  }
});

const mapStateToProps = state => ({
  setting: state.settingReducer,
  banner: state.bannerReducer,
  user: state.userReducer,
  counting: state.countingReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ setCountingMail }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailScreen);
