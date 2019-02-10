import { bindActionCreators } from "redux";
import { BlurView } from "expo";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  View,
  TouchableHighlight,
  SafeAreaView,
  Image,
  Dimensions,
  Text,
  PixelRatio
} from "react-native";
import React, { Component } from "react";
import Barcode from "react-native-barcode-builder";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import EStyleSheet from "react-native-extended-stylesheet";

import { closeCardPreviewModal } from "../actions/modalAction";
import { isEmpty } from "../utils/validate";
import css from "../styles";

class CardPreviewModal extends Component {
  _renderCloseButton() {
    return (
      <TouchableHighlight style={css.modal.closeButton} onPress={this.props.closeCardPreviewModal}>
        <Text style={css.modal.closeButton__text}>
          <FormattedMessage id="close" />
        </Text>
      </TouchableHighlight>
    );
  }
  render() {
    const { width, height } = Dimensions.get("window");
    const { user } = this.props.user;
    EStyleSheet.build({ $rem: width / 380 });

    return (
      <View style={css.modal.container}>
        <View style={css.modal.wrapper}>
          <View style={css.modal.wrapper__body}>
            <SafeAreaView forceInset={{ top: "always" }}>
              <View style={styles.cardView}>
                <Image
                  style={styles.cardView__image}
                  source={require("../assets/card_preview/card.png")}
                  resizeMode="contain"
                />
                <View style={styles.cardView__wrapper}>
                  <Barcode
                    width={2.3}
                    height={50}
                    value={user.member_code}
                    format="CODE128"
                    text={user.member_code}
                  />
                  <Text style={styles.cardView__wrapper_text}>
                    {!isEmpty(user.name) && user.name}
                  </Text>
                  <Text style={{ color: "#000000", fontSize: 18, fontWeight: "bold" }} />
                </View>
              </View>
            </SafeAreaView>
          </View>
          <SafeAreaView forceInset={{ bottom: "always" }}>{this._renderCloseButton()}</SafeAreaView>
        </View>
        <BlurView tint="dark" intensity={100} style={css.modal.blurBgAbsolute} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  cardView: {
    flex: 0,
    width: 460,
    height: 290,
    transform: [{ rotate: "270deg" }]
  },
  cardView__image: {
    width: "100%",
    height: "100%",
    flex: 1,
    zIndex: 98
  },
  cardView__wrapper: {
    position: "absolute",
    left: 25,
    bottom: 10,
    zIndex: 99,
    width: 460,
    flex: 1,
    alignItems: "flex-start",
    transform: [{ rotate: "0deg" }]
  },
  cardView__wrapper_text: {
    color: "#000000",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => ({
  modal: state.modalReducer,
  user: state.userReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ closeCardPreviewModal }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardPreviewModal);
