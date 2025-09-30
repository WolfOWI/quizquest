import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { Search } from 'lucide-react-native';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
  editable?: boolean;
}

const SearchBar = ({
  placeholder = 'Search',
  value,
  onChangeText,
  className,
  editable = true,
}: SearchBarProps) => {
  return (
    <View className="relative h-16 flex-row items-center">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        editable={editable}
        className={`w-full ${className} h-12 rounded-lg border border-white/20 bg-white/10 px-4 pb-1 pr-12 font-pixelify text-base text-white focus:border-white/40 focus:bg-white/15`}
      />
      <View className="absolute right-4">
        <Search size={24} color="#9CA3AF" />
      </View>
    </View>
  );
};

export default SearchBar;
