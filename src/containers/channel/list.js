import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import styles from './styles';


class ShowList extends Component {
    render() {
        return (
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Show List</Text>
                <View style={{ height: 50 }} />
            </ScrollView>
        );
    }
}

export default ShowList;
