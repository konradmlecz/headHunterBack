import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentToInterview extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 36,
    })
    studentId: string;

    @Column()
    createdAt: Date;
}