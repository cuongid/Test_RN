import { createStackNavigator } from '@react-navigation/stack';
import Stargazer from 'feature/home/Stargazer';
import React from 'react';
import { Host } from 'react-native-portalize';
import navigationConfigs from '../config/options';
import { APP_ROUTE, HOME_ROUTE } from '../config/routes';
import AuthStack from './AuthScenes';
import MainTabContainer from './TabScenes';

const MainStack = createStackNavigator();

const AppStack = () => (
    <Host>
        <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs}>
            <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
            <MainStack.Screen name={HOME_ROUTE.STARGAZER} component={Stargazer} />
        </MainStack.Navigator>
    </Host>
);

const Navigation: React.FunctionComponent = () => {
    // const { userInfo } = useSelector((state: RootState) => state);
    // if (userInfo.token) {
    return <AppStack />;
    // }
    return <AuthStack />;
};

export default Navigation;
