import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import styles from "../../styles/bookShelf";

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
      refreshing: true
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);

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
        style={styles.bookItem}
        onPress={() => navigate("MailView")}
      >
        <View style={{ width: "100%", height: "100%" }}>
          <Image style={styles.bookItem__thumbnail} source={item.image} />
          <View style={styles.bookItem__title}>
            <Text style={styles.bookItem__title_text} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          <Image
            style={styles.bookItem__bg}
            source={
              this.checkIndexIsEven(item.id)
                ? require("../../assets/shelf_bg_l/shelf_bg_l.png")
                : require("../../assets/shelf_bg_r/shelf_bg_r.png")
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ paddingTop: 10 }}
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
      </View>
    );
  }
}

export default CatelogScreen;
