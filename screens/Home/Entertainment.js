import React, { Component } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { List, ListItem } from "react-native-elements";
import moment from "moment";

class EntertainmentScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Entertainment",
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
        title: "โชห่วย โชว์ซ่า ท้ารวย EP.1",
        image: "",
        date: "01/01/2018"
      },
      {
        id: 1,
        title: "โชห่วย โชว์ซ่า ท้ารวย EP.2",
        image: "",
        date: "01/01/2018"
      },
      {
        id: 2,
        title: "โชห่วย โชว์ซ่า ท้ารวย EP.3",
        image: "",
        date: "01/01/2018"
      },
      {
        id: 3,
        title: "โชห่วย โชว์ซ่า ท้ารวย EP.4",
        image: "",
        date: "01/01/2018"
      },
      {
        id: 4,
        title: "โชห่วย โชว์ซ่า ท้ารวย EP.5",
        image: "",
        date: "01/01/2018"
      },
      {
        id: 5,
        title: "โชห่วย โชว์ซ่า ท้ารวย EP.6",
        image: "",
        date: "01/01/2018"
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
                subtitle={`${moment(item.date).fromNow()}`}
                avatar={{
                  uri:
                    "http://thumbnail.instardara.com/tv/MinimartZaTaaRuay.jpg"
                }}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => navigate("EntertainmentView")}
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

export default EntertainmentScreen;
