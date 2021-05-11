import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Images from 'assets/images';
import AccountView from 'feature/account/AccountView';
import NotificationScreen from 'feature/notification/NotificationScreen';
import Repository from 'feature/repository/Repository';
import SettingView from 'feature/setting/SettingScreen';
import StyledTabBar from 'navigation/components/StyledTabBar';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';

// const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

// const HomeStack = () => (
//     <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
//         <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME} component={HomeScreen} />
//         <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DETAIL} component={HomeDetailScreen} />
//         <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.WEB_VIEW} component={HomeDetailScreen} />
//         <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_DATA} component={HomeDataScreen} />
//         <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME_USER_LIST} component={HomeUserListScreen} />
//     </MainStack.Navigator>
// );

const MainTabContainer = () => {
    const { t } = useTranslation();
    const ArrayTabs = [
        {
            name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
            title: t('tab.home'),
            component: Repository,
            icon: Images.icons.tab.home,
        },
        {
            name: TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT,
            title: t('tab.notification'),
            component: NotificationScreen,
            icon: Images.icons.tab.notification,
        },
        {
            name: TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT,
            title: t('tab.setting'),
            component: SettingView,
            icon: Images.icons.tab.setting,
        },
        {
            name: TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.ROOT,
            title: t('tab.account'),
            component: AccountView,
            icon: Images.icons.tab.setting,
        },
    ];
    return (
        <MainTab.Navigator tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}>
            {ArrayTabs.map((item, index) => (
                <MainTab.Screen key={`${index}`} options={{ ...item }} {...item} />
            ))}
        </MainTab.Navigator>
    );
};

export default MainTabContainer;
