'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


      await queryInterface.bulkInsert('doador', [
      {
        nome_doador: "Shen",
        cpf: "35567809812",
        email: "shen0800@gmail.com",
        rua: "Rua Nelson Rodrigues 301",
        estado: "São Paulo",
        cidade: "Jacareí",
        telefone: "(12) 939281023",
        nascimento: "2001-07-21",
        sexo: "M",
        senha: "opeiwat"
      },
      {
        nome_doador: "Marcos Kam Fei Zhu",
        cpf: "47780303896",
        email: "markamfeiz@gmail.com",
        rua: "Bernadino de Campos 408",
        estado: "São Paulo",
        cidade: "Jacareí",
        telefone: "(12) 998162539",
        nascimento: "2003-05-14",
        sexo: "N/A",
        senha: "KamFeiz123"
      },
      {
        nome_doador: "Kaique Miguel Cassal",
        cpf: "43254872931",
        email: "kaiquemiguelcassal20@gmail.com",
        rua: "Rua de Barro 52",
        estado: "São Paulo",
        cidade: "Santa Branca",
        telefone: "(12) 988139480",
        nascimento: "2002-10-22",
        sexo: "M",
        senha: "KaiqueLerdo"
      },
      {
        nome_doador: "Luisa Torres",
        cpf: "46647113878",
        email: "torresluisaa03@gmail.com",
        rua: "Avenida Carlos Drummond de Andrade 159",
        estado: "São Paulo",
        cidade: "Jacareí",
        telefone: "(12) 996331818",
        nascimento: "2003-09-22",
        sexo: "F",
        senha: "medievalAU"
      },


    ], {});

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('doador', null, {});
  }
};
