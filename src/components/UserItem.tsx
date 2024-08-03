/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Text, View} from 'react-native';

/**
 * Render user item
 * @param {object} props
 * @param {string} props.name
 * @param {number} props.age
 * @param {number} props.number
 */
const UserItem = (props: {name: string; age: number; index: number}) => {
  const {index, name, age} = props;

  return (
    <View style={{borderWidth: 1, padding: 7}}>
      <Text style={{color: 'black'}}>
        {index}. {name} - {age} tahun
      </Text>
    </View>
  );
};

export default UserItem;
