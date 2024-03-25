import { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.reset({index: 0, routes:[{name: 'Products'}]})
        }, 5000);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.lottieView}>
                <LottieView
                    source={require('../Assets/splash.json')}
                    autoPlay
                    loop
                    style={styles.lottieStyle}
                />
                <View style={{ position: 'absolute' }}>
                    <Text style={styles.mobileWorldText}> Moblie World </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#80C3FC"
    },
    lottieView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mobileWorldText: {
        fontSize: moderateScale(36),
        color: '#F5F5F5',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: moderateScale(10),
    },
    lottieStyle: { width: moderateScale(420), height: verticalScale(420) },
});


