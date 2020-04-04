/**
 * @format
 */

import { AppRegistry } from "react-native";
import AppProvider from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => AppProvider);
