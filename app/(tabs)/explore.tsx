import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Card } from "@gluestack-ui/themed";
import { CartesianChart, Bar, useChartPressState } from "victory-native";
import {useFont, vec } from "@shopify/react-native-skia";
import { useColorScheme } from "react-native";
import { COLORMODES } from "@gluestack-style/react/lib/typescript/types";
import { BarChart, barDataItem } from 'react-native-gifted-charts';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAsset } from '@/app/context/AssetContext';
import AssetPicker from '@/components/AssetPicker'; 
import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const TabTwoScreen = () => {
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

    const scrollToBottom = () => {
      const scrollView = document.getElementById('scrollViewId'); // Replace with your actual scroll view ID
      if (scrollView) {
        scrollView.scrollTop = scrollView.scrollHeight;
      }
    };

    fetchAssetDetails(); // Call the function whenever selectedValue changes
    scrollToBottom();
    
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
      <ThemedView style={styles.stepContainer}>
        <AssetPicker selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      </ThemedView>
      
      <AssetGraph assetDetails={assetDetails} />
      
    </ParallaxScrollView>
  );
};

const AssetGraph = ({ assetDetails }: { assetDetails: any }) => {
  if (!assetDetails) return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">No asset selected{"\n"}</ThemedText>
      <Card style={styles.chartContainer}>
        <BarChart
          data={[{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}]}
        />
      </Card>
    </ThemedView>
  );

  // Define a new type for the rig data
  type RigData = {
    id: string;
    rateOfProduction: number;
  };

  // Calculate Rate of Production for each rig
  const data: RigData[] = assetDetails.rigs.map((rig: any) => ({
    id: rig.id,
    rateOfProduction: rig.performanceData.efficiency,
  }));

  // Prepare data for the chart
  const chartData: barDataItem[] = data.map((rig) => ({label: `Rig ${rig.id}`, value: rig.rateOfProduction}));
  
  return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Efficiency Of Each Rig{"\n"}</ThemedText>
      <Card style={styles.chartContainer}>
          <BarChart
            data={chartData}
            barInnerComponent={(bar) => (<ThemedView style={{ backgroundColor: '#DB1B3D', flex: 1 }} />)}
            spacing={20}
            noOfSections={4}
            isAnimated
            animationDuration={500}
            dashGap={15}
            dashWidth={2}
            showLine={true}
            yAxisThickness={0}
          />
        </Card>
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
  chartContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 2,
    width: '95%',
    height: '80%',
    borderRadius: 15,
  },
  brandLogo: {
    height: 178,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default TabTwoScreen;
