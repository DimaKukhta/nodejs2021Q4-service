import bcrypt from 'bcrypt';
import { BCRYPT_SALT } from '../../../common/config';
import OrmUser from '../../users/user.model';
import userService from '../../users/user.service';

const addDefaultUser = async () => {
  const isUser = await userService.getUserLoginService('admin');
  if (isUser) return;
  const salt = bcrypt.genSaltSync(Number(BCRYPT_SALT) || 10);
  const hash = bcrypt.hashSync('admin', salt);
  const user: OrmUser = new OrmUser();
  user.name = 'admin';
  user.login = 'admin';
  user.password = hash;
  await userService.addUserService(user);
};

export default addDefaultUser;
