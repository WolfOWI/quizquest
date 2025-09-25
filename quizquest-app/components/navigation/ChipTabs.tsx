import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';

export interface ChipTabInterface {
  id: string;
  label: string;
}

interface ChipTabsProps {
  tabs: ChipTabInterface[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function ChipTabs({ tabs, activeTab, onTabChange, className }: ChipTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={`max-h-10 flex-row ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            className={`mr-3 max-h-10 items-center justify-center rounded-full px-4 py-2 transition-all duration-200 ${isActive ? 'bg-treasureYellow' : 'bg-white/20'}`}>
            <Text className={`font-kenney text-sm ${isActive ? 'text-black' : 'text-white'}`}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
