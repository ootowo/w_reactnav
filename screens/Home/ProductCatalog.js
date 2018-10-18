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

class CatelogScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Product Catalog",
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

    this.renderCatelogItem = this.renderCatelogItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    // this.makeRemoteRequest();
    const mockup = [
      {
        id: 0,
        title: "แค็ตตาล็อก ฉบับที่ 19 Electro Plus",
        image: require("../../assets/mockup/catelog/01.jpg")
      },
      {
        id: 1,
        title:
          "แค็ตตาล็อก ฉบับที่ 18 วัตถุดิบและอุปกรณ์เพื่อจัดเลี้ยง ครบครันแบบต้นตำหรับอินเดีย",
        image: require("../../assets/mockup/catelog/02.jpg")
      },
      {
        id: 2,
        title: "แค็ตตาล็อก บรรจุภัณฑ์ รักษ์โลก บรรจุภัณฑ์ รักษ์โลก",
        image: require("../../assets/mockup/catelog/03.jpg")
      },
      {
        id: 3,
        title:
          "แค็ตตาล็อก ฉบับที่ 14 สินค้าสำหรับผู้ประกอบธุรกิจ โรงแรม ร้านอาหาร ธุรกิจจัดเลี้ยง",
        image: require("../../assets/mockup/catelog/04.jpg")
      },
      {
        id: 4,
        title:
          "แค็ตตาล็อก ฉบับที่ 12 บรรจุภัณฑ์ ประหยัดคุ้ม ลดต้นทุนแบบมืออาชี",
        image: require("../../assets/mockup/catelog/05.jpg")
      },
      {
        id: 5,
        title:
          "แค็ตตาล็อก ฉบับที่ 10 คู่มือเลือกซื้อเครื่องใช้และอุปกรณ์สำนักงา",
        image: require("../../assets/mockup/catelog/06.jpg")
      }
    ];
    this.setState({ data: mockup });
  }

  checkIndexIsEven(n) {
    return n % 2 == 0;
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

  makeCalculateStackHeight() {
    const { height } = Dimensions.get("window");
    const { bannerHeight } = this.state;
    return height / 3 - (bannerHeight - 15);
  }

  renderFooter() {
    if (!this.state.loading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  }

  renderCatelogItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        style={[styles.bookItem, { height: this.makeCalculateStackHeight() }]}
        onPress={() => navigate("ProducrCatelogView")}
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
                  bookCoverWidth: e.nativeEvent.layout.height / 1.54
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
    const { catalog } = this.props.banner;
    const catalogBannerImages = catalog.map(banner => {
      return {
        uri: banner.filePath
      };
    });
    const catalogBannerURLs = catalog.map(banner => {
      return banner.url;
    });
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1, paddingTop: 10 }}
          data={this.state.data}
          numColumns={2}
          renderItem={this.renderCatelogItem}
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
          images={catalogBannerImages}
          urls={catalogBannerURLs}
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
export default connect(mapStateToProps)(CatelogScreen);
