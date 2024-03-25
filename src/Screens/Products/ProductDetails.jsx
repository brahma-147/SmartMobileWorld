import { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ProductDetails = ({ route }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          },
          credentials: true
        })
        const result = await response.json();
        if (response.status == 200) {
          setProduct(result);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        ToastAndroid.show("Network error, Please check your internet connection", ToastAndroid.LONG);
      }
    })()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ?
        <ActivityIndicator
          size={"large"}
          color={"#000"}
          style={styles.activeIndicator}
        /> :
        <View style={{ flex: 1 }}>
          <View style={styles.flatListMainView}>
            <FlatList
              data={product?.images}
              horizontal
              showsHorizontalScrollIndicator={true}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ elevation: 4 }} key={index}>
                    <View style={{ paddingRight: moderateScale(20) }} key={index}>
                      <Image source={{ uri: item }} style={styles.image} />
                    </View>
                  </View>
                )
              }}
              contentContainerStyle={{}}
              ListEmptyComponent={
                <Text style={styles.noDataFoundText}>
                  No data found!
                </Text>
              }
            />
          </View>

          <View style={styles.deviceNameView}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.brandText}><Text style={{ fontWeight: 'bold' }}>{product?.brand}</Text> {product?.title}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 2 }}>
                <FontAwesome name='star' color="#F5C60D" size={15} />
                <Text style={styles.ratingText}>{product?.rating}</Text>
              </View>
            </View>
            <Text style={styles.priceText}>MRP  <Text style={{ fontWeight: '700' }}>₹{product?.price} </Text><Text>{`(${product?.discountPercentage} %OFF)`}</Text></Text>
            {product?.stock < 40
              ? <Text style={[styles.priceText, {color: 'red'}]}>{product?.stock} Hurry up only Few left</Text>
              : <Text style={[styles.priceText, {color: 'green'}]}>Available stocks {product?.stock}</Text>
            }
          </View>

          <View style={styles.featuresView}>
            <Text style={styles.featureText}>Features: </Text>
            <Text style={styles.descriptionText}>{product?.description}</Text>
          </View>
        </View>
      }
    </SafeAreaView>
  );
};

export default ProductDetails;

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
  flatListMainView: {
    padding: moderateScale(20),
    marginTop: verticalScale(20),
    backgroundColor: '#fff',
    marginHorizontal: moderateScale(15),
    marginBottom: verticalScale(15),
    borderRadius: moderateScale(10),
    elevation: 2
  },
  image: {
    width: moderateScale(250),
    height: verticalScale(250),
    resizeMode: 'cover',
    borderRadius: moderateScale(10)
  },
  noDataFoundText: {
    fontSize: moderateScale(14),
    color: "#000",
    textAlign: 'center',
    fontWeight: '500',
    marginTop: verticalScale(20),
  },
  deviceNameView: {
    marginHorizontal: moderateScale(15),
    backgroundColor: '#fff',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    elevation: 2,
    marginBottom: verticalScale(10)
  },
  brandText: {
    color: '#221F26',
    marginBottom: verticalScale(2),
    fontWeight: '500',
    fontSize: moderateScale(16),
    textTransform: 'capitalize',
    width: moderateScale(250)
  },
  ratingText: {
    color: '#221F26',
    fontWeight: '700',
    fontSize: moderateScale(10)
  },
  priceText: {
    color: '#000',
    fontWeight: '400',
    marginBottom: verticalScale(2),
    fontSize: moderateScale(14)
  },
  descriptionText: {
    color: '#ccc',
    fontWeight: '500',
    fontSize: moderateScale(12)
  },
  featuresView: {
    marginHorizontal: moderateScale(15),
    backgroundColor: '#fff',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    elevation: 2
  },
  featureText: {
    color: '#000',
    fontWeight: '700',
    fontSize: moderateScale(14),
    marginBottom: verticalScale(0)
  },
});