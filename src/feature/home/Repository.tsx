/* eslint-disable no-unused-expressions */
import { getRepository, getUser } from 'api/repositoryApi';
import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledList, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import { HOME_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import ItemRepository from './components/ItemRepository';

let isSearch = false;
const Repository = () => {
    const { t } = useTranslation();
    const [data, setData] = useState({ name: '', pageIndex: 1, pageSize: 2 });
    const [userInfo, setUserInfo] = useState<any>({});
    const [listRepository, setListRepository] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const onSearchRepository = async () => {
        try {
            setData({ ...data, pageIndex: 1 });
            isSearch = true;
            const user = await getUser(data?.name);
            if (user) {
                setUserInfo(user);
                console.log({ user });
                getDataRepository();
            }
        } catch (err) {
            AlertMessage(err);
        }
    };
    useEffect(() => {
        console.log({ listRepository });
    }, [listRepository]);
    const getDataRepository = async () => {
        setListRepository([]);
        try {
            setLoading(true);
            const repository: any = await getRepository(data?.name, data?.pageIndex, data?.pageSize);
            if (repository) {
                isSearch ? setListRepository(repository) : setListRepository([...listRepository, ...repository]);
            }
        } catch (err) {
            AlertMessage(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data?.pageIndex > 1) {
            isSearch = false;
            getDataRepository();
        }
    }, [data?.pageIndex]);

    const renderItem = ({ item }: any) => (
        <ItemRepository data={item} avatar={userInfo?.avatar_url} onPress={() => onStargazer(item)} />
    );
    const onLoadMore = () => {
        setData({ ...data, pageIndex: data?.pageIndex + 1 });
    };
    const onStargazer = (item: any) => {
        navigate(HOME_ROUTE.STARGAZER, {
            name: data?.name,
            repositoryName: item?.name,
            totalStargazer: item?.stargazers_count,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewSearch}>
                <StyledOverlayLoading visible={loading} />
                <TextInput
                    style={styles.input}
                    value={data?.name}
                    placeholder={t('repository.search')}
                    onChangeText={(text: string) => setData({ ...data, name: text })}
                />
                {!!data?.name && (
                    <StyledTouchable customStyle={styles.search} onPress={() => onSearchRepository()}>
                        <StyledIcon source={Images.icons.repository.search} size={14} />
                    </StyledTouchable>
                )}
            </View>
            {Object.keys(userInfo?.login || {}).length && !!data?.name ? (
                <View style={styles.viewInformation}>
                    <StyledText
                        i18nParams={{ repositoryPublic: userInfo?.public_repos }}
                        i18nText={'repository.totalRepository'}
                        customStyle={styles.textTotal}
                    />
                    <StyledText
                        i18nParams={{ total: listRepository?.length }}
                        i18nText={'repository.loaded'}
                        customStyle={styles.loaded}
                    />
                </View>
            ) : (
                <View />
            )}
            <StyledList data={listRepository} renderItem={renderItem} noDataText={''} />
            {userInfo?.public_repos > listRepository?.length && (
                <StyledTouchable
                    customStyle={[
                        styles.loadMore,
                        { backgroundColor: !loading ? Themes.COLORS.repository : Themes.COLORS.placeHolderGray },
                    ]}
                >
                    <StyledText
                        i18nText={'repository.loadMore'}
                        onPress={() => onLoadMore()}
                        customStyle={styles.textLoadMore}
                    />
                </StyledTouchable>
            )}
        </SafeAreaView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    input: {
        width: '85%',
    },
    viewSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'center',
        height: '45@vs',
        borderWidth: 1,
        borderRadius: '20@vs',
        borderColor: Themes.COLORS.secondary,
        marginLeft: '20@s',
    },
    search: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: '5@s',
    },
    viewInformation: {
        flexDirection: 'row',
        marginLeft: '20@s',
        marginTop: '10@vs',
    },
    loadMore: {
        backgroundColor: Themes.COLORS.repository,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: '5@vs',
    },
    textTotal: {
        fontSize: '13@ms',
        fontWeight: 'bold',
    },
    loaded: {
        marginLeft: '40@s',
        fontSize: '13@ms',
        fontWeight: 'bold',
    },
    textLoadMore: {
        paddingHorizontal: '15@s',
        paddingVertical: '10@vs',
    },
});
export default Repository;
