import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAsset } from '@/app/context/AssetContext';

import AssetPicker from '@/components/AssetPicker'; 


const HomeScreen = () => {
  const { selectedValue, setSelectedValue } = useAsset();
  const [assetDetails, setAssetDetails] = useState<any>(null); // State to hold asset details
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading


  useEffect(() => {
    const fetchAssetDetails = async () => {
      if (selectedValue !== "choose") {
        setLoading(true);
        try {
          const response = await fetch(`https://asset-tracker-51790a967fc8.herokuapp.com/assets/${selectedValue}`);
          const data = await response.json();
          setAssetDetails(data);
        } catch (error) {
          console.error('Error fetching asset details:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setAssetDetails(null); // Reset asset details if "choose" is selected
      }
    };

    fetchAssetDetails(); // Call the function whenever selectedValue changes
  }, [selectedValue]); // Dependency array includes selectedValue

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#233452', dark: '#080808' }}
      headerImage={
        <Image
          source={require('@/assets/images/tesla-sol-brand-logo.png')}
          style={styles.brandLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <AssetPicker selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <AssetDetails assetDetails={assetDetails} />
      </ThemedView>
      
      
    </ParallaxScrollView>
  );
};

const AssetDetails = ({ assetDetails }: { assetDetails: any }) => {
  if (!assetDetails) return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">No asset selected</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">{assetDetails.name}</ThemedText>

      {assetDetails.rigs.map((rig: any) => (
        <ThemedView key={rig.id} style={styles.rigContainer}>
          <ThemedText>Rig ID: {rig.id}</ThemedText>
          <ThemedText>Production: {rig.performanceData.production} units</ThemedText>
          <ThemedText>Downtime: {rig.performanceData.downtime} hours</ThemedText>
          <ThemedText>Efficiency: {rig.performanceData.efficiency}%</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  assetDetailsContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#f0f0f0', // Optional: Add a background color for better visibility
    borderRadius: 8,
  },
  rigContainer: {
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  brandLogo: {
    height: 178,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default HomeScreen;
