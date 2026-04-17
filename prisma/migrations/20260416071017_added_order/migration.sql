-- AlterTable
CREATE SEQUENCE question_order_seq;
ALTER TABLE "Question" ALTER COLUMN "order" SET DEFAULT nextval('question_order_seq');
ALTER SEQUENCE question_order_seq OWNED BY "Question"."order";
