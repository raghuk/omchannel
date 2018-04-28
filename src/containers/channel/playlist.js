import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';

import styles from './styles';


class ShowPlaylist extends Component {
    render() {
        return (
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Show Playlist</Text>
                <View style={{ height: 50 }} />
            </ScrollView>
        );
    }
}

export default ShowPlaylist;
