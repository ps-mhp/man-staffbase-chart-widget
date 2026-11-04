# Passo a passo

Tomando como exemplo uma comparação de veículos (MAN eTGX versus um concorrente) através de
seis indicadores com unidades diferentes, apresentados num diagrama de rede; os
passos aplicam-se, por analogia, aos restantes três tipos.

## Configurar o diagrama

1. Coloque o widget **Diagrama** na página. As definições do widget
   abrem-se e, nelas, aparece imediatamente o **Editor de diagramas** por cima do
   próprio campo. Na parte superior encontra-se uma barra de controlo com **Guardar**,
   **Ajuda** (abre um painel deslizante com as mesmas explicações que nesta
   documentação) e **Fechar**; esta permanece fixa durante a navegação, mesmo
   numa grelha de dados extensa.
2. Na parte superior do editor encontra-se o **tipo de gráfico**: **gráfico de rede (radar /
   aranha)**, **gráfico de barras (colunas)**, **gráfico de linhas (tendência)** ou
   **gráfico circular (torta / anel)**; o texto abaixo indica para que serve o
   tipo selecionado. Uma alteração posterior do tipo não implica a perda de
   dados — os eixos, as séries, o título e a legenda são mantidos; apenas os
   campos específicos do tipo (por exemplo, mínimo/máximo no radar) são
   ocultados até que o tipo seja novamente selecionado.
3. Enquanto ainda não houver dados, a secção **«Eixos e
   séries»** duas opções: **«Carregar exemplo»** preenche um exemplo adequado ao
   tipo selecionado, que pode ser facilmente substituído, e
   **«Criar tabela vazia»** cria eixos e séries para preencher.
4. No entanto, o método recomendado é **«Importar dados de uma tabela»**, na parte
   superior: selecione a tabela de comparação no Excel, PowerPoint ou Word,
   copie-a e cole-a no campo. Indique abaixo **como a tabela
   se apresenta** — a predefinição é «um indicador por linha, uma
   variante por coluna», ou seja, tal como a tabela aparece no editor abaixo.
   Em seguida, clique em **«Importar tabela»**. Este passo é igual para todos os
   quatro tipos.
5. Na grelha, **cada linha é um eixo** e **cada coluna à direita é uma
   série** — no gráfico circular, a grelha mostra **apenas a primeira
   coluna da série**; uma nota abaixo esclarece que outras séries
   permanecem guardadas, mas não são representadas, para que isso não pareça
   uma perda de dados. Na parte superior de cada coluna de série encontram-se o nome, a cor e
   as setas para reordenar; no final de cada linha de eixo, as setas e a
   cruz para esse eixo.
6. Introduza a **unidade** para cada eixo (por exemplo, «kWh»). Uma **quebra de linha no
   nome do eixo** — com a tecla Enter — é aplicada no gráfico e
   mantém as legendas longas legíveis. No gráfico circular, é possível
   definir adicionalmente uma **cor de segmento** específica para cada eixo.
7. Apenas no gráfico de rede: nos eixos em que um **valor menor
   é melhor** — peso, consumo, tempo de carregamento —, na coluna **Direção**
   ative o botão **«menor é melhor»**. Sem isso, o
   valor pior (maior) ficaria mais afastado, e o gráfico indicaria exatamente o
   contrário do que se pretende.
8. As **decimais** por eixo encontram-se atrás do botão
   **«Ajustes finos por eixo»**; **Mínimo** e **Máximo** aparecem ali
   apenas no gráfico de rede, porque as barras e a linha traçam um eixo de valores comum,
   calculado pelo ECharts. No caso normal, não são necessários;
   em branco significa «derivado dos valores».
9. Em **«Título, legenda e apresentação»**, introduza o título e a nota de rodapé,
   coloque ou oculte a **legenda** (no gráfico circular, esta enumera os
   eixos; nos outros, as séries) e defina as opções de visualização adequadas ao tipo
   : no gráfico de radar, **Linhas auxiliares na grelha** e **Preencher áreas**,
   no gráfico de barras, **Empilhar** e **Orientação** (vertical/horizontal), no gráfico de linha,
   **Suavizar linhas**, **preencher a área** e **mostrar pontos**; no gráfico circular,
   **raio interior** (0 = círculo completo, valor maior = anel) e
   **legenda dos segmentos** (percentagem, valor absoluto, ambos ou desativado).
10. A **Pré-visualização** mostra sempre como o gráfico fica na página
    e mantém-se fixa durante a navegação. Se a caixa de diálogo for suficientemente larga
    (a partir de cerca de 900 píxeis), fica ao lado do campo de introdução; abaixo desse valor, desloca-se
    para baixo da grelha e, abaixo de cerca de 700 píxeis, a grelha transforma-se
    numa sequência de mapas, um por eixo. A caixa de diálogo nunca desloca
    horizontalmente.
11. Ajustar a **altura** do gráfico (ver [Definições](settings.md)).
12. Se pretender que o gráfico possa ser descarregado como imagem, ative o botão
    **«Permitir download»** (ver [Definições](settings.md)).
    Abaixo do gráfico aparecem então dois botões, «Como SVG» e
    «Como PNG» — isto funciona da mesma forma para os quatro tipos.
13. Clique em **Guardar** e, em seguida, em **Fechar**. Só ao clicar em «Guardar» é que
    os dados são transferidos para o widget; enquanto estiver escrito «Alterações não guardadas»
    ao lado dos botões, nada foi ainda aplicado.

## Alterar posteriormente

1. Volte a abrir as definições do widget — o editor de gráficos aparece
   novamente com o estado guardado mais recentemente, incluindo o tipo de gráfico.
2. Substitua os valores diretamente na grelha ou insira novamente uma tabela
   atualizada. Os eixos e séries com o mesmo nome mantêm as suas
   unidades, orientações dos eixos e cores já definidas — apenas os valores são
   substituídos.
3. Guarde e feche como acima.

## Se algo não funcionar

1. Se, em vez do gráfico, aparecer uma mensagem de aviso, esta já indicará a
   causa — consulte [FAQ](faq.md) para conhecer todas as mensagens possíveis.
2. Se a tabela inserida não for aplicada, verifique se esta
   possui títulos na primeira linha e na primeira coluna. Se
   os eixos e as séries estiverem invertidos na grelha, a direção de leitura abaixo do
   campo de inserção foi selecionada incorretamente — altere-a e volte a aplicar.
3. Se, após a inserção, o gráfico apresentar valores errados (por exemplo, deslocados por um fator de
   1000), trata-se, na maioria das vezes, do separador de milhares em
   números provenientes de uma fonte não alemã — consulte as notas sobre números em
   [Definições](settings.md) e [Perguntas Frequentes](faq.md).
4. No gráfico circular, a área permanece vazia, apesar de os valores terem sido introduzidos
   : ou todos os valores da primeira série têm o valor zero ou
   estão em falta (`null`), ou pelo menos um valor é negativo — neste caso,
   o gráfico apresenta uma mensagem própria com o nome do eixo em causa
   em vez de um gráfico circular incorreto.
