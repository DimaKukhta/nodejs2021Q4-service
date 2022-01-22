import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642784531553 implements MigrationInterface {
    name = 'migration1642784531553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orm_column" DROP CONSTRAINT "FK_e41debc17b0db837119bbccf976"`);
        await queryRunner.query(`ALTER TABLE "orm_column" ADD CONSTRAINT "FK_e41debc17b0db837119bbccf976" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orm_column" DROP CONSTRAINT "FK_e41debc17b0db837119bbccf976"`);
        await queryRunner.query(`ALTER TABLE "orm_column" ADD CONSTRAINT "FK_e41debc17b0db837119bbccf976" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
