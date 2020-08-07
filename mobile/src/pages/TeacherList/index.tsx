import React from 'react';
import { View, ScrollView } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles';


function TeacherList() {
    return (
    <View style={styles.container}>
        <PageHeader title="Proffys disponíveis" />

        <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: 12
            }}
        >
            <TeacherItem />
            <TeacherItem />
            <TeacherItem />
            <TeacherItem />
        </ScrollView>
    </View>
    )
}

export default TeacherList;
