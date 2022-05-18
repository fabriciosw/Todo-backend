import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export default class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    senha: string;
}
