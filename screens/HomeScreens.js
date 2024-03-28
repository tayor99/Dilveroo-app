import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRows from "../components/FeaturedRows";
import { client } from "../sanity";

export default function HomeScreens() {
  const navigation = useNavigation();
  const [featuredCategory, setFeaturedCategory] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "featuredMenu"] {
        ...,
        retaurants []-> {
          ...,
          dishes []-> {
            ...,
          }
        }
      }
      `
      )
      .then((data) => {
        setFeaturedCategory(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white ">
      {/* Header */}
      <View className="flex-row pb-3 items-center  space-x-2 mx-4">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color={"#00ccbb"} />
          </Text>
        </View>
        <UserIcon size={35} color={"#00ccbb"} />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color={"grey"} size={20} />
          <TextInput
            placeholder="Resturant and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color={"#00ccbb"} />
      </View>
      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Category */}
        <Categories />
        {/* Featured Rows */}

        {featuredCategory?.map((category) => (
          <FeaturedRows
            key={category?._id}
            id={category?._id}
            title={category?.name}
            description={category?.short_description}
          />
        ))}

        {/* <FeaturedRows
          id="1"
          title="featured"
          description="Paid placements from out partners"
        />
        <FeaturedRows
          id="2"
          title="featured"
          description="Paid placements from out partners"
        />
        <FeaturedRows
          id="3"
          title="featured"
          description="Paid placements from out partners"
        />
        <FeaturedRows
          id="4"
          title="featured"
          description="Paid placements from out partners"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({});
