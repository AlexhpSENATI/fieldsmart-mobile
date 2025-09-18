import { Tabs } from 'expo-router';
import { Text, Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: true,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#444',
        tabBarActiveBackgroundColor: '#000',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 110,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarItemStyle: {
          borderRadius: 25,
          marginHorizontal: 6,
          marginVertical: Platform.OS === 'ios' ? 10 : 6,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="house.fill" color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="estadisticas"
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="chart.bar.fill" color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Stats</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="control"
        options={{
          title: 'Control',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="gamecontroller.fill" color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Control</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="shield.fill" color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Admin</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="configuracion"
        options={{
          title: 'Config',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="gearshape.fill" color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Config</Text>
          ),
        }}
      />
    </Tabs>
  );
}
