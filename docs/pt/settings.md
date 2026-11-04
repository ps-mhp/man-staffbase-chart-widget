# Definições

Na caixa de diálogo de configuração, existem, tecnicamente, apenas dois campos: **Diagrama** e
**Altura em píxeis**. O campo «Diagrama» não é editado diretamente — em vez disso,
abre-se automaticamente o **Editor de diagramas**, onde se encontram todas as restantes
configurações.

## Campos na caixa de diálogo de configuração

| Configuração | Descrição |
| --- | --- |
| Diagrama | Contém a definição completa e codificada tecnicamente do diagrama. É editado exclusivamente através do Editor de diagramas, nunca manualmente. |
| Altura em píxeis | Altura do diagrama na página. São permitidos valores entre 160 e 1200 píxeis; o valor predefinido é 420. A largura depende sempre da coluna. |
| Permitir download | Mostra, por baixo do diagrama, dois botões para descarregar como imagem. O ficheiro contém apenas o diagrama, não a página. Por predefinição, está desativado. |

## A caixa de diálogo do editor

Na parte superior encontra-se uma barra de controlo com **Guardar**, **Ajuda** e **Fechar**;
esta permanece fixa durante a navegação, para que a opção «Guardar» continue acessível mesmo num
grelha de dados. Enquanto o rascunho diferir da versão guardada,
aparece ao lado «Alterações não guardadas». O botão «Ajuda» abre
um painel deslizante com as mesmas explicações que nesta página, diretamente na
caixa de diálogo; fecha-se através do botão ou da tecla «Esc».

Se a caixa de diálogo for estreita, a pré-visualização desloca-se para baixo da grelha de introdução de dados e,
abaixo de cerca de 700 píxeis de largura do contentor, a grelha transforma-se num gráfico
por eixo. A caixa de diálogo nunca desloca horizontalmente.

## Tipo de gráfico

A seleção na parte superior do editor determina o tipo de gráfico:

| Tipo | Adequado para |
| --- | --- |
| Gráfico de rede (radar / aranha) | Comparação de poucas variantes através de vários valores característicos com unidades possivelmente diferentes. |
| Gráfico de barras (colunas) | Comparação de valores em poucas categorias com uma unidade comum. |
| Gráfico de linhas (evolução) | Evolução ao longo de uma série ordenada, por exemplo, anos. |
| Gráfico circular (torta / anel) | Divisão de um todo em segmentos; representa apenas a primeira série. |

A alteração do tipo não implica a perda de dados: o título, a nota de rodapé, a legenda, os eixos e
as séries são mantidos. As definições específicas do tipo guardadas (por exemplo,
mínimo/máximo no gráfico de radar) também são mantidas e voltam a ter efeito
assim que o tipo correspondente for selecionado novamente — ou seja, não são
apagadas, mas apenas ocultadas.

## Quais campos aparecem em cada tipo

| Campo | Radar | Barra | Linha | Circular |
| --- | :-: | :-: | :-: | :-: |
| Unidade, casas decimais | ✓ | ✓ | ✓ | ✓ |
| Mínimo, Máximo | ✓ | – | – | – |
| Direção («quanto menor, melhor») | ✓ | – | – | – |
| Cor por eixo (cor do segmento) | – | – | – | ✓ |
| Colunas de séries na grelha | todas | todas | todas | apenas a primeira |

**Por que razão o mínimo, o máximo e «quanto menor, melhor» só aparecem no radar
:** São definidos por eixo e, numa
eixo de valores — como os que desenham barras e linhas — não podem ser representados. Nos gráficos circulares
não existe qualquer eixo. Além disso, «quanto menor, melhor» é um
conceito próprio do gráfico de radar: num eixo de valores verdadeiro, não se inverte nenhum eixo, mas sim
se ordena ou se rotula.

## Importar dados de uma tabela

| Configuração | Descrição |
| --- | --- |
| Campo de inserção | Importa uma tabela copiada do Excel, PowerPoint ou Word. Reconhece tabulador, ponto e vírgula e vírgula como separadores de colunas. |
| Como está a sua tabela? | Define a direção de leitura. A predefinição é «um indicador por linha, uma variante por coluna» — tal como a tabela se apresenta na grelha abaixo. A outra opção inverte a orientação ao importar. |
| Importar tabela | Substitui eixos, séries e valores. Eixos e séries com o mesmo nome mantêm a unidade, a direção do eixo e a cor. |

A inserção a partir do Excel é independente do tipo e funciona da mesma forma para os quatro tipos
.

## Introdução sem dados

Enquanto não forem criados eixos nem séries, o editor explica os
conceitos e apresenta dois botões: **«Carregar exemplo»** preenche com um
exemplo adequado ao tipo selecionado (por exemplo, no radar, a comparação entre o MAN
eTGX com o Mercedes-Benz eActros 600; no gráfico circular, uma repartição dos custos da frota
), que pode ser substituído; **«Criar tabela vazia»** cria eixos
e séries para preenchimento.

## Por eixo (uma linha na grelha)

