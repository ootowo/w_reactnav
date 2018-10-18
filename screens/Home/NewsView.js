import React, { Component } from "react";
import {
  View,
  ScrollView,
  WebView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import { connect } from "react-redux";
import ShareHeader from "../../components/ShareHeader";
import { mockHtml } from "../../web/html";

class NewsView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "News View",
    headerBackTitle: null,
    headerTintColor: "#000000",
    headerRight: <ShareHeader />
  });
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    const newsContent = `
      แม็คโครพารวย แจก 22 ล้าน ลุ้นทุกสัปดาห์ ทั่วไทย<br /><br /><br />
      สมาชิกแม็คโครซื้อสินค้าในแผนกใดก็ได้ (ยกเว้น สินค้าประเภทบุหรี่ สุรา เครื่องดื่มแอลกอฮอล์ น้ำตาลทราย นมผงเด็กแรกเกิด,
      นมผงเด็กสูตรต่อเนื่อง กลุ่มยาและเวชภัณฑ์) ที่แม็คโครในวันที่ 20 มิ.ย. - 28 ส.ค.2561 นำใบเสร็จรับเงินหรือใบกำกับภาษีภายใน
      วันเดียวกันครบทุก 2,500 บาท (รวมภาษีมูลค่าเพิ่ม) นำไปแลกรับคูปองชิงโชค 1 ใบ (สูงสุดจำนวน 10 ใบ/ ใบเสร็จรับเงิน) ที่จุดแลกคูปอง
      อ่านรายละเอียดเพิ่มเติม คลิ๊ก <a href="https://bit.ly/2MEbiYo">https://bit.ly/2MEbiYo</a>
    `;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <WebView
            style={{
              flex: 1,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height
            }}
            source={{
              html: mockHtml(
                "https://www.jobbkk.com/upload/variety/makro/03.jpg",
                "แม็คโครพารวย แจก 22 ล้าน ลุ้นทุกสัปดาห์ ทั่วไทย",
                newsContent,
                this.props.fontSize.size
              )
            }}
          />
        </ScrollView>
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

const mapStateToProps = state => ({
  fontSize: state.fontSizeReducer
});
export default connect(mapStateToProps)(NewsView);
