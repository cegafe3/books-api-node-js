import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    @UpdateDateColumn()
    updated_at: Date;

}
