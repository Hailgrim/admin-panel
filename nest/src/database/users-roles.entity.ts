import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { IUsersRoles } from 'libs/types';

@Table({ tableName: 'users_roles' })
export class UsersRoles
  extends Model<UsersRoles, IUsersRoles>
  implements IUsersRoles
{
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
