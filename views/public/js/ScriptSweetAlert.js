/*--------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------Cadastro--------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------*/

function vefCad() {

    const inputOptions = ['doador', 'instituicao']
      
      const { value: opt } = Swal.fire({
        title: 'Como deseja se cadastrar?',
        icon: 'question',
        input: 'radio',
        showCloseButton: true,
        confirmButtonColor: '#006400',
        confirmButtonText: 'Confirmar',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Por favor, escolha uma opção'
          } else if(value==0) {

            //Doador
            Swal.fire({
                title: 'Cadastro',
                html:

                //Formulário
                '<form action="/cad-doador" method="post">' +

                    //Email
                    '<div class="form-group">' +
                        '<label class="control-label">Email:</label> ' +
                        '<input class="form-control" type="email" name="emailDoador" placeholder="Digite seu email" required>' +
                    '</div>' +

                    //CPF
                    '<div class="form-group">' +
                        '<label class="control-label">CPF:</label>' +
                        '<input class="form-control" type="number" name="cpf" placeholder="Digite seu CPF" required>' +
                    '</div>' +

                    //Nome
                    '<div class="form-group">' +
                        '<label class="control-label">Nome:</label>' + 
                        '<input class="form-control" type="text" name="nomeDoador" placeholder="Digite seu nome completo" required>' +
                    '</div>' +

                    //Nascimento
                    '<div class="form-group">' +
                        '<label class="control-label">Data de nascimento:</label>' + 
                        '<input class="form-control" type="date" name="data" placeholder="Digite sua data de nascimento" required>' +
                    '</div>' +

                    //Gênero
                    '<div class="form-group">' +
                        '<label class="control-label">Gênero:</label>' +
                        '<select class="form-control" name="sexo" required>' +
                            '<option value="M">Masculino</option>' +
                            '<option value="F">Feminino</option>' +
                            '<option value="N/A" selected>Indefinido</option>' +
                        '</select>' +
                    '</div>' +

                    //Localização
                    '<div class="form-group">' +
                        '<label class="control-label">Localização:</label><br>' +
                        '<input class="form-group col-6" type="text" name="estadoDoador" placeholder="Estado" required>' +
                        '<input class="form-group col-6" type="text" name="cidadeDoador" placeholder="Cidade" required>' +
                        '<input class="form-group col-9" type="text" name="ruaDoador" placeholder="Rua" required>' +
                        '<input class="form-group col-3" type="number" name="localNumDoador" placeholder="Número" required>' +
                    '</div>' +

                    //Telefone
                    '<div class="form-group">' +
                        '<label class="control-label">Telefone:</label><br>' +
                        '<input class="form-group col-2" type="number" name="dddDoador" placeholder="DDD" required>' +
                        '<input class="form-group col-10" type="number" name="telefoneDoador" placeholder="Número de telefone (Sem espaçamento)" required>' +
                    '</div>' +

                    //Senha
                    '<div class="form-group">' +
                        '<label class="control-label">Senha:</label>' + 
                        '<input class="form-control" type="password" name="senhaDoador" placeholder="Digite sua senha" required>' +
                    '</div>' +

                    '<hr>' +
                    '<button class="btn-success">Enviar</button>' +

                '</form>',

                showConfirmButton: false,
                showCloseButton: true
              })

          } else if(value==1) {

            //Instituição
            Swal.fire({
                title: 'Login',
                html:

                //Formulário
                '<form action="/cad-inst" method="post">' +

                    //Email
                    '<div class="form-group">' +
                        '<label class="control-label">Email:</label>' +
                        '<input class="form-control" type="email" name="emailInst" placeholder="Digite seu email" required>' +
                    '</div>' +

                    //CNPJ
                    '<div class="form-group">' +
                        '<label class="control-label">CNPJ:</label>' +
                        '<input class="form-control" type="number" name="cnpj" placeholder="Digite seu CNPJ" required>' +
                    '</div>' +

                    //Nome
                    '<div class="form-group">' +
                        '<label class="control-label">Nome:</label>' + 
                        '<input class="form-control" type="text" name="nomeInst" placeholder="Digite seu nome completo" required>' +
                    '</div>' +

                    //Descrição
                    '<div class="form-group">' +
                        '<label class="control-label">Descrição:</label>' + 
                        '<input class="form-control" type="text" name="descInst" placeholder="Descreva sua instituição" required>' +
                    '</div>' +

                    //Necessidade
                    '<div class="form-group">' +
                        '<label class="control-label">Necessidade:</label>' + 
                        '<input class="form-control" type="text" name="necessidade" placeholder="Descreva sua atual necessidade" required>' +
                    
                        '<br>' +
                        '<label>Prioridade:</label> &nbsp; &nbsp; &nbsp;'  + 
                        '<input type="radio" name="prioridade" value="Alta" required>' +
                        '<label>Alta</label> &nbsp;' +

                        '<input type="radio" name="prioridade" value="Media" required>' +
                        '<label>Média</label> &nbsp;' +

                        '<input type="radio" name="prioridade" value="Baixa" required>' +
                        '<label>Baixa</label> &nbsp;' +
                    '</div>' +

                    //Localização
                    '<div class="form-group">' +
                        '<label class="control-label">Localização:</label><br>' +
                        '<input class="form-group col-6" type="text" name="estadoInst" placeholder="Estado" required>' +
                        '<input class="form-group col-6" type="text" name="cidadeInst" placeholder="Cidade" required>' +
                        '<input class="form-group col-9" type="text" name="ruaInst" placeholder="Rua" required>' +
                        '<input class="form-group col-3" type="number" name="localNumInst" placeholder="Número" required>' +
                    '</div>' +

                    //Telefone
                    '<div class="form-group">' +
                        '<label class="control-label">Telefone:</label><br>' +
                        '<input class="form-group col-2" type="number" name="dddInst" placeholder="DDD" required>' +
                        '<input class="form-group col-10" type="number" name="telefoneInst" placeholder="Número de telefone (Sem espaçamento)" required>' +
                    '</div>' +

                    //Senha
                    '<div class="form-group">' +
                        '<label class="control-label">Senha:</label>' +
                        '<input class="form-control" type="password" name="senhaInst" placeholder="Digite sua senha" required>' +
                    '</div>' +

                    '<hr>' +
                    '<button class="btn-success">Enviar</button>' +

                '</form>',

                showConfirmButton: false,
                showCloseButton: true
              })

          }
        }
      })      

}

