import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('library')
export class Library {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    author!: string;
    @Column()
    publishYear!: number;
    @Column()
    description!: string;
}