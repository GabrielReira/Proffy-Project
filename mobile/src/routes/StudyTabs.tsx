/* ROTAS DE NAVEGAÇÃO EM ABAS */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// Módulo que informa qual plataforma a aplicação está rodando
import {Platform } from 'react-native';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: Platform.OS === 'ios' ? 74 : 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    paddingBottom: Platform.OS === 'ios' ? 20 : 0
                },
                safeAreaInsets: {
                    bottom: 0
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: Platform.OS === 'ios' ? 24 : 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'
            }}
        >
            <Screen
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons name="ios-easel" size={size} color={color} />
                        );
                    }
                }}
            />
            <Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <Ionicons name="ios-heart" size={size} color={color} />
                        );
                    }
                }}
            />
        </Navigator>
    )
}

export default StudyTabs;
