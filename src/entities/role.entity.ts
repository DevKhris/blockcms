import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  display_name: string;
}

export { Role }