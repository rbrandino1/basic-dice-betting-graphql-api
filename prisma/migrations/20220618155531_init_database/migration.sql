-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bets" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "betAmount" DOUBLE PRECISION NOT NULL,
    "chance" DOUBLE PRECISION NOT NULL,
    "payout" DOUBLE PRECISION NOT NULL,
    "win" BOOLEAN NOT NULL,

    CONSTRAINT "Bets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bets" ADD CONSTRAINT "Bets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
