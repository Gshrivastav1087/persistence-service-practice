import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 }) 
  name: string;

  @Column("text")           
  description: string;

  @Column()                 
  filename: string;

  @Column("double precision") 
  views: number;

  @Column()         
  isPublished: boolean;

  @Column({ type: "float", nullable: true }) 
  duration: number | null;

  @Column({ default: () => "CURRENT_TIMESTAMP" })  
  uploadedAt: Date;
}