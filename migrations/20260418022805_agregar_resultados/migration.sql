-- CreateTable
CREATE TABLE "Resultado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "verbal" INTEGER NOT NULL,
    "logicoMat" INTEGER NOT NULL,
    "visualEsp" INTEGER NOT NULL,
    "kinestesica" INTEGER NOT NULL,
    "musical" INTEGER NOT NULL,
    "intrapersonal" INTEGER NOT NULL,
    "interpersonal" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resultado_pkey" PRIMARY KEY ("id")
);
