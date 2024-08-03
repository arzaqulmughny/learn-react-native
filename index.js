/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './src/model/schema';
import migrations from './src/model/migrations.js';
import User from './src/model/Users';

const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: error => {
    Alert.alert('Terjadi Kesalahan', 'Gagal terhubung ke database');
    // Database failed to load -- offer the user to reload the app or log out
  },
});

const database = new Database({
  adapter,
  modelClasses: [User],
});

AppRegistry.registerComponent(appName, () => App);
