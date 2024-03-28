import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ResturantCard from "./ResturantCard";
import { client } from "../sanity";

export default function FeaturedRows({ title, id, description }) {
  const [resturant, setResturant] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
      *[_type == "featuredMenu" && _id == $id] {
          ...,
          retaurants []-> {
            ...,
            dishes []-> {
              ...,
            }
          }
        }[0]
      
      
      `,
        { id }
      )
      .then((data) => {
        setResturant(data.retaurants);
      });
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="text-bold text-lg">{title}</Text>
        <ArrowRightIcon color={"#00ccbb"} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Resturant card */}
        {resturant?.map((res) => (
          <ResturantCard
            key={res._id}
            id={res._id}
            imgUrl={res.image}
            title={res.title}
            rating={res?.rating}
            genre="Nigerian"
            address={res.address}
            short_description={res.short_description}
            dishes={[]}
            long={res.long}
            lat={res.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
