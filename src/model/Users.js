import {Model} from '@nozbe/watermelondb';
import {field, text, date} from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @text('name') name;
  @field('age') age;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
}
