# Definições

Todas as definições encontram-se no **Editor de Gráficos**, que se abre automaticamente em ecrã inteiro ao abrir as
definições do widget. Na caixa de diálogo do Staffbase
por trás, resta apenas o campo **Gráfico** com a
; nunca é editado manualmente.

## O Editor

Na parte superior encontra-se o cabeçalho, tal como em todos os widgets MAN: nome e título à esquerda, no
centro a vista **Editor · Computador · Tablet · Telemóvel**, à direita
**Reverter**, **Repetir**, **Ajuda**, **Cancelar** e
**Aplicar**. Ao lado, é indicado o que foi alterado – por exemplo, «Tipo de diagrama
alterado» ou «Dados alterados» – ou a razão pela qual o estado ainda não
pode ser aplicado.

Abaixo, duas áreas:

- **À esquerda, a grelha de dados** com uma barra por cima.
- **À direita, o painel «Gráfico»** com quatro separadores: **Dados**,
  **Aparência**, **Eixo** e **Comportamento**.

Nas visualizações «Desktop», «Tablet» e «Móvel», a grelha é substituída
pela pré-visualização na largura do dispositivo; o painel à direita mantém-se, de modo que cada
configuração tem efeito imediatamente ao seu lado.

«Aplicar» transfere o estado para a caixa de diálogo do Staffbase; só fica
guardado de forma permanente com **Guardar** no Studio. Se não houver alterações,
«Aplicar» permanece desativado.

| Tecla | Efeito |
| --- | --- |
| ⌘/Ctrl S | Aplicar |
| ⌘/Ctrl ↵ | Aplicar e fechar |
| ⌘/Ctrl Z, ⇧⌘/Ctrl Z | Anular, Repetir (fora dos campos de texto) |
| F1 | Ajuda |
| Esc | Fechar, com confirmação em caso de alterações pendentes |

## Grelha de dados

Cada **linha** é um **eixo** (um indicador, no caso do gráfico circular, um segmento),
cada **coluna** à direita é uma **série** (uma variante; versões anteriores
referiam-se a «série»). No cabeçalho de cada coluna de série encontram-se um ponto colorido e um nome.

| Coluna | Descrição |
| --- | --- |
| N.º | Seleciona o eixo. Clicar em qualquer campo da linha tem o mesmo efeito. |
| Eixo | Nome do eixo, tal como aparece no gráfico e na tabela de dados. A tecla Enter cria uma quebra de linha, que também aparece no gráfico. |
| Unidade | É anexada a cada número deste eixo (ponto de dados, dica de ferramenta, tabela), por exemplo, «kWh». Nos gráficos de barras e de linhas, o eixo de valores comum apresenta a unidade apenas se **todos** os eixos com valores tiverem a mesma unidade. |
| por série | Os valores, escritos à maneira alemã: vírgula antes das casas decimais, ponto entre os milhares. |

No gráfico circular, a grelha mostra **apenas a primeira série** – uma nota
abaixo indica que outras séries permanecem guardadas, mas não
são representadas.

**Valores do Excel:** copiar células do Excel, selecionar um campo na grelha,
⌘ V (Ctrl V). O bloco é inserido a partir desse campo; os eixos e linhas em falta
são adicionados. No gráfico circular, preenche apenas a única linha visível.

## Barra acima da grelha

| Elemento | Descrição |
| --- | --- |
| Eixo 2 de 5 · Nome | O eixo selecionado. |
| ↑ ↓ | Desloca o eixo selecionado juntamente com os seus valores. No gráfico de radar, a ordem determina a posição no círculo; no gráfico de barras, a ordem na linha de base. |
| Duplicar | Coloca uma cópia do eixo, incluindo valores e definições, diretamente a seguir. |
| Apagar | Remove o eixo, juntamente com os seus valores. Desfazer com ⌘/Ctrl Z. |
| + Eixo | Acrescenta um eixo vazio e coloca o cursor no seu nome. |
| + Linha | Acrescenta uma linha vazia. |
| Inserir do Excel | Abre uma barra à direita para importar uma tabela completa (ver abaixo). |
| Carregar exemplo | Substitui os dados por um exemplo do tipo selecionado. A altura e o download permanecem. Anular com ⌘/Ctrl Z. |

## Inserir do Excel

