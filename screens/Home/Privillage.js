import React, { Component } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

class PrivillageScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Rewards",
    headerTintColor: "#000000",
    headerBackTitle: null
  });
  renderRewardItem = (item, key) => {
    return (
      <View key={key} style={styles.rewardItem}>
        <View style={styles.rewardItem__thumbnail}>
          <Image
            style={styles.rewardItem__thumbnail_image}
            source={item.image}
          />
        </View>
        <View style={styles.rewardItem__detail}>
          <Text style={styles.rewardItem__detail_text} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    const mockup = [
      {
        id: 0,
        title: "รับเครื่องดื่มฟรีเมื่อเข้าใช้บริการ Lounge",
        image: {
          uri:
            "https://www.aa.com/content/images/travel-info/clubs/lounges-flagship-lounge-filler.jpg"
        }
      },
      {
        id: 1,
        title: "รับกาแฟฟรี 1 แก้ว เมื่อซื้อสินค้าครบ 500 บาท",
        image: {
          uri:
            "https://www.pullmanbangkokkingpower.com/wp-content/uploads/sites/53/2016/10/Bangkok-City-Hotel-Executive-Lounge.jpg"
        }
      }
    ];
    return (
      <View style={styles.container}>
        <ScrollView style={styles.rewardList}>
          {mockup.map(this.renderRewardItem)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4E4E4"
  },
  rewardList: {
    padding: 20
  },
  rewardItem: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    marginBottom: 20
  },
  rewardItem__thumbnail: {
    width: "100%",
    height: 100,
    backgroundColor: "#dfdfdf",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: "hidden"
  },
  rewardItem__thumbnail_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  rewardItem__detail: {
    padding: 15
  },
  rewardItem__detail_text: {
    fontWeight: "bold",
    color: "#635F62"
  }
});

export default PrivillageScreen;
