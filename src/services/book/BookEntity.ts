import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany
} from "typeorm";
import {Author} from "../author/AuthorEntity";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
export class Book {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsNotEmpty()
  title: string;

  @Column('text')
  @IsNotEmpty()
  description: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(type => Author, author => author.books)
  authors: Author[];

}
