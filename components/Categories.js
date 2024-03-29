import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { client } from "../sanity";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "category"] {
        ...,
      }
      `
      )
      .then((res) => {
        setCategories(res);
      });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {/* Category card */}
      {categories?.map((cate) => (
        <CategoryCard key={cate?._id} imgUrl={cate?.image} title={cate?.name} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
