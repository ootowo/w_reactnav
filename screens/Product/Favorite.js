import { List, ListItem } from "react-native-elements";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import moment from "moment";
import React, { Component } from "react";

class FavoriteScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Favorites",
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
    //this.makeRemoteRequest();
    const mockup = [
      {
        id: 0,
        title: "Otto Heavy Duty Blender",
        image: {
          uri:
            "https://img10.jd.co.th/n0/jfs/t13/76/28441736/67525/88369413/5b764e81N1914df9a.jpg!q70.jpg"
        },
        price: "$2,590"
      }
    ];
    this.setState({ data: mockup });
  }
  makeRemoteRequest() {
    const { page, seed } = this.state;
    const url = `https://jsonplaceholder.typicode.com/albums`; // const url = "http://webhose.io/filterWebContent?token=de2d8fea-738b-4b11-82ca-05c776b155bb&format=json&sort=crawled&q=sport%20language%3Athai";
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
                avatarStyle={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#FFFFFF"
                }}
                avatarContainerStyle={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#FFFFFF"
                }}
                title={`${item.title}`}
                titleNumberOfLines={2}
                subtitle={`1029.00 USD`}
                avatar={item.image}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => navigate("ProductDetail")}
              />
            )}
            keyExtractor={item => item.uuid}
            ListFooterComponent={this.renderFooter}
            ItemSeparatorComponent={this.renderSeparator}
            // onRefresh={this.handleRefresh}
            // refreshing={this.state.refreshing}
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={50}
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

export default FavoriteScreen;
