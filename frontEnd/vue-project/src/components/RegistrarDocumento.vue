<template>
    <div>
        <!-- 
            COMO FUNCIONA A PARTE DE ESCOLHER PRODUTOS
            1) essa variavel inicialmente contem apenas um objeto
            com as respectivas chaves:
             nomeProd_Criado: [{nome_produto: '', quantidade_produzida: 0}]

            2) sempre que alguem quiser acrescentar um novo produto,
            um novo cartãozinho será criado apertando no botão "+adicionar produto"
            que por sua vez aciona o metodo ButaoIncrement()

            3) esse botão:
                -> aumenta a quantidade de vezes que o laço deverá ser repetido
                   ou seja, isso criará novos cartoeszinhos

                -> da um push em nomeProd_Criado
                 this.nomeProd_Criado.push({nome_produto: '', quantidade_produzida: 0})

            4) ao mesmo tempo que estamos tendo um loop criando novos cartoeszinhos,
            estamos criando novos objetos dentro de nomeProd_Criado prontos
            para receberem os valores dos respectivos cartões

            EX:
            loopProdutos: 1

            for i in loopProdutos

                [
                0
                : 
                {nome_produto: 'queijo', quantidade_produzida: 2}   v-model="nomeProd_Criado[i-1].nome_produto
                1
                : 
                {nome_produto: 'bolo', quantidade_produzida: 100}   v-model="nomeProd_Criado[i-1].nome_produto
                2
                : 
                {nome_produto: 'iorgute', quantidade_produzida: 45}  v-model="nomeProd_Criado[i-1].nome_produto
                3
                : 
                {nome_produto: '', quantidade_produzida: 0}
                ]
         -->
    </div>
</template>