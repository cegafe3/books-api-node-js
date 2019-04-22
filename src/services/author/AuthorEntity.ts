import {
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import {Book} from "../book/BookEntity";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
export class Author {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @Length(1, 255)
  @IsNotEmpty()
  name: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(type => Book, book => book.authors)
  @JoinTable()
  books: Book[];
}
