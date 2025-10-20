// app/componentsDictionary/Dictionary.tsx (or wherever this lives)
import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

// Import components
import UserHeader from "../components/Userheader";
import SearchBar from "../components/SearchBar";
import FavoritesHeader from "../componentsDictionary/FavoritesHeader";
import DictionaryCard from "../componentsDictionary/DictionaryCard";
import Navbar from "./navbar";
import { router } from "expo-router";

// Import your API + types
import { fetchCategories } from "../services/dictApi";
import type { Category } from "../types/dictionary";

export default function Dictionary() {
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (e: any) {
        const msg = e?.message ?? "Failed to load categories";
        setErr(msg);
        Alert.alert("Dictionary", msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Optional: simple client-side filter with your SearchBar (if it exposes onChange)
  const visibleCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, search]);

  const handleFavoritesPress = () => {
    router.push("/componentsDictionary/FavoritesTab");
  };

  // When a category card’s arrow is pressed
  const handleCategoryOpen = (cat: Category) => {
    // Navigate to your category page where you’ll list SIGNS for this category
    // Create this screen later (e.g., app/componentsDictionary/Category.tsx)
    router.push({
      pathname: "/componentsDictionary/FSLAlphabet",
      params: { slug: cat.slug, name: cat.name },
    });
  };

  const handleFavoriteToggle = (isFavorited: boolean) => {
    // Wire up to your persistence if needed
    console.log("Favorite toggled:", isFavorited);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.topBackground}>
        <View style={styles.middleBackground}>
          <UserHeader userName="Dictionary" greeting="Your FSL" />

          <View style={styles.contentBackground}>
            <SearchBar
              placeholder="Search Dictionary"
              // If your SearchBar supports it; otherwise remove these two:
              value={search}
              onChangeText={setSearch}
            />

            {loading ? (
              <ActivityIndicator style={{ marginTop: 16 }} />
            ) : (
              <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
              >
                <FavoritesHeader onPress={handleFavoritesPress} />

                {/* LOOP: one DictionaryCard per category */}
                {visibleCategories.map((cat) => (
                  <DictionaryCard
                    key={cat.slug}
                    title={cat.name}
                    description="Tap to view signs in this category"
                    onArrowPress={() => handleCategoryOpen(cat)}
                    onFavoritePress={handleFavoriteToggle}
                    initialFavorited={false}
                    // If your card supports images, pass the banner (remote) if present
                    {...(cat.banner_url
                      ? { imageSource: { uri: cat.banner_url } }
                      : {})}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a3a3a3" },
  topBackground: { flex: 1, backgroundColor: "#a3a3a3", paddingTop: 50 },
  middleBackground: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 0,
    position: "relative",
  },
  contentBackground: {
    zIndex: 3,
    flex: 1,
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -55,
    padding: 20,
  },
  scrollContainer: { flex: 1 },
  contentContainer: { gap: 15, paddingBottom: 100 },
});