| Configuração | Descrição |
| --- | --- |
| Eixo | Nome do eixo, tal como aparece no gráfico e na tabela de dados. Se tiver várias linhas: a tecla Enter cria uma quebra de linha, que também aparece no gráfico. |
| Unidade | É anexada a cada número deste eixo (ponto de dados, dica de ferramenta, tabela), por exemplo, «kWh». Nos gráficos de barras e de linhas, o eixo de valores comum apresenta a unidade apenas se **todos** os eixos com valores tiverem a mesma unidade. |
| Direção («menor é melhor») | Apenas no gráfico de radar. Inverte o eixo: o valor menor fica então mais afastado. Para indicadores em que quanto menor, melhor — peso, consumo, tempo de carregamento. |
| Cor | Apenas no gráfico circular. Define a cor do segmento correspondente, substituindo a cor da paleta atribuída automaticamente. |
| Decimais | Apenas com as **configurações avançadas por eixo** ativadas: quantas casas decimais são apresentadas. Se não for especificado, é utilizado o número de casas decimais efetivamente introduzido. |
| Mínimo | Apenas no radar, com as «Ajustes finos por eixo» ativadas: limite inferior do eixo. Se não for especificado, o eixo começa em zero — no caso de valores negativos, no menor deles. |
| Máximo | Apenas no radar, com as **ajustes finos por eixo** ativados: limite superior do eixo. Se não for especificado, é utilizado o maior valor existente nesse eixo. |
| ↑ ↓ ✕ | Desloca o eixo ou remove-o juntamente com os seus valores. |

## Por série (uma coluna na grelha)

No gráfico circular, a grelha mostra **apenas a primeira coluna da série** — uma
nota abaixo indica claramente que outras séries permanecem guardadas e
não são representadas.

| Configuração | Descrição |
| --- | --- |
| Nome da série | Nome tal como aparece na legenda (exceto em gráficos circulares, ver abaixo), na dica de ferramenta e na tabela de dados. |
| Cor | Substitui a cor atribuída automaticamente a partir da paleta MAN para esta série específica. Não tem efeito em gráficos circulares — nesses casos, a cor varia consoante o eixo (ver acima). |
| ← → ✕ | Desloca a série — a ordem determina a cor da paleta e a ordem na legenda — ou remove-a. |

## Título, legenda e apresentação

| Configuração | Descrição |
| --- | --- |
| Título | Título acima do gráfico. Se o campo ficar em branco, não aparece nenhum título. |
| Nota de rodapé | Texto adicional em letras pequenas abaixo do título, por exemplo, para referências bibliográficas. |
| Legenda | «acima do gráfico», «abaixo do gráfico» ou «ocultar». Nos gráficos circulares, a legenda enumera os eixos (segmentos); nos restantes tipos, as séries. |

### Opções de visualização por tipo

| Tipo | Campos | Descrição |
| --- | --- | --- |
| Radar | Linhas auxiliares na rede | Número de anéis auxiliares concêntricos. Predefinição: 5. Puramente visual, não altera valores. |
| Radar | Preencher áreas | Preenche a área por trás de cada linha da série com a respetiva cor, de forma semitransparente. Predefinição: desativado. |
| Barra | Empilhar | Desenha as séries umas sobre as outras, em vez de lado a lado. Predefinição: desativado. |
| Barra | Orientação | «vertical» (categorias na parte inferior) ou «horizontal» (categorias à esquerda). Predefinição: vertical. |
| Linha | Suavizar linhas | Arredonda o traçado da linha em vez de o traçar em linha reta entre os pontos de apoio. Predefinição: desativado. |
| Linha | Preencher área | Preenche a área sob a linha com a sua cor. Predefinição: desativado. |
| Linha | Mostrar pontos | Mostra um ponto em cada ponto de apoio. Predefinição: ativado. |
| Gráfico circular | Raio interior | Percentagem do buraco no gráfico circular. 0 resulta num círculo completo; um valor maior (por exemplo, 45) resulta num anel/donut. Predefinição: 0. |
| Gráfico circular | Rótulo do segmento | «Percentagem», «Valor absoluto», «Ambos» ou «Ocultar». Predefinição: «Percentagem». |

## Escalonamento automático

**No gráfico de radar**, os eixos não apresentam uma escala numérica visível — esta não pode ser representada de forma significativa quando
existem vários eixos com unidades diferentes. Sem
especificação própria, cada eixo começa, em vez disso, em **zero** e vai até
ao seu maior valor possível. O comprimento de um raio comporta-se, assim,
como o próprio valor: metade do caminho para o exterior corresponde também a metade da quantidade.

Se houver valores negativos num eixo, este começa pelo menor deles —
caso contrário, o ponto ficaria fora da grelha.

Quem quiser realçar mais as diferenças entre as séries deve definir
manualmente o mínimo e o máximo do eixo em questão — por exemplo, 400 e 600 em vez de
0 e 600. Isto aumenta as distâncias visíveis, mas também faz com que pequenas
diferenças, insignificantes na prática, pareçam grandes.

Um mínimo ou máximo definido manualmente também limita o traçado:
um valor fora destes limites é representado exatamente na borda, em vez de
ultrapassar a grelha. O número no ponto de dados e na tabela permanece
o mesmo que foi introduzido — o limite altera apenas a imagem, nunca o valor. Quem
definir um eixo de 0 a 600 e introduzir 700, verá o ponto na
extremidade e o 700 ao lado.

**Nos gráficos de barras e de linhas**, o próprio ECharts desenha um eixo de valores com
uma escala visível; este eixo tem o ponto zero como referência e não pode ser
limitado manualmente. **No gráfico circular** não existe eixo de valores — cada segmento mostra
a sua proporção em relação ao todo. Um valor negativo não constitui, neste caso, um
problema de representação, mas sim um erro de dados: o gráfico apresenta então uma
nota de aviso no eixo em questão, em vez de desenhar um gráfico circular
distorcido.
