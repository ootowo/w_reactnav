import React, { Component } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Container, Header, Item, Input, Icon, Button } from "native-base";
import { LinearGradient } from "expo";

import css from "../../styles";

class CatelogScreen extends Component {
  constructor(props) {
    super(props);
    this.checkIndexIsEven = this.checkIndexIsEven.bind(this);
  }

  checkIndexIsEven(n) {
    return n % 2 == 0;
  }

  render() {
    const { navigate } = this.props.navigation;
    const categoryList = [
      {
        image_src: {
          uri:
            "https://www.istudy.org.uk/wp-content/uploads/2017/08/PP18-DIPLOMA-IN-PROFESSIONAL-CHEF-1-768x461.jpg"
        },
        title: "Coffee Shop"
      },
      {
        image_src: {
          uri:
            "https://www.marketing91.com/wp-content/uploads/2017/08/Difference-between-retailer-wholesaler-and-distributor.jpg"
        },
        title: "Retailer"
      },
      {
        image_src: {
          uri:
            "https://static1.squarespace.com/static/57d2e5c5bebafbc1a4a62ae0/t/57fe73dcd1758e96456e080b/1476293737480/MOTION+CROIX.jpg?format=1000w"
        },
        title: "Bakery"
      },
      {
        image_src: {
          uri:
            "https://media-cdn.tripadvisor.com/media/photo-s/11/45/43/2c/restaurant-by-night.jpg"
        },
        title: "Restaurant"
      },
      {
        image_src: {
          uri:
            "https://pix10.agoda.net/hotelImages/871/871705/871705_16112815520049163655.jpg?s=1024x768"
        },
        title: "Hotel And Spa"
      },
      {
        image_src: {
          uri:
            "https://s3-ap-southeast-1.amazonaws.com/builk3storage/project/20160215_023550_project_2010740_big.jpg"
        },
        title: "Other"
      }
    ];

    return (
      <Container>
        <View style={css.search.searchBar}>
          <View style={css.search.searchBar__container}>
            <Icon
              name="ios-search"
              style={{ fontSize: 20, color: "#363636" }}
            />
            <TextInput
              placeholder="Search..."
              style={css.search.searchBar__text}
            />
          </View>
        </View>
        <ScrollView>
          <View style={styles.category}>
            {categoryList.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.category__item,
                  this.checkIndexIsEven(index + 1)
                    ? styles.category__item___n2child
                    : null
                ]}
                onPress={() => navigate("ProductList")}
              >
                <View style={styles.category__item_container}>
                  <View style={styles.category__item_thumbnail}>
                    <Image
                      style={{ width: "100%", height: "100%" }}
                      source={item.image_src}
                      resize="cover"
                    />
                  </View>
                  <LinearGradient
                    colors={["#FF0000", "#b20000"]}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    style={styles.category__item_title}
                  >
                    <Text style={styles.category__item_title_text}>
                      {item.title}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  category: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    marginHorizontal: 10
  },
  category__item: {
    flex: 0,
    width: "50%",
    height: 130,
    paddingRight: 5,
    paddingBottom: 10
  },
  category__item___n2child: {
    paddingRight: 0,
    paddingLeft: 5
  },
  category__item_container: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 5,
    overflow: "hidden"
  },
  category__item_thumbnail: {
    flex: 1,
    width: "100%"
  },
  category__item_title: {
    flex: 0,
    alignItems: "flex-end",
    padding: 7,
    backgroundColor: "#FF0000"
  },
  category__item_title_text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});

export default CatelogScreen;
