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
import { BannerDark } from "../../components/Banner";

import styles from "../../styles/bookShelf";

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
      refreshing: true
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);

    this.renderBookItem = this.renderBookItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount() {
    // this.makeRemoteRequest();
    const mockup = [
      {
        id: 0,
        title: "29 ส.ค 2561 - 11 ก.ย. 2561 ต่อยอดรวยด้วยธุรกิจอาหารแม็คโ",
        image: require("../../assets/mockup/mails/01.jpg")
      },
      {
        id: 1,
        title:
          "29 ส.ค 2561 - 11 ก.ย. 2561 สินค้าครบครัน เพื่อผู้ประกอบการร้านเครื่องดื่",
        image: require("../../assets/mockup/mails/02.jpg")
      },
      {
        id: 2,
        title: "29 ส.ค 2561 - 11 ก.ย. 2561 รวมสินค้าเด็ดเพื่อร้านอาหารอีสา",
        image: require("../../assets/mockup/mails/03.jpg")
      },
      {
        id: 3,
        title: "23 พ.ค. 2561 - 30 พ.ย. 2561 แจกแรงทั่วไทย แจกกำไรทุกเดือ",
        image: require("../../assets/mockup/mails/04.jpg")
      }
    ];
    this.setState({ data: mockup });
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
        <BannerDark
          mini={true}
          image={{
            uri:
              "http://www.chiangmaicitylife.com/wp-content/uploads/2017/07/APIS2847-1350x900.jpg"
          }}
        />
      </View>
    );
  }
}

export default MailScreen;
