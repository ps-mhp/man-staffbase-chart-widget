# Passo a passo

Tomando como exemplo uma comparação entre veículos (MAN eTGX versus um concorrente) com base em
seis indicadores com unidades diferentes.

## Configurar o diagrama

1. Coloque o widget **Diagrama** na página. As definições do widget
   abrem-se e, nelas, aparece imediatamente o **Editor de diagramas** por cima do
   próprio campo.
2. Na parte superior encontra-se o **tipo de gráfico**. De momento, existe apenas «Gráfico em rede
   (Radar / Aranha)»; o texto abaixo indica para que serve esse tipo.
3. Enquanto ainda não houver dados, a secção **«Eixos e
   séries»** duas opções: **«Carregar exemplo»** preenche a comparação já pronta
   entre o MAN eTGX e o Mercedes-Benz eActros 600, que pode ser facilmente
   substituída, e **«Criar tabela em branco»** disponibiliza três eixos e duas
   séries para preencher.
4. No entanto, a forma recomendada é **«Importar dados de uma tabela»**, na parte
   superior: selecione a tabela comparativa no Excel, PowerPoint ou Word,
   copie-a e cole-a no campo. Abaixo, especifique **como a tabela
   está organizada** — a predefinição é «um indicador por linha, uma
   variante por coluna», ou seja, tal como a tabela aparece no editor abaixo.
   Em seguida, clique em **«Importar tabela»**.
5. Na grelha, **cada linha corresponde a um eixo** e **cada coluna à direita corresponde a uma
   série**. Na parte superior de cada coluna de série encontram-se o nome, a cor e as setas para
   reordenar; no final de cada linha de eixo, as setas e a cruz para esse
   eixo.
6. Introduza a **unidade** para cada eixo (por exemplo, «kWh»). Uma **quebra de linha no
   nome do eixo** — com a tecla Enter — é aplicada no gráfico e
   mantém as legendas longas legíveis.
7. Nos eixos em que um **valor menor é melhor** — peso,
   consumo, tempo de carregamento —, na coluna **Direção**, ative o botão
   **«menor é melhor»**. Sem ele, o valor pior
   (maior) ficaria mais afastado, e o gráfico indicaria exatamente o contrário do
   que se pretende: numa comparação, deve sempre aplicar-se «mais afastado =
   melhor».
8. **Decimais**, **mínimo** e **máximo** por eixo encontram-se atrás
   do botão **«Ajustes finos por eixo»**. Normalmente, não são necessários;
   se estiverem em branco, significa «derivado dos valores».
9. Em **«Título, legenda e apresentação»**, introduza o título e a nota de rodapé,
   coloque ou oculte a **legenda** e, no diagrama de rede, defina as
   **linhas auxiliares na rede**, bem como o **preenchimento das áreas**.
10. A **pré-visualização** à direita mostra continuamente como o diagrama
    fica na página e mantém-se fixa durante a navegação.
11. Definir a **altura** do diagrama (ver [Definições](settings.md)).
12. Se pretender que o diagrama possa ser descarregado como imagem, ative o botão
    **«Permitir descarregar»** (ver [Definições](settings.md)).
    Abaixo do diagrama, aparecerão então dois botões: «Como SVG» e
    «Como PNG».
13. Clique em **Guardar** e, em seguida, em **Fechar**. Só ao clicar em «Guardar» é que
    os dados são transferidos para o widget; enquanto aparecer «Alterações não guardadas»
    ao lado dos botões, nada foi ainda aplicado.

## Alterar posteriormente

1. Volte a abrir as definições do widget — o editor de gráficos aparece
   novamente com o estado guardado pela última vez.
2. Substitua os valores diretamente na grelha ou insira novamente
   uma tabela atualizada. Os eixos e séries com o mesmo nome mantêm as suas
   unidades, orientações dos eixos e cores já definidas — apenas os valores são
   substituídos.
3. Guarde e feche como acima.

## Se algo não funcionar

1. Se, em vez do gráfico, aparecer uma mensagem de aviso, esta já indicará a
   causa — consulte [FAQ](faq.md) para cada texto possível.
2. Se a tabela inserida não for aplicada, verifique se esta
   possui títulos na primeira linha e na primeira coluna. Se
   os eixos e as séries estiverem invertidos na grelha, a direção de leitura abaixo da
   caixa de inserção foi selecionada incorretamente — altere-a e aplique novamente.
3. Se, após a inserção, o gráfico apresentar números errados (por exemplo, deslocados pelo fator
   1000), trata-se, na maioria das vezes, do separador de milhares em
   números provenientes de uma fonte não alemã — consulte as indicações sobre números em
   [Definições](settings.md) e [FAQ](faq.md).
