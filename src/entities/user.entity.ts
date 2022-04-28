import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import Role from 'src/enums/role.enum';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public roles: Role;
}

export {
  User
};