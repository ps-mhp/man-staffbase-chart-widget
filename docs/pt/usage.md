# Passo a passo

Tomando como exemplo uma comparação entre veículos (MAN eTGX versus um concorrente) com base em
seis indicadores com unidades diferentes.

## Configurar o gráfico

1. Coloque o widget **Gráfico** na página. As definições do widget
   abrem-se e, nelas, aparece imediatamente o **Editor de gráficos** por cima do
   próprio campo.
2. Selecione e copie os dados de comparação do Excel: na **primeira linha**, as
   categorias (eixos, por exemplo, «Autonomia [km]», «Tempo de carregamento [min]»); na **primeira
   coluna** as séries (por exemplo, os nomes dos veículos). No editor, cole no campo
   **«Inserir tabela»** e clique em **«Aplicar tabela»**.
   Os valores aparecem então na grelha acima e na pré-visualização.
3. Para cada categoria (coluna dos eixos na grelha), defina a **unidade** e
   **as casas decimais** — isto determina como o número aparece nos
   pontos de dados, na dica de ferramenta e na tabela, por exemplo, «125,5 kWh».
4. Para categorias em que um **valor menor é melhor** — peso,
   consumo, tempo de carregamento —, ative o botão **«Menor é melhor»** do eixo
  . Sem este botão, o valor pior (maior) ficaria
   mais afastado no eixo, e o gráfico transmitiria exatamente o contrário do
   que se pretende: numa comparação, deve sempre aplicar-se «mais afastado = melhor»
  .
5. Introduza o **título** e a **nota de rodapé**, ative/desative a legenda e selecione a sua
   posição (em cima/em baixo).
6. Defina a **altura** do gráfico (consulte [Definições](settings.md)).
7. Se pretender que o gráfico possa ser descarregado como imagem, ative o botão
   **«Permitir descarregamento»** (ver [Definições](settings.md)).
   Abaixo do gráfico, aparecem então dois botões: «Como SVG» e
   «Como PNG».
8. Clique em **Guardar** e, em seguida, em **Fechar**. Só ao clicar em «Guardar» é que
   os dados são transferidos para o widget; enquanto estiver escrito ao lado dos botões «Alterações não guardadas»,
   ainda não foi aplicado nada.

## Alterar posteriormente

1. Volte a abrir as definições do widget — o editor de gráficos aparece
   novamente com o estado guardado pela última vez.
2. Substitua os valores diretamente na grelha ou insira novamente uma tabela
   atualizada. As categorias e séries com o mesmo nome mantêm as suas
   unidades, orientações dos eixos e cores já definidas — apenas os valores são
   substituídos.
3. Guarde e feche como acima.

## Se algo não funcionar

1. Se, em vez do gráfico, aparecer uma mensagem de aviso, esta já indicará a
   causa — consulte [FAQ](faq.md) para conhecer todas as mensagens possíveis.
2. Se a tabela inserida não for aplicada, verifique se a primeira
   linha contém as categorias e se a primeira coluna contém os nomes das séries.
3. Se, após a inserção, o gráfico apresentar números errados (por exemplo, deslocados por um fator de
   1000), trata-se, na maioria das vezes, do separador de milhares em
   números provenientes de uma fonte não alemã — consulte as indicações sobre números em
   [Definições](settings.md) e [FAQ](faq.md).
