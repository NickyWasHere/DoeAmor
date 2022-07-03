-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           5.7.24 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para doeamor
CREATE DATABASE IF NOT EXISTS `doeamor` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `doeamor`;

-- Copiando estrutura para tabela doeamor.doador
CREATE TABLE IF NOT EXISTS `doador` (
  `id_doador` int(11) NOT NULL AUTO_INCREMENT,
  `nome_doador` varchar(30) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `rua` text NOT NULL,
  `estado` varchar(30) NOT NULL,
  `cidade` varchar(30) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `nascimento` date NOT NULL,
  `sexo` enum('M','F','N/A') NOT NULL,
  `senha` varchar(20) NOT NULL,
  PRIMARY KEY (`id_doador`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefone` (`telefone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela doeamor.doador: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `doador` DISABLE KEYS */;
/*!40000 ALTER TABLE `doador` ENABLE KEYS */;

INSERT INTO `doador` (`id_doador`, `nome_doador`, `cpf`, `email`, `rua`, `estado`, `cidade`, `telefone`, `nascimento`, `sexo`, `senha`) VALUES
(1, 'Shen', '35567809812', 'shen0800@gmail.com', 'Rua Nelson Rodrigues 301', 'São Paulo', 'Jacareí', '(12) 939281023', '2001-07-21', 'M', 'opeiwat'),
(2, 'Marcos Kam Fei Zhu', '47780303896', 'markamfeiz@gmail.com', 'Bernadino de Campos 408', 'São Paulo', 'Jacareí', '(12) 998162539', '2003-05-14', 'N/A', 'KamFeiz123'),
(3, 'Kaique Miguel Cassal', '43254872931', 'kaiquemiguelcassal20@gmail.com', 'Rua de Barro 52', 'São Paulo', 'Santa Branca', '(12) 988139480', '2002-10-22', 'M', 'kaiqueLerdo'),
(4, 'Luisa Torres', '46647113878', 'torresluisaa03@gmail.com', 'Avenida Carlos Drummond de Andrade 159', 'São Paulo', 'Jacareí', '(12) 996331818', '2003-09-22', 'F', 'medievalAU');

-- Copiando estrutura para tabela doeamor.feedback
CREATE TABLE IF NOT EXISTS `feedback` (
  `id_feedback` int(11) NOT NULL AUTO_INCREMENT,
  `id_doador` int(11) NOT NULL,
  `nome_doador` varchar(30) NOT NULL,
  `comentario` text,
  `nota` int(11) NOT NULL,
  `id_instituicao` int(11) NOT NULL,
  PRIMARY KEY (`id_feedback`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela doeamor.feedback: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;

INSERT INTO `feedback` (`id_feedback`, `id_doador`, `nome_doador`, `comentario`, `nota`, `id_instituicao`) VALUES
(1, 4, 'Luisa Torres', 'Muito prestativos!', 4, 3),
(2, 1, 'Shen', 'Foram muito amigáveis', 5, 3),
(3, 3, 'Kaique Miguel Cassal', 'Este doador não deixou nenhum comentário', 3, 3);

-- Copiando estrutura para tabela doeamor.historico
CREATE TABLE IF NOT EXISTS `historico` (
  `id_historico` int(11) NOT NULL AUTO_INCREMENT,
  `nome_doador` varchar(30) NOT NULL,
  `id_doador` int(11) NOT NULL,
  `produto` text NOT NULL,
  `_data` date NOT NULL,
  `nome_instituicao` varchar(30) NOT NULL,
  `id_instituicao` int(11) NOT NULL,
  PRIMARY KEY (`id_historico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela doeamor.historico: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `historico` DISABLE KEYS */;
/*!40000 ALTER TABLE `historico` ENABLE KEYS */;

INSERT INTO `historico` (`id_historico`, `nome_doador`, `id_doador`, `produto`, `_data`, `nome_instituicao`, `id_instituicao`) VALUES
(1, 'Luisa Torres', 4, '1 alimento(s) novo(s): Quilo de arroz e macarrão', '2021-12-25', 'LSA Doações', 3),
(2, 'Shen', 1, '1 roupa(s) usado(s): Casaco de inverno', '2021-12-10', 'LSA Doações', 3),
(3, 'Kaique Miguel Cassal', 3, '3 roupa(s) usado(s): Camisas do Flamengo', '2022-01-14', 'LSA Doações', 3);

-- Copiando estrutura para tabela doeamor.notificacao
CREATE TABLE IF NOT EXISTS `notificacao` (
  `id_notificacao` int(11) NOT NULL AUTO_INCREMENT,
  `nome_doador` varchar(30) NOT NULL,
  `id_doador` int(11) NOT NULL,
  `produto` text NOT NULL,
  `_data` date NOT NULL,
  `nome_instituicao` varchar(30) NOT NULL,
  `id_instituicao` int(11) NOT NULL,
  PRIMARY KEY (`id_notificacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela doeamor.notificacao: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `notificacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacao` ENABLE KEYS */;

INSERT INTO `notificacao` (`id_notificacao`, `nome_doador`, `id_doador`, `produto`, `_data`, `nome_instituicao`, `id_instituicao`) VALUES
(1, 'Luisa Torres', 4, '1 alimento(s) novo(s): Quilo de arroz e macarrão', '2021-12-25', 'LSA Doações', 3),
(2, 'Shen', 1, '1 roupa(s) usado(s): Casaco de inverno', '2021-12-10', 'LSA Doações', 3),
(3, 'Kaique Miguel Cassal', 3, '3 roupa(s) usado(s): Camisas do Flamengo', '2022-01-14', 'LSA Doações', 3);

-- Copiando estrutura para tabela doeamor.instituicao
CREATE TABLE IF NOT EXISTS `instituicao` (
  `id_instituicao` int(11) NOT NULL AUTO_INCREMENT,
  `nome_inst` varchar(30) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `rua` text NOT NULL,
  `estado` varchar(30) NOT NULL,
  `cidade` varchar(30) NOT NULL,
  `telefone` varchar(15) NOT NULL,
  `senha` varchar(20) NOT NULL,
  `descricao` text NOT NULL,
  `necessidade` text NOT NULL,
  `prioridade` enum('ALTA','MEDIA','BAIXA') NOT NULL,
  PRIMARY KEY (`id_instituicao`),
  UNIQUE KEY `cnpj` (`cnpj`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefone` (`telefone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela doeamor.instituicao: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `instituicao` DISABLE KEYS */;
/*!40000 ALTER TABLE `instituicao` ENABLE KEYS */;

INSERT INTO `instituicao` (`id_instituicao`, `nome_inst`, `cnpj`, `email`, `rua`, `estado`, `cidade`, `telefone`, `senha`, `descricao`, `necessidade`, `prioridade`) VALUES
(1, 'Companhia Pomba Branca', '34842912', 'pombabrancadoa@gmail.com', 'Rua das Palmeiras 583', 'Rio de Janeiro', 'Rio de Janeiro', '(21) 39481204', 'rjpombabranca2016', 'Doações destinadas a crianças órfãs', 'Alimentos e produtos de higiene', 'ALTA'),
(2, 'Instituto 4 Trevos', '58392738', 'instituto4trevos@gmail.com', 'Avenida Amazonas 56', 'Minas Gerais', 'Belo Horizonte', '(31) 39752745', '4folhasdoacoes', 'Cuidamos de refugiados', 'Roupas limpas', 'MEDIA'),
(3, 'LSA Doações', '372956169', 'LSAdoa@gmail.com', 'Rua Gustavo Rodolfo 478', 'São Paulo', 'Santos', '(11) 39742780', 'horadedoar123', 'Assistência social voltada ao auxílio e resgate de moradores de rua', 'Alimentos e roupas', 'BAIXA'),
(4, 'Lar Crescer', '48932752', 'crescer.lar@gmail.com', 'Avenida São Paulo 583', 'São Paulo', 'São Paulo', '(11) 39830987', 'crescerecomagente', 'Acolhe crianças em estado de vulnerabilidade social', 'Agasalhos e cobertores', 'ALTA'),
(5, 'Instituto Carinha Feliz', '59301845', 'smile.br@gmail.com', 'Avenida Ipanema de Barros 90', 'Rio de Janeiro', 'Rio de Janeiro', '(21) 39860129', 'paparamericano', 'Tratamos de crianças com câncer', 'Brinquedos e roupas infantis', 'BAIXA'),
(6, 'Casa das Almas', '59823912', 'institutoalmas@gmail.com', 'Avenida José Pereira 84', 'Rio Grande do Sul', 'Porto Alegre', '(51) 29637840', 'welovedogs', 'Acolhemos animais abandonados', 'Ração para animais de rua', 'ALTA'),
(7, 'Paz & Amor', '49382930', 'pazeamor@gmail.com', 'Rua Capim de Ouro 32', 'São Paulo', 'Santos', '(11) 39821020', 'senha030303', 'Organização que socorre indivíduos afetados por guerras, catastrofes naturais dentre outros', 'Cesta básica de alimentos', 'MEDIA'),
(8, 'Instituto José Jandaia', '40294810', 'instituto.jose@gmail.com', 'Avenida Caldinho 47', 'Paraná', 'Curitiba', '(41) 39281039', 'nosconfiamosnojose', 'Acolhimento de crianças que realizam tratamento de saúde longe de suas casas', 'Roupas e cobertores', 'BAIXA'),
(9, 'Associação Pequeno Príncipe', '58201839', 'assoc.pequenop@gmail.com', 'Orion 923', 'São Paulo', 'São Paulo', '(11) 39813740', 'pequenoprincipe1980', 'Cuidamos de crianças necessitadas', 'Roupas, alimentos e produtos de higiene', 'MEDIA'),
(10, 'Instituto Lua Clara', '48203756', 'luaclarabr@gmail.com', 'Avenida Hollywood 820', 'São Paulo', 'São Paulo', '(11) 39716478', 'bowchikabowwow', 'Damos suporte à famílias refugiadas', 'Cesta básica', 'BAIXA'),
(11, 'Instituto Shujin', '93810032', 'shujindoacoes@gmail.com', 'Avenida Tóquio 007', 'São Paulo', 'São Paulo', '(11) 39183019', 'itsshowtime', 'Recolhemos animais feridos', 'Cesta básica', 'BAIXA');

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
