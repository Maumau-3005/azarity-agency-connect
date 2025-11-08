# Julia Azarity - Dashboard & Media Kit Interativo

Dashboard analítico premium e media kit exportável para Julia Azarity, criadora de conteúdo especializada em lifestyle, moda e beleza.

## 🎯 Funcionalidades

- **Landing Page** com KPIs em destaque
- **Dashboard Interativo** com filtros, gráficos (Recharts) e exportação CSV
- **Páginas Dedicadas** para Instagram e TikTok
- **Área para Agências** com interface "Tinder-style" (swipe cards)
- **Media Kit** completo e exportável em PDF
- **Dark Mode** com paleta vermelho/roxo

## 🚀 Começando

### Pré-requisitos

- Node.js 20.x ou superior
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <YOUR_GIT_URL>

# Entre no diretório
cd julia-azarity-dashboard

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:8080`

## 📦 Build & Deploy

### Build Local

```bash
# Criar build de produção
npm run build

# Testar build localmente
npm run preview
```

### Deploy na Vercel

1. Conecte seu repositório na [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push na branch main

Ou use o CLI da Vercel:

```bash
npx vercel
```

## 🏗️ Estrutura do Projeto

```
├── data/                    # Dados JSON de exemplo
│   ├── instagram.json
│   ├── tiktok.json
│   └── top_posts.json
├── src/
│   ├── components/          # Componentes React
│   │   ├── ui/             # Componentes shadcn/ui
│   │   ├── charts/         # Gráficos Recharts
│   │   ├── KpiCards.tsx
│   │   ├── SwipeCard.tsx
│   │   ├── PostGrid.tsx
│   │   └── Filters.tsx
│   ├── lib/                # Utilidades
│   │   ├── store.ts        # Estado Zustand
│   │   ├── data.ts         # Schemas e helpers
│   │   └── utils.ts
│   ├── pages/              # Páginas da aplicação
│   │   ├── Index.tsx       # Landing
│   │   ├── Dashboard.tsx   # Dashboard principal
│   │   ├── Instagram.tsx
│   │   ├── TikTok.tsx
│   │   ├── Agency.tsx      # Swipe cards
│   │   └── Kit.tsx         # Media kit
│   └── index.css           # Design system
├── styles/
│   └── print.css           # Estilos para PDF
└── tailwind.config.ts      # Configuração Tailwind
```

## 🎨 Design System

O projeto usa um design system customizado com:

- **Cores Primárias**: Vermelho (#EF4444) e Roxo (#A21CAF)
- **Gradientes**: Fuchsia → Rose → Red
- **Tipografia**: Inter (sistema)
- **Componentes**: shadcn/ui customizados
- **Animações**: Framer Motion + Tailwind

Todas as cores são definidas em `src/index.css` usando tokens semânticos HSL.

## 📊 Dados

Os dados de exemplo estão em `/data` como arquivos JSON. Para usar dados reais:

1. Substitua os arquivos JSON com seus dados
2. Ou implemente integração com APIs (Instagram/TikTok)
3. O formato dos dados está documentado em `src/lib/data.ts`

## 🔄 Funcionalidades Principais

### Dashboard
- Filtros por data, plataforma e tipo de post
- Gráficos de linha e barra (Recharts)
- KPIs com variação vs período anterior
- Exportação para CSV

### Swipe Cards (Agências)
- Arraste ou use teclado (←/→/↑)
- Persistência em localStorage
- Lista de matches exportável
- Animações suaves (Framer Motion)

### Media Kit
- Layout editorial responsivo
- Botão "Baixar PDF" (print-CSS otimizado)
- Compartilhamento de link
- SEO otimizado

## 🛠️ Stack Tecnológica

- **Framework**: Vite + React 18
- **Linguagem**: TypeScript
- **Estilo**: Tailwind CSS + shadcn/ui
- **Gráficos**: Recharts
- **Animações**: Framer Motion
- **Estado**: Zustand (com persist)
- **Validação**: Zod
- **Datas**: date-fns
- **Ícones**: lucide-react

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Acessibilidade

- Contraste WCAG AA
- Navegação por teclado
- ARIA labels em elementos interativos
- Focus states visíveis
- Semântica HTML5

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run lint         # Executar ESLint
npm run typecheck    # Verificar tipos TypeScript
```

## 📝 Notas

- Este projeto usa Vite + React 18 (não Next.js)
- Dark mode é o padrão (pode ser ajustado em `src/index.css`)
- Para produção, considere adicionar analytics e monitoramento
- Os dados são carregados do lado do cliente via fetch dos arquivos JSON
- Para integrar APIs reais, adicione os endpoints em um backend separado

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e pertence a Julia Azarity. Todos os direitos reservados.

## 📞 Contato

Para dúvidas ou suporte:
- Email: contato@juliaazarity.com
- Instagram: [@juliaazarity](https://instagram.com/juliaazarity)

---

Desenvolvido com ❤️ usando [Lovable](https://lovable.dev)
