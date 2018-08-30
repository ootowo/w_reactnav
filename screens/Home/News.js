import React, { Component } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { List, ListItem } from "react-native-elements";
import moment from "moment";

class NewsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "News and Activity",
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
        title: "แม็คโครพารวย แจก 22 ล้าน ลุ้นทุกสัปดาห์ ทั่วไทย",
        image: "",
        date: "20/06/2018"
      },
      {
        id: 1,
        title: "แม็คโคร มหกรรมครบเครื่องเรื่องอาหาร และอุปกรณ์ กลับมาอีกครั้ง",
        image: "",
        date: "09/03/2018"
      },
      {
        id: 2,
        title: "เปิดเลย ตรวจสอบสิทธิชิงโชค",
        image: "",
        date: "30/12/2017"
      },
      {
        id: 3,
        title: "แม็คโคร ร่วมมือกับกทม. สนับสนุนโครงการจัดและจำหน่ายมอบกระเช้า",
        image: "",
        date: "28/12/2017"
      },
      {
        id: 4,
        title: "แจกโชค 5,000 บาท 100 รางวัล รับปีจอ",
        image: "",
        date: "28/12/2017"
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
          width: "92%",
          backgroundColor: "#CED0CE",
          marginLeft: "8%"
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
                titleNumberOfLines={2}
                subtitle={`${moment(item.date, "DD/MM/YYYY").format(
                  "DD MMM YYYY"
                )}`}
                avatar={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPTv0mzZ9lqXoIaxb3aRM4XQwxXwk-7jbBSo_ENSXTKhxyPEj5"
                }}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => navigate("NewsView")}
              />
            )}
            keyExtractor={item => item.id}
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

export default NewsScreen;
