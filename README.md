# 🌊 Maré Viva – App para Pescadores de Salinas da Margarida

App PWA (Progressive Web App) feito especialmente para a comunidade pesqueira de **Salinas da Margarida, Bahia, Brasil**.

## 📱 Funcionalidades

### 🌙 Fases da Lua
- Fase atual calculada com precisão astronômica
- Próximas fases (Nova, Quarto Crescente, Cheia, Quarto Minguante)
- Relação lua x maré explicada
- Iluminação lunar e horário de nascimento

### 🌊 Tábua de Marés
- 4 marés diárias (preamar e baixa-mar) calculadas para a região
- Referência: Baía de Todos os Santos / Salinas da Margarida
- Barra visual indicando nível atual da maré
- Previsão para os próximos 5 dias
- Indicação se a maré está subindo ou descendo

### ⛅ Previsão do Tempo
- Temperatura, umidade, vento e visibilidade
- Horário do nascer e pôr do sol
- Previsão de 5 dias
- Alertas de condições adversas (mar agitado, trovoada)
- Indicação de segurança para navegação

### 🐟 Pesca e Cardumes
- Movimentação de cardumes na Baía de Todos os Santos
- Indicação de atividade por zona pesqueira
- Melhores horários para marisqueiras
- Espécies da região com status de defeso
- Dicas baseadas em lua, maré e hora do dia

### 🚫 Defesos
- Status atualizado dos defesos vigentes (Caranguejo, Camarão, Lagosta)
- Alertas visuais para períodos proibidos
- Informações sobre seguro-desemprego do defeso

### 📓 Anotações (100% Offline)
- Salvas diretamente no dispositivo
- Categorias: Pesca, Marisco, Tempo, Geral
- Registro automático de lua e maré no momento da anotação
- Sem necessidade de internet para salvar

### ℹ️ Informações Úteis
- Contatos de emergência marítima (SALVAMAR, Capitania dos Portos)
- Contatos de órgãos de pesca (IBAMA, SEAP, Colônia Z-39)
- Informações sobre seguro defeso e documentação RGP
- Legislação pesqueira e tamanhos mínimos
- Boas práticas de sustentabilidade e conservação do manguezal

## 🚀 Como Instalar

### Opção 1 – Hospedagem Web (Recomendado)
1. Faça upload de todos os arquivos para um servidor web com HTTPS
2. Acesse o app no celular
3. O banner de instalação aparecerá automaticamente
4. Toque em "Instalar" para adicionar à tela inicial

### Opção 2 – GitHub Pages (Gratuito)
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Ative GitHub Pages nas configurações
4. O app estará disponível em `https://seuusuario.github.io/nome-repo`

### Opção 3 – Netlify (Arraste e Solte)
1. Acesse netlify.com
2. Arraste a pasta do app para a interface
3. Obtenha a URL e compartilhe com a comunidade

## 📂 Estrutura de Arquivos
```
mare-viva/
├── index.html      # App principal (tudo em um arquivo)
├── manifest.json   # Configuração PWA
├── sw.js           # Service Worker (offline)
├── icons/
│   ├── icon.svg    # Ícone vetorial
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## ⚙️ Requisitos
- Servidor HTTPS (obrigatório para PWA)
- Navegador moderno (Chrome, Firefox, Safari)
- Para instalar: Chrome Android ou Safari iOS

## 🔧 Personalização
Para ajustar para outras localidades, modifique em `index.html`:
- `LAT` e `LON`: coordenadas de Salinas da Margarida (`-13.0033, -38.7669`)
- Dados de defeso: função `renderDefesos()`
- Zonas de pesca: função `renderFishZones()`
- Contatos: seção de acordeão em `screen-info`

## 📡 Funciona Offline?
**Sim!** Após a primeira visita com internet:
- Fases da lua: 100% offline (cálculo local)
- Tábua de marés: 100% offline (modelo harmônico)
- Anotações: 100% offline (localStorage)
- Tempo: Usa cache da última consulta (1 hora)
- Defesos: 100% offline (dados embutidos)

## 🌊 Sobre Salinas da Margarida
Município do Recôncavo Baiano, situado na entrada da Baía de Todos os Santos.
Coordenadas: 13°00'12"S, 38°46'01"W.
A comunidade pesqueira é base econômica do município.

---
Feito com 💙 para a comunidade de Salinas da Margarida
