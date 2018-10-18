import React, { Component } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { List, ListItem } from "react-native-elements";
import moment from "moment";

class OfferScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Today Offer",
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
    // this.makeRemoteRequest();
    const mockup = [
      {
        id: 0,
        title: "ห้ามพลาด สินค้าสุดพิเศษกับนมยูเอชทีแลคตาซอย",
        date: "29/08/2018"
      },
      {
        id: 1,
        title: "ว๊าววว!!สุดพิเศษกับสะโพกหมูลดเหลือกิโลกรัมละ 89 บาท",
        date: "28/08/2018"
      },
      {
        id: 2,
        title: "ลดถูกมาก!! องุ่นแดงนอกจีน เหลือแค่กิโลกรัมละ 39 บาท เท่านั้น",
        date: "26/08/2018"
      },
      {
        id: 3,
        title: "ลดแล้วลดอีกกับกะทิ 100% ชาวเกาะ ขนาด 500 มิลลิลิตร",
        date: "25/08/2018"
      },
      {
        id: 4,
        title:
          "อย่าช้ารีบมาแม็คโครกัน กับราคาสุดพิเศษ นำ้มันปาล์มเกสร ขนาด 100 มล",
        date: "24/08/2018"
      },
      {
        id: 5,
        title: "ห้ามพลาด! สำหรับผู้ประกอบการ กับน้ำหวานเฮลซ์บลูบอย",
        date: "23/08/2018"
      },
      {
        id: 6,
        title: "ห้ามพลาด!กับ aro สตรอเบอร์รี่แช่แข็งจำนวน 1 กก",
        date: "22/08/2018"
      },
      {
        id: 7,
        title: "หมดแล้วหมดเลยนะกับขนมฟัน-โอ รสช็อคโกแลต",
        date: "21/08/2018"
      },
      {
        id: 8,
        title: "ด่วน! วันเดียวเท่านั้นกับนมไมโล ขนาด 180 มล.",
        date: "20/08/2018"
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
          data: page === 1 ? res.posts : [...this.state.data, ...res.posts],
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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List
          containerStyle={{
            marginTop: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
        >
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                avatarStyle={{ width: 80, height: 80 }}
                avatarContainerStyle={{ width: 80, height: 80 }}
                title={`${item.title}`}
                titleNumberOfLines={1}
                subtitle={`${moment(item.date, "DD/MM/YYYY").format(
                  "DD MMM YYYY"
                )}`}
                avatar={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPTv0mzZ9lqXoIaxb3aRM4XQwxXwk-7jbBSo_ENSXTKhxyPEj5"
                }}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => navigate("OfferView")}
              />
            )}
            keyExtractor={item => item.uuid}
            ListFooterComponent={this.renderFooter}
            ItemSeparatorComponent={this.renderSeparator}
            // onRefresh={this.handleRefresh}
            // refreshing={this.state.refreshing}
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

export default OfferScreen;
