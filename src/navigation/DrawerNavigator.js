import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CalculadoraScreen from "../screens/CalculadoraScreen";
import CalculadoraCientificaScreen from "../screens/CalculadoraCientificaScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Calculadora">
        <Drawer.Screen name="Calculadora" component={CalculadoraScreen} />
        <Drawer.Screen
          name="Calculadora Científica"
          component={CalculadoraCientificaScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
