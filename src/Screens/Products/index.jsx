import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { useEffect, useState } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters';

const ProductScreen = ({ navigation }) => {
    const [mobiles, setMobiles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const response = await fetch('https://dummyjson.com/products', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: true
                })
                const result = await response.json();
                if (response.status == 200) {
                    setMobiles(result?.products);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                ToastAndroid.show("Network error, Please check your internet connection", ToastAndroid.LONG);
            }
        })()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                {loading ? <ActivityIndicator size={"large"} color={"#000"} style={styles.activeIndicator} /> : <FlatList
                    data={mobiles}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable onPress={() => navigation.navigate('Product Details', { id: item?.id })}>
                                <View style={styles.cardView} key={item?.id}>
                                    <View style={{}}>
                                        <Image source={{ uri: item.thumbnail }} style={styles.image} />
                                    </View>
                                    <View style={{ flex: 1, gap: 5 }}>
                                        <Text style={styles.titleText}>{item?.title?.slice(0, 15)}{item?.title.length >= 15 ? "..." : ''}</Text>
                                        <Text style={styles.descriptionText}>{item?.description?.slice(0, 25)}...</Text>
                                        <Text style={[styles.descriptionText, {fontWeight: '700'}]}>₹ {item?.price}/-</Text>
                                    </View>
                                    <View style={styles.ratingView}>
                                        <Text style={styles.ratingText}>{item?.rating}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        );
                    }}
                    contentContainerStyle={{ paddingTop: verticalScale(20) }}
                />}
            </View>
        </SafeAreaView>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF6F5',
    },
    activeIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardView: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        paddingVertical: verticalScale(15),
        borderRadius: moderateScale(10),
        elevation: 4,
        gap: 15,
        marginHorizontal: moderateScale(15),
        marginBottom: verticalScale(15)
    },
    image: {
        width: moderateScale(140),
        height: verticalScale(90),
        resizeMode: 'cover',
        borderRadius: moderateScale(10),
    },
    titleText: {
        color: '#221F26',
        fontWeight: '700',
        fontSize: moderateScale(16),
        textTransform: 'capitalize'
    },
    ratingView: {
        position: 'absolute',
        height: verticalScale(25),
        width: moderateScale(25),
        backgroundColor: '#F5C60D',
        justifyContent: "center",
        alignItems: 'center',
        elevation: 2,
        borderRadius: moderateScale(20),
        right: moderateScale(10),
        top: verticalScale(10),
    },
    ratingText: {
        fontSize: moderateScale(8),
        color: '#fff',
        fontWeight: '700'
    },
    priceText: {
        color: '#000',
        fontWeight: '700',
        fontSize: moderateScale(12)
    },
    descriptionText: {
        color: '#000',
        fontWeight: '500',
        fontSize: moderateScale(12)
    },
});
