import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { Search } from 'lucide-react-native';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
}

const SearchBar = ({
  placeholder = 'Search by Name or Category',
  value,
  onChangeText,
  className,
}: SearchBarProps) => {
  return (
    <View className={cn('relative flex-row items-center', className)}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className={cn(
          'h-12 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 pr-12 font-pixelify text-base text-white',
          'focus:border-white/40 focus:bg-white/15'
        )}
      />
      <View className="absolute right-4">
        <Search size={20} color="#9CA3AF" />
      </View>
    </View>
  );
};

export default SearchBar;
