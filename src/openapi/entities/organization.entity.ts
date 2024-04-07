import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('organizations')
export class Organization {
    @PrimaryColumn('uuid', { default: () => 'uuid_generate_v4()' })
    uuid: string;

    @Column({ generated: 'increment' })
    id: number;

    @Column({ length: 255, nullable: false, unique: true })
    name: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @Column({ length: 100, nullable: true })
    city: string;

    @Column({ length: 50, nullable: true })
    state: string;

    @Column({ length: 50, nullable: true })
    country: string;

    @Column({ length: 20, nullable: true })
    postal_code: string;

    @Column({ length: 20, nullable: true })
    phone_number: string;

    @Column({ length: 255, nullable: true })
    email: string;

    @Column({ length: 255, nullable: true })
    website: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
