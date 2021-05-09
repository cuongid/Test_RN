import { Themes } from 'assets/themes';
import { StyledImage, StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface ItemRepositoryProps {
    data: any;
    customStyle?: StyleProp<ViewStyle>;
    avatar?: string;
    onPress?(): void;
    isDetail?: boolean;
}

const ItemRepository = (props: ItemRepositoryProps) => {
    const { data, customStyle, avatar, onPress, isDetail = true } = props;
    return (
        <View style={[styles.container, customStyle]}>
            <StyledImage customStyle={styles.avatar} source={{ uri: avatar || '' }} />
            <View style={styles.viewName}>
                <StyledText i18nText={data?.name || data?.login} customStyle={styles.name} numberOfLines={2} />
                {isDetail && (
                    <StyledTouchable onPress={onPress} customStyle={styles.button}>
                        <StyledText i18nText={'repository.stargazers'} customStyle={styles.stargazers} />
                    </StyledTouchable>
                )}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '20@s',
        marginTop: '15@vs',
    },
    avatar: {
        width: '60@vs',
        height: '60@vs',
        borderRadius: '30@vs',
    },
    button: {
        borderRadius: '5@vs',
        backgroundColor: Themes.COLORS.textSecondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: '14@ms',
        fontWeight: 'bold',
        marginLeft: '15@s',
        flexWrap: 'wrap',
        width: '50%',
    },
    viewName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stargazers: {
        marginHorizontal: '5@s',
        paddingHorizontal: '5@s',
        paddingVertical: '10@vs',
    },
});
export default ItemRepository;