| Configuração | Descrição |
| --- | --- |
| Tabela | Importa uma tabela copiada do Excel, PowerPoint ou Word. A primeira linha e a primeira coluna são cabeçalhos. Reconhece tabulador, ponto e vírgula e vírgula como separadores de colunas. |
| Como está a tabela? | **Eixos nas linhas** (predefinição): um valor por linha, uma variante por coluna – tal como na grelha. **Eixos nas colunas**: o inverso; a tabela é invertida ao ser importada. |
| Importar tabela | Substitui eixos, séries e valores. Os eixos e séries com o mesmo nome mantêm a unidade, os limites, a direção e a cor. |

## Introdução sem dados

Enquanto não forem criados nem eixos nem séries, a grelha explica os
conceitos e apresenta dois botões: **«Carregar exemplo»** preenche com um
exemplo adequado ao tipo selecionado (por exemplo, no radar, a comparação entre o MAN
eTGX e o Mercedes-Benz eActros 600; no gráfico circular, uma
), **«Criar tabela vazia»** cria eixos e séries para
preenchimento.

## Separador «Dados»

As séries apresentam-se como uma lista; um clique expande uma delas.

| Configuração | Descrição |
| --- | --- |
| ← → | Desloca a linha. A ordem determina a cor da paleta e a legenda; no gráfico circular, é desenhada a linha mais à frente. |
| Apagar | Remove a linha juntamente com os seus valores. |
| Nome | Como aparece na legenda (exceto no gráfico circular), na dica de ferramenta e na tabela de dados. |
| Cor | Sobrescreve a cor da paleta para esta linha; «Paleta» reestabelece a cor original. Não disponível no gráfico circular – nesse caso, a cor do segmento varia consoante o eixo. |
| + Adicionar linha | Acrescenta uma linha vazia e expande-a. |

## Separador «Formato»

| Opção | Descrição |
| --- | --- |
| Tipo | **Rede**, **Barra**, **Linha** ou **Círculo**. A frase abaixo indica para que serve cada tipo. |
| Título | Título acima do gráfico. Em branco: sem título. |
| Nota de rodapé | Texto adicional em letras pequenas, por exemplo, para referências bibliográficas. |
| Legenda | **Acima**, **Abaixo** ou **Ocultar**. No caso do gráfico circular, a legenda enumera os eixos (segmentos); nos outros casos, as séries. |
| Secção do tipo | O que é específico do tipo selecionado; ver abaixo. |
| Altura em px | Altura do gráfico na página, de 160 a 1200 píxeis, predefinida em 420. A largura segue sempre a coluna. Não é possível aplicar uma altura fora destes limites. |

| Tipo | Configuração | Descrição |
| --- | --- | --- |
| Grelha | Linhas auxiliares | Número de anéis concêntricos. Predefinição: 5. Puramente visual. |
| Grelha | Preencher áreas | Preenche a área por trás de cada linha com a sua cor, de forma semitransparente. Predefinição: desativado. |
| Barra | Direção | **Vertical** (categorias em baixo) ou **Horizontal** (categorias à esquerda). Predefinição: vertical. |
| Barra | Empilhada | Linhas sobrepostas em vez de lado a lado. Predefinição: desativada. |
| Linha | Suavizado | Arredonda o traçado, em vez de traçar uma linha reta entre os valores. Predefinição: desativado. |
| Linha | Preencher área | Preenche a área por baixo de cada linha. Predefinição: desativado. |
| Linha | Mostrar pontos | Marca cada valor. Predefinição: ativado. |
| Círculo | Raio interior em % | 0 resulta num círculo completo; um valor maior (por exemplo, 45) resulta num anel. Predefinição: 0. |
| Círculo | Legenda dos segmentos | **Porcentagem**, **Valor**, **Ambos** ou **Nenhum**. Predefinição: Porcentagem. |

Uma mudança de tipo não faz com que se percam **dados**: o título, a nota de rodapé, a legenda, os eixos e
as séries permanecem, assim como as indicações nos eixos. As **configurações do
tipo**, por outro lado, aplicam-se apenas a ele: um gráfico inclui sempre apenas um conjunto
dessas definições, o do tipo atualmente selecionado. Quem definir linhas auxiliares
na grelha, mudar para barras, alterar algo aí e voltar atrás, encontrará
novamente as predefinições na grelha.

## Separador «Eixo»

Os ajustes finos do eixo selecionado na grelha.

