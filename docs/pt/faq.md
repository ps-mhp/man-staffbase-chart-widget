# Perguntas Frequentes

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
se necessário, através de uma tabela inserida de novo.

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
editor, importe uma tabela através de «Inserir do Excel» ou utilize um dos
dois botões «Carregar exemplo» ou «Criar tabela vazia»
.

**Pergunta:** Após a inserção, os meus indicadores aparecem como séries e as minhas
variantes como eixos — tudo invertido.

Resposta: Na barra «Inserir do Excel» foi selecionada a direção de leitura errada. Em «Como está a tabela?», mude para a outra opção e
clique novamente em «Importar tabela».

**Pergunta:** O texto dos meus eixos é tão longo que comprime o gráfico
.

Resposta: No nome do eixo — na grelha ou em «Eixo», na secção
«Designação» — prima a tecla Enter no local pretendido. A
quebra de linha é transferida para o gráfico.

**Pergunta:** Vejo a mensagem ««…» tem um valor negativo. Um
gráfico circular não pode representar percentagens negativas.» (ou, sem a categoria mencionada:
«Um gráfico circular não pode representar percentagens negativas.»)

Resposta: Um gráfico circular mostra a divisão de um todo; uma
proporção negativa não tem correspondência nesse contexto. Corrija a categoria em questão no
editor de gráficos para um valor diferente de zero — ou mude para
**gráfico de barras**, que pode representar valores negativos. O editor não permite
que uma percentagem negativa seja incluída no gráfico circular; a mensagem
só pode aparecer num gráfico de uma versão anterior.

A mensagem bloqueia intencionalmente todo o gráfico, em vez de apenas omitir o
segmento negativo: um gráfico circular distribui os valores restantes pelo
círculo completo, pelo que resultaria num gráfico com um aspeto completo, mas com
valores percentuais implicitamente aumentados.

**Pergunta:** Vejo a mensagem «Não foi possível carregar o gráfico.
Por favor, atualize a página.»

Resposta: Não foi possível recarregar a biblioteca de gráficos, na maioria das vezes devido a
uma ligação à Internet interrompida. Atualize a página; se o problema
persistir, verifique a ligação de rede.

**Pergunta:** Porque é que o meu gráfico está vazio, apesar de terem sido introduzidos dados?

Resposta: Na maioria das vezes, o bloco encontra-se numa coluna muito estreita ou num
elemento recolhido, pelo que o contentor tem altura 0. O gráfico
permanece então vazio, porque não tem espaço para ser desenhado. Mova o
Mova o bloco para uma coluna mais larga ou desdobre o elemento.

**Pergunta:** Por que razão vejo uma grande
diferença no gráfico entre dois valores quase iguais?

Resposta: Sem um valor máximo definido, cada eixo estende-se até ao maior valor que
nele ocorre. Se dois valores estiverem próximos um do outro, mas distantes de zero,
a parte superior do eixo ocupa todo o intervalo — a diferença
parece, assim, maior do que realmente é. Solução: No editor de diagramas,
selecione o eixo em questão e, em «Eixo», defina manualmente o mínimo e o máximo.

**Pergunta:** Por que é que o valor pior fica mais afastado?

Resposta: Neste eixo falta a opção «Menor é melhor». Esta deve ser ativada em
todos os indicadores em que um valor menor representa o melhor
resultado — como, por exemplo, peso, consumo ou tempo de carregamento. No editor de gráficos,
selecione o eixo e ative a opção em «Eixo».

**Pergunta:** Não vejo botões para descarregar por baixo do gráfico.

Resposta: Ou a opção «Permitir download» no editor de gráficos, em
«Comportamento», não está ativada, ou o gráfico ainda não está totalmente desenhado — os
botões só aparecem assim que houver um gráfico disponível para download.

**Pergunta:** Ao clicar em «Como SVG» ou «Como PNG», aparece a mensagem «A exportação
falhou. Por favor, tente novamente.»

Resposta: A exportação não conseguiu encontrar o gráfico desenhado — na maioria das vezes, porque
este está a ser recarregado. Aguarde um pouco e clique novamente; se o problema
persistir, atualize a página.

**Pergunta:** Posso mostrar mais de seis linhas?

Resposta: Sim. A paleta de cores da MAN tem seis cores; a partir da sétima linha,
as cores repetem-se. No entanto, as linhas continuam a ser claramente
distinguíveis, porque cada ponto de dados apresenta o seu valor como legenda e
o nome e os valores de cada linha constam na dica de ferramenta e na legenda. Em «Dados»
também é possível atribuir uma cor própria a cada linha.

**Pergunta:** O que acontece ao meu gráfico durante a tradução automática
da página?

Resposta: São traduzidos o título, a nota de rodapé, as legendas dos eixos e
os nomes das séries. Os números, as unidades, os limites dos eixos, as cores e todas as restantes
configurações permanecem inalteradas.

**Pergunta:** Um número inserido fica subitamente 1000 vezes maior ou
menor do que deveria.

Resposta: O editor de gráficos interpreta os números à maneira alemã – ao digitar, ao
inserir na grelha e ao «Inserir do Excel»: um ponto é considerado
separador de milhares e uma vírgula como separador decimal. Assim, `1.234` torna-se
`1234` e não `1,234`. Quem inserir uma tabela com notação inglesa
(ponto como separador decimal) tem de ajustar os números em questão ao
formato alemão antes de os inserir; caso contrário, por exemplo, «1.234» (mil)
será lido como «1,234» (um vírgula dois três quatro). Se um número contiver tanto
o ponto como a vírgula, independentemente da notação, o último
caractere é considerado o separador decimal — `1.234,5` e `1,234.5` resultam
ambos em `1234,5`.

**Pergunta:** Onde ficaram os campos «Altura em píxeis» e «Permitir download» na
caixa de diálogo do Staffbase?

Resposta: Ambos encontram-se agora no editor de diagramas: a altura em
«Design», o download em «Comportamento». Os campos antigos estão
ocultos. Os gráficos mais antigos mantêm os seus valores; o editor importa-os
ao abrir o ficheiro e, sem alterações, o gráfico permanece na página tal como estava.

**Pergunta:** «Aplicar» não faz nada; na parte superior aparece «Eixo «…»: Máximo demasiado pequeno».

Resposta: Na rede, está definido para este eixo um valor máximo que não é
superior ao mínimo. O eixo está marcado na grelha; em «Eixo»,
aumente o valor máximo ou esvazie o campo – esvaziado significa «derivado dos valores
».
