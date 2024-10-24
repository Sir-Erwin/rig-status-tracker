import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface AssetPickerProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const AssetPicker: React.FC<AssetPickerProps> = ({ selectedValue, setSelectedValue }) => {
  return (
    <ThemedView style={{ gap: 8, marginBottom: 8, backgroundColor: '#ecedee', borderRadius: 8, padding: 10 }}>
      
      <Picker
        selectedValue={selectedValue}
        style={{ margin: 0, padding: 0, backgroundColor: '#ecedee'}} // Set background color for the Picker and center it
        onValueChange={(itemValue: string) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Choose Your Asset" value="choose" />
        <Picker.Item label="Permian Basin (Texas)" value="permian" />
        <Picker.Item label="Eagle Ford Shale (Texas)" value="eagle-ford" />
        <Picker.Item label="Spraberry Trend (Texas)" value="spraberry" />
        <Picker.Item label="Niobrara Formation (Colorado/Wyoming)" value="niobrara" />
        <Picker.Item label="Bakken Formation (North Dakota/Montana)" value="bakken" />
      </Picker>
    </ThemedView>
  );
};

export default AssetPicker;