| Ajuste | Tipo | Descrição |
| --- | --- | --- |
| Designação | todos | O nome do eixo, em várias linhas. |
| Unidade | todos | Tal como na grelha. |
| Decimais | todos | Quantos decimais são apresentados. Em branco: tantos quantos os introduzidos. |
| Mínimo, Máximo | Grelha | Limites do eixo. Em branco: derivados dos valores (de zero até ao valor máximo). O máximo tem de ser maior do que o mínimo; caso contrário, a configuração não pode ser aplicada. |
| Menor é melhor | Rede | Inverte o eixo: o valor menor fica na extremidade exterior. Para peso, consumo, tempo de carregamento. |
| Cor do segmento | Gráfico circular | Cor do segmento deste eixo; «Paleta» reverte a cor. |

**Por que razão o mínimo, o máximo e «Menor é melhor» só aparecem no gráfico de rede
:** São definidos por eixo e, num eixo de valores comum
– como o utilizado para desenhar barras e linhas –, não podem ser representados. No
gráfico circular, não existe qualquer eixo. Os valores ocultos permanecem
guardados e voltam a ter efeito assim que o tipo for selecionado novamente.

## Separador «Comportamento»

| Configuração | Descrição |
| --- | --- |
| Permitir download | Mostra, por baixo do gráfico, dois botões: «Como SVG» e «Como PNG». O ficheiro contém apenas o gráfico, não a página. Desativado por predefinição. |

Na parte inferior encontra-se a versão do widget – quem reportar um erro, encontra-a
aqui.

## Verificação

«Aplicar» recusa um estado que a página não poderia apresentar dessa forma.
O cabeçalho indica o motivo, o separador apresenta uma marca vermelha, o
eixo em questão está assinalado na grelha e o campo indica o que deve ser feito.

| Mensagem | Causa |
| --- | --- |
| Eixo «…»: máximo demasiado pequeno | Na rede, o máximo não é superior ao mínimo. |
| «…»: proporção negativa no gráfico circular | Um valor da primeira linha é negativo; um gráfico circular apresenta apenas proporções a partir de zero. |
| Altura: são permitidos 160 a 1200 píxeis | A altura está fora dos limites. |

## Gráficos existentes

Até à versão 0.3, **Altura** e **Permitir download** apareciam como campos separados
na caixa de diálogo do Staffbase. Estes campos estão agora ocultos; os seus valores continuam a ser válidos
até que seja definida outra configuração no editor. Ao abrir,
o editor adota-os como valor inicial – um gráfico existente mantém-se exatamente
igual ao anterior após a abertura e a aplicação das alterações. Se a antiga marca de seleção não fosse
legível, o separador «Comportamento» indica isso por baixo do botão.

## Escalonamento automático

**No gráfico de radar**, os eixos não apresentam uma escala numérica visível ��� não é possível representá-la de forma adequada quando
existem vários eixos com unidades diferentes. Sem
indicação específica, cada eixo começa, em vez disso, em **zero** e vai até
ao seu maior valor possível. O comprimento de um raio comporta-se, assim,
tal como o próprio valor: metade do percurso para o exterior corresponde também a metade da quantidade.

Se houver valores negativos num eixo, este começa pelo menor deles –
caso contrário, o ponto ficaria fora da grelha.

Quem quiser realçar mais as diferenças entre as séries deve definir
manualmente o mínimo e o máximo do eixo em questão – por exemplo, 400 e 600 em vez de
0 e 600. Isto aumenta as distâncias visíveis, mas também faz com que pequenas
diferenças, insignificantes na prática, pareçam grandes.

Um mínimo ou máximo definido manualmente também limita o traçado:
um valor fora destes limites é representado exatamente na borda, em vez de
ultrapassar a grelha. O número no ponto de dados e na tabela permanece
o mesmo que foi introduzido – o limite altera apenas a imagem, nunca o valor. Quem
definir um eixo de 0 a 600 e introduzir 700, verá o ponto na
extremidade e o 700 ao lado.

**No caso de gráficos de barras e de linhas**, o ECharts desenha ele próprio um eixo de valores com
uma escala visível; este eixo tem o ponto zero fixo e não pode ser
limitado manualmente. **No caso do gráfico circular**, não existe um eixo de valores – cada segmento mostra
a sua proporção em relação ao todo. Um valor negativo não constitui, neste caso, um
problema de representação, mas sim um erro de dados: o editor não permite que seja
aplicado e um gráfico mais antigo apresenta na página uma indicação relativa
ao eixo em questão, em vez de desenhar um gráfico circular incorreto.
