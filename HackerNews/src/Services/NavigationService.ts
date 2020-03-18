import {
  NavigationActions,
  StackActions,
  NavigationParams
} from "react-navigation";

let _navigator: any;

function navigate(routeName: string, params: NavigationParams) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function reset(routeName: string, params?: NavigationParams) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  reset
};
