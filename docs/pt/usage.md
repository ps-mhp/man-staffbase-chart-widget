# Passo a passo

Tomando como exemplo uma comparação de veículos (MAN eTGX versus um concorrente) através de
seis indicadores com unidades diferentes, apresentados num diagrama em rede; os
passos aplicam-se, por analogia, aos restantes três tipos.

## Configurar o diagrama

1. Coloque o widget **Diagrama** na página. As definições do widget
   abrem-se e, imediatamente, o **Editor de diagramas** aparece em ecrã inteiro. À esquerda
   encontra-se a grelha de dados e, à direita, o painel **«Diagrama»** com os separadores
   Dados, Formato, Eixo e Comportamento. A opção **Ajuda** no cabeçalho abre as mesmas
   explicações que esta documentação.
2. No painel, em **Formato**, selecione o **Tipo**: **Rede**, **Barra**,
   **Linha** ou **Círculo**; a frase abaixo indica para que serve cada tipo
  . Uma alteração posterior não faz com que se percam dados – os eixos, as séries e o título
   e a legenda permanecem; as indicações nos eixos (por exemplo, mínimo e máximo
   na rede) são apenas ocultadas. As **configurações do tipo** aplicam-se,
   no entanto, apenas a esse tipo; consulte [Configurações](settings.md).
3. Enquanto ainda não houver dados, a grelha oferece duas opções:
   **«Carregar exemplo»** preenche um exemplo adequado ao tipo, que pode ser
   substituído; **«Criar tabela vazia»** cria eixos e linhas para
   preencher.
4. No entanto, o método recomendado é **«Inserir a partir do Excel»**, no canto superior direito, acima
   da grelha: selecione a tabela de comparação no Excel, PowerPoint ou Word,
   copie-a e cole-a no campo da barra. Abaixo,
   especifique **como a tabela está disposta** – a predefinição é **Eixos nas linhas**,
   ou seja, tal como a tabela aparece na grelha. Em seguida, **«Aplicar tabela»**.
   Este passo é igual para os quatro tipos.
5. Na grelha, **cada linha é um eixo** e **cada coluna à direita é uma
   série**. No gráfico circular, a grelha mostra **apenas a primeira série**;
   uma nota abaixo indica que as restantes séries permanecem guardadas, mas
   não são representadas.
6. Substitua valores individuais diretamente na grelha. Também é possível utilizar blocos do Excel
: copie as células, selecione um campo na grelha, ⌘ V (Ctrl V).
7. Introduzir a **unidade** para cada eixo (por exemplo, «kWh»). Uma **quebra de linha no
   nome do eixo** — com a tecla Enter — é aplicada no gráfico e
   mantém as legendas longas legíveis.
8. Clicar numa linha seleciona o eixo. A barra acima identifica-o
   («Eixo 2 de 6 · Peso da bateria») e oferece as opções **para cima**, **para
   baixo**, **duplicar** e **apagar**. No painel sob **Eixo**
   encontram-se as suas configurações avançadas: designação, unidade, casas decimais,
   para a rede **Mínimo**, **Máximo** e **«Menor é melhor»**, para o
   gráfico circular a **cor do segmento**.
9. Apenas na rede: nos eixos em que um **valor menor é melhor** –
   peso, consumo, tempo de carregamento –, ative **«Menor é melhor»**.
   Sem esta opção, o valor pior (maior) ficaria mais afastado, e o gráfico
   transmitiria o contrário do que se pretende.
10. Em **Dados**, nomeie as séries; se necessário, defina uma **cor** própria
    e altere a sua ordem – esta determina a cor da paleta e
    a legenda.
11. Em **Formato**, insira o título e a nota de rodapé; coloque a **legenda** por cima
    ou abaixo do gráfico, ou ocultá-la, e selecionar as definições do
    tipo: no caso da rede, **Linhas auxiliares** e **Preenchimento de áreas**; no caso da
    barra, **Direção** e **Empilhado**; no caso da linha, **Suavizado**,
    **Preenchimento de área** e **Mostrar pontos**; no gráfico circular, **Raio interior** e
    **Rótulo dos segmentos**. Na parte inferior, defina a **Altura em px** (160 a
    1200).
12. Se pretender que o gráfico possa ser descarregado como imagem, em
    **Comportamento**, ative **«Permitir descarregamento»**. Por baixo do gráfico
    aparecem então dois botões: «Como SVG» e «Como PNG».
13. No cabeçalho, selecione **Desktop**, **Tablet** ou **Móvel**: a
    pré-visualização mostra o gráfico tal como aparece na página, com o painel
    à direita a permanecer ao lado.
14. **Aplicar** – ou ⌘/Ctrl ↵ para aplicar e fechar. Em seguida, no
    Studio, **Guardar**; só assim a página fica guardada.

## Alterar posteriormente

1. Volte a abrir as definições do widget – o editor aparece com o
   último estado guardado, incluindo o tipo.
2. Substitua os valores diretamente na grelha ou volte a importar uma tabela atualizada através de
   «Inserir do Excel». Os eixos e séries com o mesmo nome
   mantêm as unidades, limites, direção e cores – apenas os valores
   são substituídos.
3. Cada passo pode ser anulado com ⌘/Ctrl Z; **Anular** descarta
   tudo desde a última aplicação.
4. Aplicar e guardar no Studio como indicado acima.

## Se algo não funcionar

1. Se aparecer um texto de aviso na página em vez do gráfico, este já
   indica a causa – consulte [FAQ](faq.md) para conhecer todas as mensagens possíveis.
2. Se não for possível executar «Aplicar», o cabeçalho indica o motivo e o
   separador afetado apresenta uma marca vermelha – por exemplo, «Eixo «…»: Máximo demasiado
   pequeno». Consulte «Verificação» em [Definições](settings.md).
3. Se a tabela inserida não puder ser aplicada, verifique se esta
   possui títulos na primeira linha e na primeira coluna. Se
   os eixos e as linhas estiverem invertidos na grelha, a direção de leitura foi
   selecionada incorretamente – inverta-a e aplique novamente.
4. Se, após a inserção, o gráfico apresentar valores errados (por exemplo, deslocados por um fator
   de 1000), trata-se geralmente do separador de milhares em
   números provenientes de uma fonte não alemã – consulte [FAQ](faq.md).
5. No gráfico circular, a área permanece vazia, apesar de os valores estarem
   introduzidos: nesse caso, todos os valores da primeira linha têm o valor zero ou estão em falta.
