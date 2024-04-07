import { MigrationInterface, QueryRunner } from 'typeorm';

export class EcommV11712459449102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
        CREATE TABLE IF NOT EXISTS organizations (
          uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          id SERIAL,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255),
          city VARCHAR(100),
          state VARCHAR(50),
          country VARCHAR(50),
          postal_code VARCHAR(20),
          phone_number VARCHAR(20),
          email VARCHAR(255),
          website VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS users (
          uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          id SERIAL,
          username VARCHAR(100) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          full_name VARCHAR(255),
          role VARCHAR(50) DEFAULT 'USER',
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP
      );
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE organizations; 
    DROP TABLE users; 
    `);
  }
}
