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

## Cabeçalho do Editor de Diagramas

| Configuração | Descrição |
| --- | --- |
| Título | Título acima do gráfico. Se o campo ficar em branco, não aparece nenhum título. |
| Nota de rodapé | Texto adicional em letras pequenas abaixo do título, por exemplo, para referências bibliográficas. |
| Mostrar legenda | Ativa ou desativa a legenda com os nomes das séries. |
| Posição da legenda | «em cima» ou «em baixo» — onde a legenda fica em relação ao gráfico. |
| Número de anéis | Apenas no gráfico de radar: número de anéis auxiliares concêntricos na rede. O valor predefinido é 5. É apenas visual, não altera os valores. |
| Preencher área | Apenas no gráfico de radar: preenche a área por trás de cada linha da série com a cor da mesma, de forma semitransparente. Por predefinição, está desativado. |

## Por categoria (eixo)

| Configuração | Descrição |
| --- | --- |
| Legenda | Nome do eixo, tal como aparece no gráfico e na tabela de dados. |
| Unidade | É anexada a cada número deste eixo (ponto de dados, dica de ferramenta, tabela), por exemplo, «kWh». |
| Decimais | Quantos decimais são apresentados. Se não for especificado, é utilizado o número de decimais efetivamente introduzido. |
| Mínimo | Limite inferior do eixo. Se não for especificado, é utilizado o menor valor existente neste eixo. |
| Máximo | Limite superior do eixo. Se não for especificado, é utilizado o maior valor presente neste eixo. |
| Quanto menor, melhor | Inverte o eixo: o valor menor fica então mais afastado. Para indicadores em que um valor menor é melhor — peso, consumo, tempo de carregamento. |

## Por série

| Configuração | Descrição |
| --- | --- |
| Nome da série | Nome tal como aparece na legenda, na dica de ferramenta e na tabela de dados. |
| Cor | Substitui a cor atribuída automaticamente a partir da paleta MAN para esta série específica. |

## Escalonamento automático

Os eixos não apresentam uma escala numérica visível — esta não pode ser representada de forma sensata quando existem vários eixos
com unidades diferentes. Sem valores mínimo
e máximo definidos, cada eixo estende-se automaticamente entre o
valor mais baixo e o valor mais alto que nele ocorre. Isto torna as diferenças
entre as séries claramente visíveis, mas também pode fazer com que pequenas diferenças, na prática
insignificantes, pareçam visualmente grandes. Quem não quiser isso,
deve definir manualmente o mínimo e o máximo do eixo em questão — por exemplo, 0 e 600
para um intervalo, em vez de o estender entre o valor mais pequeno e o mais grande
que nele ocorra.

Um mínimo ou máximo definido manualmente também limita o gráfico:
um valor fora destes limites é representado exatamente na margem, em vez de
ultrapassar a grelha. O número no ponto de dados e na tabela permanece
o que foi introduzido — o limite altera apenas a imagem, nunca o valor. Quem
definir um eixo de 0 a 600 e introduzir 700, verá o ponto na
extremidade e o 700 ao lado.
