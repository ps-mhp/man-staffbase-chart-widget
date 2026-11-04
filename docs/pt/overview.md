# Gráfico

O widget de gráficos apresenta indicadores em quatro tipos — **gráfico radial
(radar), de barras, de linhas e circular**. Cada tipo é configurado através
do mesmo editor, que se abre diretamente nas definições do widget; uma
tabela copiada do Excel pode ser importada com um clique, ver
[Passo a passo](usage.md).

## Os quatro tipos

**Diagrama radial (radar / aranha).** Vários eixos irradiam em forma de estrela
a partir de um ponto central, e cada série — por exemplo, uma comparação de veículos —
liga os seus valores nestes eixos, formando uma área. Desta forma, é possível
comparar vários indicadores de várias séries num só olhar, mesmo que sejam
medidos em unidades totalmente diferentes — quilómetros, toneladas,
minutos, quilowatts. Apenas no radar é que existem os valores mínimo, máximo e o botão
«menor é melhor» para cada eixo, além das opções de visualização «linhas auxiliares na rede»
e «preencher áreas».

**Gráfico de barras (colunas).** Compara valores entre poucas categorias.
Todas as barras partilham um eixo de valores comum, que o próprio ECharts
calcula e rotula — ao contrário do radar, este eixo só faz
sentido se todas as categorias utilizarem a mesma unidade. Como
opções de visualização, estão disponíveis o empilhamento (séries umas sobre as outras em vez de lado a lado) e
a orientação (vertical ou horizontal).

**Gráfico de linhas (evolução).** Mostra uma evolução ao longo de uma
série ordenada, por exemplo, ao longo dos anos de construção. A ordem dos eixos na grelha corresponde
à ordem na linha. Opções de visualização: suavizar linhas, preencher a área sob
a linha, mostrar pontos nos pontos de apoio.

**Gráfico circular (torta / anel).** Mostra a divisão de um todo:
os segmentos correspondem aos eixos (categorias), e os seus valores determinam os tamanhos dos segmentos.
**Apenas a primeira série é representada** — as restantes séries
permanecem guardadas e voltam a aparecer assim que se mudar para outro tipo
de gráfico; o editor indica-o expressamente. Cada categoria pode ter uma
cor de segmento própria. Opções de visualização: raio interior (0 resulta num
círculo completo, um valor maior num anel/donut) e a legenda do segmento
(percentagem, valor absoluto, ambos ou oculta). Os valores negativos
não constituem um problema de representação no `pie`, mas sim um erro de dados — o
gráfico mostra então uma mensagem em vez de um gráfico de pizza incorreto.

Uma alteração do tipo de gráfico no editor não implica a perda de dados: o título, a nota de rodapé,
a legenda, os eixos e as séries são mantidos, assim como os valores dos campos específicos
do tipo — apenas não têm efeito enquanto estiver selecionado outro tipo.

## O que os leitores veem

- O próprio gráfico, com quantos eixos e séries forem desejados.
- Os valores aparecem diretamente no gráfico (no caso do `pie`, dependendo da configuração, como
  percentagem, valor absoluto ou ambos); além disso, ao passar o cursor
  sobre um ponto ou segmento, surge uma dica de ferramenta com os valores correspondentes.
- Uma legenda acima ou abaixo do gráfico, dependendo da configuração.
  No caso do `pie`, a legenda enumera as categorias (segmentos); nos restantes
  tipos, as séries.
- Opcionalmente, um título e uma nota de rodapé.
- Se o download estiver permitido (ver [Definições](settings.md)), dois botões
  por baixo do gráfico para descarregar como imagem.
- Para leitores de ecrã, adicionalmente, uma tabela de dados completa por baixo do
  gráfico. Está visualmente oculta, mas está presente — o gráfico é,
  assim, utilizável mesmo sem perceção visual.

## Exportação de imagem

Com a opção de download ativada, aparecem dois botões abaixo do gráfico:
«Como SVG» e «Como PNG». O ficheiro descarregado contém **apenas o
diagrama**, não o resto da página — título, legenda, eixos e valores
exatamente como estão a ser apresentados, com fundo branco (mesmo que
a própria página tenha um fundo transparente ou escuro). O SVG pode ser
ampliado sem perda de qualidade; o PNG é adequado para locais que não conseguem incorporar SVG
(por exemplo, a maioria dos programas de apresentação) e é gerado com
resolução dupla. A exportação funciona da mesma forma para os quatro tipos
— opera sobre a imagem desenhada e não distingue o tipo de gráfico.

## Tradução

O gráfico é incluído na tradução automática da página. São traduzidos
o título, a nota de rodapé, as legendas dos eixos e os nomes das séries — exatamente os
textos que foram introduzidos editorialmente. Números, unidades, limites dos eixos,
cores e todas as restantes definições permanecem inalteradas, porque não têm
linguagem: uma unidade traduzida estaria errada («t» não se torna «ton»),
um número traduzido não faria sentido.

## O que vê no editor do CMS

Ao inserir o bloco, abre-se automaticamente o **Editor de gráficos**
com uma barra de controlo na parte superior (Guardar, Ajuda, Fechar) em vez de um
rodapé — assim, a opção «Guardar» permanece acessível mesmo numa grelha de dados extensa,
uma vez que a barra permanece fixa durante a deslocamento. Na parte superior, a seleção do tipo de gráfico
e um campo onde se insere uma tabela copiada do Excel; por baixo,
uma grelha com **uma linha por eixo** e **uma coluna por série**
(no caso de `pie`, apenas uma coluna de séries), ao lado uma pré-visualização em tempo real que mostra exatamente
como o gráfico irá aparecer posteriormente na página. Enquanto ainda não tiver nada
criado, o editor explica os conceitos e oferece as opções «Carregar exemplo»
e «Criar tabela vazia» — consoante o tipo selecionado, com um exemplo diferente,
adequado a esse tipo. O campo de texto a seguir mostra apenas a forma tecnicamente
armazenada e codificada dos dados e nunca é editado manualmente.

Se a caixa de diálogo for estreita (por exemplo, em ecrãs pequenos), a
pré-visualização desloca-se para baixo da grelha e — abaixo de cerca de 700 píxeis de largura —
a grelha transforma-se numa sequência de gráficos, um por eixo. A caixa de diálogo
nunca desloca horizontalmente.

Uma característica importante do radar: os seus eixos **não apresentam uma escala numérica visível**
**escala numérica visível**. Vários eixos com unidades diferentes (por exemplo,
quilómetros e minutos) não podem ser representados de forma adequada numa escala comum
. Por isso, cada eixo é esticado internamente de forma independente: de zero até
ao seu valor máximo. Os valores reais aparecem nos pontos de dados,
na dica de ferramenta e na tabela de dados. Os gráficos de barras e de linhas, por outro lado,
apresentam um eixo de valores real, calculado e legendado pelo ECharts.
Mais informações em [Definições](settings.md).
