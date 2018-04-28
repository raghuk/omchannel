import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');


export default {
    content: {
        flex: 1,
        backgroundColor: '#f1f5f8'
    },
    listView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        padding: 10
    },
    cardContainer: {
        width: width * 0.42,
        margin: 0,
        marginTop: 10,
        marginRight: 5,
        marginBottom: 10,
        marginLeft: 5
    },
    cardImage: {
        height: (width * 0.4)/1.5
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: 'Opensans'
    },
    cardSubtitle: {
        fontSize: 14,
        fontFamily: 'Opensans',
        marginTop: 5,
        marginBottom: 5
    }
};
