-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" "Role" NOT NULL DEFAULT E'GUEST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mk" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "release_year" TEXT NOT NULL,
    "platforms" TEXT[],
    "story" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Secret" (
    "id" SERIAL NOT NULL,
    "platforms" TEXT[],
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "mk_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name_char" TEXT NOT NULL,
    "img_char_link" TEXT NOT NULL,
    "mk_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "char_id" INTEGER NOT NULL,
    "spec_moves" JSONB NOT NULL,
    "fin_moves" JSONB NOT NULL,
    "combos" JSONB NOT NULL,
    "morphs" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mk.title_unique" ON "Mk"("title");

-- AddForeignKey
ALTER TABLE "Secret" ADD FOREIGN KEY ("mk_id") REFERENCES "Mk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD FOREIGN KEY ("mk_id") REFERENCES "Mk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD FOREIGN KEY ("char_id") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
