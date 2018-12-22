import { createSwitchNavigator } from "react-navigation";

import AuthenStack from "./AuthenStack";
import MainStack from "./MainStack";
import AuthenLoadingScreen from "../screens/AuthLoading";

const generalConfig = {
  headerMode: "none",
  cardStyle: {
    backgroundColor: "#FFFFFF"
  },
  initialRouteName: "AuthenLoading"
};
export default createSwitchNavigator(
  {
    AuthenLoading: AuthenLoadingScreen,
    Main: MainStack,
    Authen: AuthenStack
  },
  generalConfig
);
