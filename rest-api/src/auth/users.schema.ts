import * as mongoonse from 'mongoose';

export const UsersSchema = new mongoonse.Schema({
  email: String,
  roles: Array,
  passwordHash: String
})
