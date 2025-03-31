# Weather App ☁️🌦️

Sistema de previsão do tempo que permite exibir a previsão atual e futura da cidade desejada, além de permitir a busca e gestão das cidades favoritas. Ao carregar o projeto e permitir o compartilhamento da localização, renderizará as previsões da cidade em que o usuário se encontra e suas cidades favoritas anteriormente adicionadas.

## ⚙️ Funcionalidades

- **Campo de busca:** Input para digitar o nome da cidade.
- **Cidades favoritas:** Lista com nome da cidade e país, temperatura atual e ícone de lixeira.
- **Clima atual:** Nome da cidade, país, data atual, temperatura, descrição do clima, ícone e dados adicionais como mínima/máxima, umidade, vento e sensação térmica.
- **Próximas previsões:** Lista por hora com horário, ícone, temperatura e descrição.

## 🎨 Visual

- Fundo da aplicação muda conforme o clima da cidade pesquisada.
- Detecta a cidade atual automaticamente via geolocalização.
- Design mobile first.

## 🛠 Tecnologias utilizadas

- **React (TypeScript + JavaScript):** Construção das interfaces e tipagem.
- **Axios:** Requisições à API do OpenWeatherMap.
- **Material UI:** Componentes visuais como botões e campos.
- **Phosphor Icons:** Ícones do clima e ações.
- **React Testing Library:** Testes de interface.
- **OpenWeatherMap API:** Fonte dos dados climáticos.

## ▶️ Como executar o projeto

```bash
git clone https://github.com/mraduarte/desafio-dev-frontend.git
cd weather-app
npm install
npm run dev
```

## ▶️ Como executar o teste

```bash
cd weather-app
npm test
```

## 📁 Estrutura de pastas

```bash
src/
├── assets/
├── components/
│   ├── CityQueryResult/
│   │   ├── index.tsx
│   │   ├── index.test.tsx
│   │   └── styles.css
│   ├── FavoriteCities/
│   │   ├── index.tsx
│   │   ├── index.test.tsx
│   │   └── styles.css
│   ├── QueryNextFewDays/
│   │   ├── index.tsx
│   │   └── styles.css
│   └── SearchBar/
│       ├── index.tsx
│       ├── index.test.tsx
│       └── styles.css
├── interfaces/
├── services/
│   └── apiService.ts
├── utils/
├── App.tsx
├── App.css
├── index.tsx
├── index.css
├── main.tsx
└── setupTests.ts
```

### 🌐 Publicação
O site está disponível em: https://manchesterweatherapp.netlify.app/

### Agradecimentos
Obrigada pela oportunidade de realizar esse teste. Foi uma ótima experiência colocar em prática o que venho aprendendo e poder desenvolver uma solução muito interessante de previsão do tempo. Com certeza aprendi muito com o projeto.

Caso tenha dúvidas, entre em contato comigo por meio dos canais disponibilizados no meu perfil: https://github.com/mraduarte.
