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

## Tipo de diagrama

A seleção na parte superior do editor determina o tipo de diagrama. Atualmente, existe
apenas o **gráfico de rede (radar / teia de aranha)**; a lista cresce à medida que novos
tipos são suportados. As definições específicas de cada tipo — no radar, por exemplo, as
linhas auxiliares — só aparecem enquanto o tipo correspondente estiver selecionado.

## Importar dados de uma tabela

| Configuração | Descrição |
| --- | --- |
| Campo de inserção | Importa uma tabela copiada do Excel, PowerPoint ou Word. Reconhece tabuladores, ponto e vírgula e vírgulas como separadores de colunas. |
| Como está a sua tabela? | Define a direção de leitura. A predefinição é «um indicador por linha, uma variante por coluna» — tal como a tabela se apresenta na grelha abaixo. A outra opção inverte a orientação ao importar. |
| Aplicar tabela | Substitui eixos, séries e valores. Os eixos e séries com o mesmo nome mantêm a unidade, a direção do eixo e a cor. |

## Introdução sem dados

Enquanto não estiverem criados nem eixos nem séries, o editor explica os
conceitos e apresenta dois botões: **«Carregar exemplo»** preenche uma
comparação completa (MAN eTGX vs. Mercedes-Benz eActros 600), que
pode ser substituída; **«Criar tabela vazia»** define três eixos e duas
séries para preencher.

## Por eixo (uma linha na grelha)

| Configuração | Descrição |
| --- | --- |
| Eixo | Nome do eixo, tal como aparece no gráfico e na tabela de dados. Várias linhas: a tecla Enter cria uma quebra de linha, que também aparece no gráfico. |
| Unidade | É anexada a cada número deste eixo (ponto de dados, dica de ferramenta, tabela), por exemplo, «kWh». |
| Direção («quanto menor, melhor») | Inverte o eixo: o valor menor fica então mais à esquerda. Para indicadores em que um valor menor é melhor — peso, consumo, tempo de carregamento. |
| Decimais | Apenas com as **configurações avançadas por eixo** ativadas: Quantos algarismos decimais são apresentados. Se não for especificado, é utilizado o número de algarismos decimais efetivamente introduzido. |
| Mínimo | Apenas com as «Ajustes finos por eixo» ativadas: limite inferior do eixo. Se não for especificado, é utilizado o menor valor existente neste eixo. |
| Máximo | Apenas com as «Ajustes finos por eixo» ativadas: limite superior do eixo. Se não for especificado, é utilizado o maior valor existente nesse eixo. |
| ↑ ↓ ✕ | Desloca o eixo em círculo ou remove-o juntamente com os seus valores. |

## Por série (uma coluna na grelha)

| Configuração | Descrição |
| --- | --- |
| Nome da série | Nome tal como aparece na legenda, na dica de ferramenta e na tabela de dados. |
| Cor | Substitui a cor atribuída automaticamente a partir da paleta MAN para esta série específica. |
| ← → ✕ | Desloca a série — a ordem determina a cor da paleta e a ordem na legenda — ou elimina-a. |

## Título, legenda e apresentação

| Configuração | Descrição |
| --- | --- |
| Título | Título acima do gráfico. Se o campo ficar em branco, não aparece nenhum título. |
| Nota de rodapé | Texto adicional em letras pequenas abaixo do título, por exemplo, para referências bibliográficas. |
| Legenda | «Acima do gráfico», «Abaixo do gráfico» ou «Ocultar». |
| Linhas auxiliares na rede | Apenas no gráfico de radar: número de anéis auxiliares concêntricos. O valor predefinido é 5. É apenas visual, não altera os valores. |
| Preencher áreas | Apenas no radar: preenche a área por trás de cada linha da série com a respetiva cor, de forma semitransparente. Por predefinição, está desativado. |

## Escalonamento automático

Os eixos não apresentam uma escala numérica visível — esta não pode ser representada de forma significativa quando existem vários eixos
com unidades diferentes. Sem valores mínimos
e máximos definidos, cada eixo estende-se automaticamente entre o
valor mais pequeno e o valor mais grande que nele ocorrem. Isto torna as diferenças
entre as séries claramente visíveis, mas também pode fazer com que pequenas diferenças, na prática
insignificantes, pareçam visualmente grandes. Quem não desejar isso,
deve definir manualmente o mínimo e o máximo do eixo em questão — por exemplo, 0 e 600
para um intervalo, em vez de o estender entre o menor e o maior
valor que nele ocorra.

Um mínimo ou máximo definido manualmente também limita o desenho:
um valor fora destes limites é representado exatamente na borda, em vez de
ultrapassar a grelha. O número no ponto de dados e na tabela permanece
o mesmo que foi introduzido — o limite altera apenas a imagem, nunca o valor. Quem
definir um eixo de 0 a 600 e introduzir 700, verá o ponto na
extremidade e o 700 ao lado.
