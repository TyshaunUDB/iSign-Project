import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface CategoryInfoCardProps {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
}

const CategoryInfoCard: React.FC<CategoryInfoCardProps> = ({
  title,
  description,
  imageSource,
}) => {
  return (
    <View style={styles.container}>
      {/* Left side - Category image */}
      <View style={styles.imageContainer}>
        <Image 
          source={imageSource}
          style={styles.categoryImage}
          resizeMode="cover"
        />
      </View>
      
      {/* Right side - Title and description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },
  imageContainer: {
    marginRight: 16,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#343434',
    marginBottom: 4,
  },
  description: {
    fontSize: 8,
    color: '#888888',
    lineHeight: 9,
  },
});

export default CategoryInfoCard;
