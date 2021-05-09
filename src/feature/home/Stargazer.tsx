import { getStargazer } from 'api/repositoryApi';
import { Themes } from 'assets/themes';
import { StyledList, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ItemRepository from './components/ItemRepository';

const Stargazer = ({ route }: any) => {
    const { params } = route;
    const [pageIndex, setPageIndex] = useState(1);
    const [listStargazer, setListStargazer] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const renderListStargazer = ({ item }: any) => (
        <ItemRepository data={item} avatar={item?.avatar_url} isDetail={false} />
    );
    useEffect(() => {
        getDataStargazer();
    }, [pageIndex]);
    const getDataStargazer = async () => {
        try {
            setLoading(true);
            const stargazer: any = await getStargazer(params?.name, params?.repositoryName, pageIndex, 2);
            if (stargazer) {
                console.log('stargazer', stargazer);
                setListStargazer([...listStargazer, ...stargazer]);
            }
        } catch (err) {
            AlertMessage(err);
        } finally {
            setLoading(false);
        }
    };
    const onLoadMore = () => {
        setPageIndex(pageIndex + 1);
    };
    return (
        <View style={styles.container}>
            <StyledHeader title={params?.name} />
            <StyledOverlayLoading visible={loading} />
            <StyledList data={listStargazer} renderItem={renderListStargazer} />
            {params?.totalStargazer > listStargazer?.length && (
                <StyledTouchable
                    customStyle={[
                        styles.loadMore,
                        { backgroundColor: !loading ? Themes.COLORS.repository : Themes.COLORS.placeHolderGray },
                    ]}
                >
                    <StyledText
                        i18nText={'repository.loadMoreStargazer'}
                        onPress={() => onLoadMore()}
                        customStyle={styles.textLoadMore}
                    />
                </StyledTouchable>
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Themes.COLORS.white,
    },
    loadMore: {
        backgroundColor: Themes.COLORS.repository,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: '5@vs',
        marginBottom: '10@vs',
    },
    textLoadMore: {
        paddingHorizontal: '15@s',
        paddingVertical: '10@vs',
    },
});
export default Stargazer;
