import { User } from "src/users/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @Column()
    price: number;

    @Column({default: false})
    approved: boolean;

    @Column()
    make: string;

    @Column()
    year: number;

    @Column()
    mileage: number;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @ManyToOne(() => User, (user) => user.reports)
    user: User;
}