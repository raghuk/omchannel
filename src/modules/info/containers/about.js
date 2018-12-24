import React, { Component } from 'react';
import { ScrollView, Text, Linking } from 'react-native';

import styles from './styles';


class About extends Component {
  handleOpenWithLinking = (link) => {
    Linking.openURL(link);
  };

  render() {
    return (
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Godlywood Studio</Text>
        <Text style={styles.note} onPress={() => this.handleOpenWithLinking('http://www.godlywoodstudio.org/')}>
          www.godlywoodstudio.org
        </Text>
        <Text style={styles.info}>
          {`We facilitates television programs to revolutionize the impact the impact of the media on the individual and collective consciousness. We produces Talk shows and different spiritual programs in English, Hindi, and other regional languages including Gujarati, Malayalam, Telugu, Punjabi, Kannada, Tamil and Bengali etc.
          \nWe provides additional performances in larger quantities which allow viewers to enjoy spiritual uplifting programs. We assists 20 departments like writing, scripting, production, direction, animation and editing in both national and regional programs. These spiritual programs leaves an indelible imprint on the mind of the viewers.`}
        </Text>
        <Text style={styles.title}>Feedback</Text>
        <Text style={styles.info}>
          Thank you for using the app. We request you to leave us your feedback at info@godlywoodstudio.org to help us to improve the app with addtinal features.
        </Text>
        <Text style={styles.title}>Head Quarter</Text>
        <Text style={styles.info}>Godlywoodstudio, Manmohinivan Complex, Shantivan, Abu Road (Raj.) 307510</Text>
        <Text style={styles.info}>Contact No: 02974229988</Text>
      </ScrollView>
    );
  }
}

export default About;
