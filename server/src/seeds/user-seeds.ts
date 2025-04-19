import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  const hashedPassword1 = await bcrypt.hash('123456', 10);
  const hashedPassword2 = await bcrypt.hash('password', 10);
  const hashedPassword3 = await bcrypt.hash('password', 10);

  await User.bulkCreate([
    { username: 'JollyGuru', password: hashedPassword1 },
    { username: 'SunnyScribe', password: hashedPassword2 },
    { username: 'RadiantComet', password: hashedPassword3 },
  ]);
};
