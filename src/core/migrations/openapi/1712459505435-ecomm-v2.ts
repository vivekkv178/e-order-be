import { MigrationInterface, QueryRunner } from 'typeorm';

export class EcommV21712459505435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS products (
            uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            id SERIAL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP,
            org_uuid UUID,
            CONSTRAINT fk_product_org FOREIGN KEY (org_uuid) REFERENCES organizations (uuid) ON DELETE CASCADE,
            user_uuid UUID,
            CONSTRAINT fk_product_user FOREIGN KEY (user_uuid) REFERENCES users (uuid) ON DELETE CASCADE
        );

        CREATE TABLE orders (
          uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          id SERIAL,
          user_uuid UUID,
          order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_orders_user FOREIGN KEY (user_uuid) REFERENCES users (uuid) ON DELETE CASCADE
        );

        CREATE TABLE order_items (
          order_uuid UUID,
          product_uuid UUID,
          id SERIAL,
          quantity INT,
          PRIMARY KEY (order_uuid, product_uuid),
          CONSTRAINT fk_order_items_order FOREIGN KEY (order_uuid) REFERENCES orders (uuid) ON DELETE CASCADE,
          CONSTRAINT fk_order_items_product FOREIGN KEY (product_uuid) REFERENCES products (uuid) ON DELETE CASCADE
        );               
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE prodcuts; 
    `);
  }
}