/*--------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------Login---------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------*/

function vefLog() {

    const inputOptions = ['doador', 'instituicao']
      
      const { value: opt } = Swal.fire({
        title: 'Como deseja se logar?',
        icon: 'question',
        input: 'radio',
        showCloseButton: true,
        confirmButtonColor: '#006400',
        confirmButtonText: 'Confirmar',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'Por favor, escolha uma opção'

          } else if(value==0) {

            //Doador
            Swal.fire({
                title: 'Login',
                html:

                //Formulário
                '<form action="/login/doador" method="post">' +

                    //CPF
                    '<div class="form-group">' +
                        '<label class="control-label">CPF:</label>' +
                        '<input class="form-control" type="number" name="logCPF" placeholder="Digite seu CPF" required>' +
                    '</div>' +

                    //Senha
                    '<div class="form-group">' +
                        '<label class="control-label">Senha:</label>' +
                        '<input class="form-control" type="password" name="logSenhaDoador" placeholder="Digite sua senha" required>' +
                    '</div>' +

                    '<hr>' +
                    '<button class="btn-success">Entrar</button>' +
                '</form>',

                showConfirmButton: false,
                showCloseButton: true
              })

          } else if(value==1) {

            //Instituição
            Swal.fire({
                title: 'Login',
                html:

                //Formulário
                '<form action="/login/inst" method="post">' +

                    //CPF
                    '<div class="form-group">' +
                        '<label class="control-label">CNPJ:</label>' +
                        '<input class="form-control" type="number" name="logCNPJ" placeholder="Digite seu CNPJ" required>' +
                    '</div>' +

                    //Senha
                    '<div class="form-group">' +
                        '<label class="control-label">Senha:</label>' +
                        '<input class="form-control" type="password" name="logSenhaInst" placeholder="Digite sua senha" required>' +
                    '</div>' +

                    '<hr>' +
                    '<button class="btn-success">Entrar</button>' +
                '</form>',

                showConfirmButton: false,
                showCloseButton: true
              })
            
          }
        }
      })  
}