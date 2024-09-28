import { Text, View, StyleSheet, } from 'react-native';

type ValueProps = {
    label: string;
    value: string;
};

const Value = ({ label, value }: ValueProps) => (
    <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    label: {
        color: 'white',
        fontSize: 20,
    },
    value: {
        fontSize: 38,
        fontWeight: '300',
        color: '#bcc0cc',
        fontFamily: 'Verdana',
    },
});

export default Value;