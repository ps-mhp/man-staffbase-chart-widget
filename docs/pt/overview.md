# Gráfico

O widget de gráfico apresenta indicadores sob a forma de **gráfico radial/em rede**: vários
eixos irradiam em forma de estrela a partir de um ponto central e cada série — por
exemplo, um veículo em comparação — liga os seus valores nestes eixos, formando
uma área. Desta forma, é possível comparar vários indicadores de várias séries num
único olhar, mesmo que sejam medidos em unidades totalmente diferentes
— quilómetros, toneladas, minutos, quilowatts.

O gráfico é configurado através de um editor próprio, que se abre diretamente nas
configurações do widget. Uma tabela copiada do Excel pode ser
importada com um clique; consulte [Passo a passo](usage.md).

Estão previstos outros tipos de gráficos (por exemplo, gráficos de barras ou de linhas) para futuras
versões, mas **ainda não estão disponíveis** — atualmente, só é possível
selecionar o gráfico de radar/rede.

## O que os leitores veem

- O próprio gráfico, com um número ilimitado de eixos e séries.
- Os valores aparecem diretamente nos pontos de dados; além disso, ao
  passar o cursor por um ponto, surge uma dica de ferramenta com todos os valores da série.
- Uma legenda acima ou abaixo do gráfico, dependendo da configuração.
- Opcionalmente, um título e uma nota de rodapé.
- Se o download estiver permitido (ver [Definições](settings.md)), dois botões
  por baixo do gráfico para descarregar como imagem.
- Para leitores de ecrã, adicionalmente, uma tabela de dados completa por baixo do
  gráfico. Está visualmente oculta, mas está presente — o gráfico é,
  assim, utilizável mesmo sem perceção visual.

## Exportação de imagem

Com a opção de descarregamento ativada, aparecem dois botões abaixo do gráfico:
«Como SVG» e «Como PNG». O ficheiro descarregado contém **apenas o
diagrama**, não o resto da página — título, legenda, eixos e valores
exatamente como estão a ser apresentados, com fundo branco (mesmo que
a própria página tenha um fundo transparente ou escuro). O ficheiro SVG pode ser
ampliado sem perda de qualidade; o PNG é adequado para situações em que não é possível incorporar um SVG
(por exemplo, na maioria dos programas de apresentação) e é gerado com
resolução dupla.

## Tradução

Na tradução automática da página, o gráfico é incluído. São traduzidos
o título, a nota de rodapé, as legendas dos eixos e os nomes das séries — exatamente os
textos que foram introduzidos editorialmente. Números, unidades, limites dos eixos,
cores e todas as restantes definições permanecem inalteradas, porque não têm
linguagem: uma unidade traduzida seria errada («t» não se torna «ton»),
um número traduzido não faria sentido.

## O que vê no editor do CMS

Ao inserir o bloco, abre-se automaticamente o **editor de gráficos**:
na parte superior, a seleção do tipo de gráfico e um campo onde pode ser inserida uma tabela copiada do Excel
, por baixo uma grelha com **uma linha por eixo** e
**uma coluna por série**, ao lado uma pré-visualização em tempo real que mostra exatamente como
o gráfico aparecerá posteriormente na página. Enquanto ainda não tiver nada criado,
o editor explica os termos e oferece as opções «Carregar exemplo» e
«Criar tabela vazia». O campo de texto a seguir mostra apenas a forma técnica
armazenada e codificada dos dados e nunca é editado manualmente.

Uma característica importante: os eixos **não apresentam uma escala numérica visível**.
Vários eixos com unidades diferentes (por exemplo, quilómetros e minutos)
não podem ser representados de forma adequada numa escala comum. Cada eixo
é, por isso, estendido internamente de forma independente entre o seu valor mínimo e máximo;
os números reais aparecem nos pontos de dados, na dica de ferramenta e
na tabela de dados. Mais informações em [Definições](settings.md).
