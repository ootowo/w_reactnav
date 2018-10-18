import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { Banner } from "../../components/Banner";
import { getFile } from "../../utils/shelfFilePath";

class MailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Makro Mail",
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
    // this.makeRemoteRequest();
    const mockup = [
      {
        id: 0,
        title: "29 ส.ค 2561 - 11 ก.ย. 2561",
        image: require("../../assets/mockup/mails/01.jpg")
      },
      {
        id: 1,
        title: "29 ส.ค 2561 - 11 ก.ย. 2561",
        image: require("../../assets/mockup/mails/02.jpg")
      },
      {
        id: 2,
        title: "29 ส.ค 2561 - 11 ก.ย. 2561",
        image: require("../../assets/mockup/mails/03.jpg")
      },
      {
        id: 3,
        title: "23 พ.ค. 2561 - 30 พ.ย. 2561",
        image: require("../../assets/mockup/mails/04.jpg")
      },
      {
        id: 4,
        title: "29 ส.ค 2561 - 11 ก.ย. 2561",
        image: require("../../assets/mockup/mails/01.jpg")
      },
      {
        id: 5,
        title: "29 ส.ค 2561 - 11 ก.ย. 2561",
        image: require("../../assets/mockup/mails/02.jpg")
      }
    ];

    this.setState({ data: mockup });
  }

  makeCalculateStackHeight() {
    const { height } = Dimensions.get("window");
    const { bannerHeight } = this.state;
    return height / 3 - (bannerHeight - 15);
  }

  makeRemoteRequest() {
    const { page, seed } = this.state;
    const url = `https://jsonplaceholder.typicode.com/albums`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res : [...this.state.data, ...res],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
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

  renderBookItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        style={[styles.bookItem, { height: this.makeCalculateStackHeight() }]}
        onPress={() => navigate("MailView")}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingBottom: 38
          }}
        >
          <View style={styles.bookItem__thumbnail}>
            <Image
              style={{
                width: this.state.bookCoverWidth,
                height: "100%",
                backgroundColor: "#FFFFFF"
              }}
              resizeMode="cover"
              source={item.image}
              onLayout={e =>
                this.setState({
                  bookCoverWidth: e.nativeEvent.layout.height / 1.2
                })
              }
            />
          </View>
          <View style={styles.bookItem__title}>
            <Text style={styles.bookItem__title_text} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          <Image
            style={styles.bookItem__bg}
            source={
              this.checkIndexIsEven(item.id)
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
        uri: banner.filePath
      };
    });
    const mailBannerURLs = mail.map(banner => {
      return banner.url;
    });
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1, paddingTop: 10 }}
          data={this.state.data}
          numColumns={2}
          renderItem={this.renderBookItem}
          keyExtractor={item => item.id}
          ListFooterComponent={this.renderFooter}
          // onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={50}
        />
        <Banner
          onLayout={event => {
            this.setState({ bannerHeight: event.nativeEvent.layout.height });
          }}
          darkmode
          mini={true}
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
    width: "100%" - 14,
    padding: 8,
    borderRadius: 15,
    backgroundColor: "rgba(136, 136, 136, 0.8)",
    position: "absolute",
    bottom: 40,
    left: 7,
    right: 7,
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
  banner: state.bannerReducer
});
export default connect(mapStateToProps)(MailScreen);
