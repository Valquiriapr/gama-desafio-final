function validaCPF(cpf) {
    if (cpf.length != 11) {
        return false;
    }
    else {
        var numeros = cpf.substring(0,9);
        var digitos = cpf.substring(9);

        var soma = 0
        for (var i = 10; i > 1; i--){
            soma += numeros.charAt(10 - i) * i;
        }
        
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        /* Validação do primeiro dígito verificador do CPF */
        if (resultado != digitos.charAt(0)) {
            return false;
        }

        soma = 0;
        numeros = cpf.substring(0,10);
       
        for (var k = 11; k > 1; k--){
            soma += numeros.charAt(11 - k) * k;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
         
         /* Validação do segundo dígito verificador do CPF*/
        if (resultado != digitos.charAt(1)) {
            return false;
        }

        return true;
    };
}

function validacaoCPF() {
    /* Oculta a mensagem de CPF válido/inválido após o teste de validação*/
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    
    var cpf = document.getElementById('cpf_digitado').value;

    var resultadoValidacao = validaCPF(cpf); 
    
    if (resultadoValidacao) {
        document.getElementById('success').style.display='block';
    } 
    else {
        document.getElementById('error').style.display='block';
        document.getElementById('cep').addEventListener("focus");
    }
}

document.getElementById('cpf_digitado')
        .addEventListener('focusout', validacaoCPF);

/* Função para limpar os campos do endereço do formulário */
const limparFormulario = (endereco) => {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
    document.getElementById('numero').value = '';
}

/* Função para preencher campos do endereço do formulário após o retorno da busca do CEP via API*/
const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
}

/* Função para verificar se o valor é número */
const eNumero = (numero) => /^[0-9]+$/.test(numero);

/* Função para verificar o tamanho do CEP digitado = 8 e se é um número*/
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

/* Função para pesquisar o CEP acessando via API */ 
const pesquisarCep = async() => {
    
    limparFormulario();
    /* Variável (cep) que recebe o valor digitado no formulário */
    const cep = document.getElementById('cep').value;
    
    /* variável com o endereço da API para pesquisar o CEP*/
    const url = `http://viacep.com.br/ws/${cep}/json/`
    
        /* variável (dados) recebe o resultado da URL no fetch */
    /* Variável (endereco) pega os dados e retonado da URL e aplica a função json com os dados consultados */

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('logradouro').value = "CEP não encontrado."
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('logradouro').value = "CEP incorreto."
    }
}

document.getElementById('cep')
        .addEventListener('focusout', pesquisarCep);


