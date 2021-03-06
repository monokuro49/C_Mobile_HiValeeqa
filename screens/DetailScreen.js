import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, IconButton } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import url from "../global/url";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Badge } from "react-native-elements";
import { FocusAwareStatusBar, Prices } from "../global/component";

const DetailScreen = ({ route, navigation }) => {
  const { product_id } = route.params;
  const [product, setProduct] = useState("");
  const [wishlist, setWishlist] = useState("");
  const [cart, setCart] = useState("");
  const [userId, setUserId] = useState("");

  // Get data from api
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      try {
        const checkWishlist = async () => {
          const user_id = await AsyncStorage.getItem("user_id");
          setUserId(user_id);
          const data = {
            user_id: user_id,
          };
          axios
            .get(url + "/api/detail/" + product_id, {
              params: data,
            })
            .then(res => {
              setProduct(res.data.product);
              setWishlist(res.data.wishlist);
              setCart(res.data.cart);
            });
        };

        checkWishlist();
      } catch (e) {
        console.log(e.message);
      }
    });

    return unsubscribe;
  }, []);

  // Cart Badge
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <IconButton
            icon="shopping-outline"
            size={26}
            color="#e87c80"
            style={{ paddingEnd: 0, backgroundColor: "#fff" }}
            onPress={() => navigation.navigate("Cart", { screen: "CartScreen" })}
          />
          {cart > 0 ? (
            <Badge
              value={cart}
              badgeStyle={{ backgroundColor: "#000" }}
              containerStyle={{
                position: "absolute",
                top: 9,
                right: 1,
              }}
            />
          ) : (
            <View></View>
          )}
        </View>
      ),
    });
  });

  // Wishlist
  const addWishlist = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      const data = {
        user_id: user_id,
      };
      axios
        .get(url + "/api/wishlist/" + product_id, { params: data })
        .then(res => {
          setWishlist(res.data.status);
          ToastAndroid.showWithGravity(
            "Berhasil ditambahkan ke Wishlist",
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
        });
    } catch (e) {
      console.warn(e.message);
    }
  };

  const removeWishlist = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      const data = {
        user_id: user_id,
      };
      axios
        .get(url + "/api/r-wishlist/" + product_id, {
          params: data,
        })
        .then(res => {
          setWishlist(res.data.status);
          ToastAndroid.showWithGravity(
            "Berhasil dihapus dari Wishlist",
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
        });
    } catch (e) {
      console.warn(e.message);
    }
  };

  const addToCart = () => {
    try {
      const data = {
        user_id: userId,
      };
      axios
        .get(url + "/api/add-to-cart/" + product_id, { params: data })
        .then(res => {
          if (res.data.msg == "success") {
            axios.get(url + "/api/wishlist", { params: data }).then(res => {
              setCart(res.data.data.cart);
            });
            ToastAndroid.showWithGravity(
              "Produk berhasil ditambahkan ke Keranjang Belanja",
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
            );
          } else {
            ToastAndroid.showWithGravity(
              "Produk gagal ditambahkan ke Keranjang Belanja",
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
            );
          }
        });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.img}>
          <Image
            resizeMode="cover"
            style={{ width: 200, height: 300 }}
            source={{ uri: url + "/img/produk/" + product.image }}
          />
        </View>
        <View style={styles.title}>
          <Prices
            value={product.price}
            renderText={value => (
              <Text style={{ fontSize: 24, fontWeight: "700" }}>{value}</Text>
            )}
          />
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 4 }}>
            {product.product_name}{" "}
            {product.stock < 1 ? (
              <Text>
                |<Text style={{ color: "#dc3545" }}> Stok produk kosong</Text>
              </Text>
            ) : (
              <View></View>
            )}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
            Detail Produk
          </Text>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Bahan</Text>
            <Text style={styles.listText}>{product.material}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Warna</Text>
            <Text style={styles.listText}>{product.color}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Stok</Text>
            <Text style={styles.listText}>{product.stock}</Text>
          </View>
          <View>
            <Text style={styles.describeExtra}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerBtn}>
        {product.stock > 0 ? (
          <Button
            mode="contained"
            color="#e87c80"
            labelStyle={{ color: "#fff" }}
            style={{ borderRadius: 8, flex: 0.8, elevation: 0 }}
            onPress={addToCart}>
            Add to Cart
          </Button>
        ) : (
          <Button
            disabled={true}
            mode="contained"
            color="#e87c80"
            labelStyle={{ color: "#fff" }}
            style={{ borderRadius: 8, flex: 0.8, elevation: 0 }}
            onPress={addToCart}>
            Add to Cart
          </Button>
        )}
        {wishlist == 0 ? (
          <Button
            mode="outlined"
            color="#e87c80"
            style={{
              borderRadius: 8,
              marginStart: 8,
              justifyContent: "center",
              borderColor: "#FF8195",
            }}
            onPress={addWishlist}>
            <Icon name="heart-outline" size={24} />
          </Button>
        ) : (
          <Button
            mode="outlined"
            color="#e87c80"
            style={{
              borderRadius: 8,
              marginStart: 8,
              justifyContent: "center",
              borderColor: "#e87c80",
            }}
            onPress={removeWishlist}>
            <Icon name="heart" size={24} />
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    backgroundColor: "#fff",
    height: 300,
    alignItems: "center",
  },
  list: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
  },
  listTitle: {
    marginRight: 40,
  },
  listText: {
    color: "#6c757d",
  },
  title: {
    backgroundColor: "#fff",
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginVertical: 1,
  },
  describeExtra: {
    lineHeight: 20,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  description: {
    backgroundColor: "#fff",
    marginTop: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  containerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    elevation: 5,
  },
});

export default DetailScreen;
