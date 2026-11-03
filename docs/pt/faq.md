# Perguntas frequentes

Cada mensagem que o diagrama possa apresentar em vez do gráfico, como uma pergunta —
com o texto exato, para que possa ser encontrada através da pesquisa.

**Pergunta:** Vejo a mensagem «Ainda não foi configurado nenhum diagrama. Abra
as definições do componente.»

Resposta: Ainda não foi guardada nenhuma configuração para este componente.
Abra as definições do widget, preencha o editor de diagramas e guarde.

**Pergunta:** Vejo a mensagem «Não foi possível ler o diagrama.
Por favor, reconfigure-o nas definições.»

Resposta: Os dados guardados estão danificados ou foram alterados manualmente.
Abra as definições do widget e reconfigure o diagrama no editor —
se necessário, através de uma tabela recém-inserida.

**Pergunta:** Vejo a mensagem «O tipo de gráfico «…» não é reconhecido por esta versão do
módulo. Por favor, atualize o módulo.» (ou, sem
o nome do tipo mencionado: «O tipo de gráfico configurado não é reconhecido por esta versão do
módulo. Por favor, atualize o módulo.”)

Resposta: O gráfico foi configurado com uma versão mais recente do módulo
que reconhece um tipo de gráfico que esta versão ainda não
suporta. Atualize o módulo para a versão mais recente.

**Pergunta:** Vejo a mensagem «Ainda não há dados no gráfico. Crie
eixos e séries nas definições.»

Resposta: Não foram criados eixos nem séries no editor de gráficos. No
editor, insira uma tabela ou utilize um dos dois botões «Carregar exemplo»
ou «Criar tabela vazia».

**Pergunta:** Após a inserção, os meus indicadores aparecem como séries e as minhas
variantes como eixos — tudo invertido.

Resposta: Foi selecionada a direção de leitura errada no campo de inserção. Mude para a
outra opção em «Como está a sua tabela?» e clique novamente em
«Aplicar tabela».

**Pergunta:** O texto do meu eixo é tão longo que comprime o gráfico.

Resposta: No campo do eixo, no local pretendido, prima a tecla Enter
. A quebra de linha é aplicada ao gráfico.

**Pergunta:** Vejo a mensagem «Não foi possível carregar o gráfico.
Por favor, atualize a página.»

Resposta: Não foi possível recarregar a biblioteca de gráficos, na maioria das vezes devido a
uma ligação à Internet interrompida. Atualize a página; se o problema
persistir, verifique a ligação à rede.

**Pergunta:** Por que razão o meu diagrama está vazio, apesar de terem sido introduzidos dados?

Resposta: Na maioria das vezes, o bloco encontra-se numa coluna muito estreita ou num
elemento recolhido, pelo que o contentor tem altura 0. O gráfico
fica então permanentemente vazio, porque não tem espaço para ser desenhado. Mova
o bloco para uma coluna mais larga ou desdobre o elemento.

**Pergunta:** Por que razão vejo uma grande
diferença no gráfico entre dois valores quase iguais?

Resposta: Sem valores mínimos e máximos definidos, cada eixo estende-se automaticamente
entre o valor mais pequeno e o valor mais grande existentes — o que faz com que mesmo
pequenas diferenças pareçam grandes. Solução: No editor de diagramas, para o
eixo em questão, definir manualmente os valores mínimo e máximo.

**Pergunta:** Por que razão o valor pior fica mais afastado?

Resposta: Neste eixo falta a opção «Menor é melhor». Esta deve ser ativada em
todos os indicadores em que um valor menor representa o melhor
resultado — por exemplo, peso, consumo ou tempo de carregamento. No editor de gráficos,
ative-o no eixo em questão.

**Pergunta:** Não vejo botões para descarregar por baixo do gráfico.

Resposta: Ou a opção «Permitir download» não está
ativada nas definições, ou o gráfico ainda não está totalmente desenhado — os
botões só aparecem assim que houver um gráfico disponível para download.

**Pergunta:** Ao clicar em «Como SVG» ou «Como PNG», aparece a mensagem «A exportação
falhou. Por favor, tente novamente.»

Resposta: A exportação não conseguiu encontrar o gráfico desenhado — na maioria das vezes, porque
este está a ser recarregado. Aguarde um pouco e clique novamente; se o problema
persistir, atualize a página.

**Pergunta:** Posso apresentar mais de seis séries?

Resposta: Sim. A paleta de cores MAN tem seis cores; a partir da sétima série,
as cores repetem-se. No entanto, as séries continuam a ser claramente
distinguíveis, porque cada ponto de dados apresenta o seu valor como legenda e
o nome e os valores de cada série constam na dica de ferramenta e na legenda.

**Pergunta:** O que acontece ao meu gráfico durante a tradução automática
da página?

Resposta: São traduzidos o título, a nota de rodapé, as legendas dos eixos e
os nomes das séries. Os números, as unidades, os limites dos eixos, as cores e todas as restantes
configurações permanecem inalteradas.

**Pergunta:** Um número inserido fica subitamente 1000 vezes maior ou
menor do que deveria.

Resposta: O editor de gráficos interpreta os números à maneira alemã: o ponto é considerado
o separador de milhares e a vírgula, o separador decimal. Assim, `1.234` torna-se
`1234` e não `1,234`. Quem inserir uma tabela com a notação inglesa
(ponto como separador decimal) tem de ajustar os números em questão ao
formato alemão antes de os inserir; caso contrário, por exemplo, «1.234» (mil)
será interpretado como «1,234» (um vírgula dois três quatro). Se um número contiver tanto
o ponto como a vírgula, independentemente da notação, o último
símbolo é considerado o separador decimal — `1.234,5` e `1,234.5` resultam
ambos em `1234,5`.
