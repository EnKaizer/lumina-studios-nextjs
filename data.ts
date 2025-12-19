import { Gamepad2, BarChart3, Users, Zap, Target, ShieldCheck, Brain, Trophy } from "lucide-react";

export const NAV_LINKS = [
  { label: "Soluções", href: "#solutions" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Exemplos", href: "#templates" },
  { label: "Planos", href: "#plans" },
];

export const METRICS = {
  events: [
    { id: 1, value: "45s", label: "Tempo Médio de Interação", note: "vs 8s em panfletos" },
    { id: 2, value: "82%", label: "Taxa de Participação", note: "Scan -> Jogo" },
    { id: 3, value: "3.5x", label: "Mais Leads Capturados", note: "Comparado a formulários estáticos" },
    { id: 4, value: "60%", label: "Resgate de Cupons", note: "Visitas geradas ao stand" },
  ],
  retail: [
    { id: 1, value: "2m", label: "Tempo em Loja", note: "Aumento na permanência" },
    { id: 2, value: "45%", label: "Conversão em Vendas", note: "Jogadores que compram" },
    { id: 3, value: "90%", label: "Satisfação do Cliente", note: "NPS pós-experiência" },
    { id: 4, value: "25%", label: "Ticket Médio Maior", note: "Com gamificação" },
  ],
  real_estate: [
    { id: 1, value: "150+", label: "Leads Qualificados", note: "Por final de semana" },
    { id: 2, value: "12%", label: "Agendamento de Visitas", note: "Direto do jogo" },
    { id: 3, value: "5m", label: "Tempo de Engajamento", note: "Explorando o decorado virtual" },
    { id: 4, value: "40%", label: "Compartilhamento", note: "Viralização orgânica" },
  ]
};

export const LEVELS = [
  {
    level: 1,
    title: "Atrair",
    description: "QR Codes estratégicos em mídia, stands ou palcos capturam a atenção imediata.",
    icon: Zap,
    action: "Scan to Play"
  },
  {
    level: 2,
    title: "Engajar",
    description: "Mini-games viciantes de 20-60s mantêm o usuário focado na sua marca.",
    icon: Gamepad2,
    action: "Play & Have Fun"
  },
  {
    level: 3,
    title: "Converter",
    description: "Captura de lead, entrega de cupom ou agendamento de forma natural.",
    icon: Users,
    action: "Get Reward"
  },
  {
    level: 4,
    title: "Medir & Otimizar",
    description: "Dashboard completo com insights de comportamento e ROI em tempo real.",
    icon: BarChart3,
    action: "Analyze Data"
  }
];

export const SOLUTIONS = [
  {
    title: "Personalização Real-Time",
    description: "O jogo se adapta ao perfil do usuário instantaneamente para maximizar o engajamento.",
    icon: Target
  },
  {
    title: "Dificuldade Dinâmica (DDA)",
    description: "IA ajusta o desafio para evitar frustração ou tédio, garantindo completude.",
    icon: Brain
  },
  {
    title: "Geração de Criativos A/B",
    description: "Variações automáticas de assets e textos para encontrar a melhor conversão.",
    icon: Zap
  },
  {
    title: "Recomendação Inteligente",
    description: "Sugere rotas ou produtos baseados no comportamento do jogador.",
    icon: Trophy
  },
  {
    title: "Detecção de Fraude",
    description: "Heurísticas avançadas para garantir que seus leads sejam humanos e qualificados.",
    icon: ShieldCheck
  },
  {
    title: "Analytics Preditivo",
    description: "Insights acionáveis sobre quais mecânicas geram mais resultado.",
    icon: BarChart3
  }
];

export const TEMPLATES = [
  {
    id: "treasure",
    name: "Caça ao Tesouro Interativa",
    duration: "30-45s",
    objective: "Exploração / Engajamento",
    video: "/game-treasure-hunt.mp4",
    mechanics: "Jogadores exploram um mapa interativo tocando em áreas para descobrir tesouros escondidos. Cada descoberta revela informações sobre produtos/serviços da marca. Mecânica de tap-to-reveal com feedback visual imediato e sistema de pontuação por descobertas.",
    kpis: ["Tempo médio de sessão: 40-50s", "Taxa de conclusão: 75-85%", "Engajamento com conteúdo da marca", "Compartilhamento social"]
  },
  {
    id: "trivia-rush",
    name: "Quiz Personalizado",
    duration: "40s",
    objective: "Educação / Qualificação de Leads",
    video: "/game-quiz.a8f3d2e1.png",
    mechanics: "Perguntas de múltipla escolha sobre preferências, conhecimento do produto ou perfil do consumidor. Timer visual cria senso de urgência. Respostas corretas geram pontos e desbloqueiam recompensas. Ideal para segmentação e qualificação de leads baseada em interesses.",
    kpis: ["Taxa de qualificação de leads: 60-70%", "Dados de preferência coletados", "Segmentação automática por respostas", "Conversão pós-quiz: 25-35%"]
  },
  {
    id: "runner",
    name: "Desafio de Precisão",
    duration: "30s+",
    objective: "Competição / Ranking",
    video: "/game-precision.mp4",
    mechanics: "Jogo de timing onde jogadores devem parar uma agulha rotativa no momento exato para acertar a zona de pontuação máxima. Múltiplas rodadas com dificuldade progressiva. Leaderboard em tempo real incentiva replays e competição entre participantes.",
    kpis: ["Taxa de replay: 3-5x por usuário", "Viralização por competição", "Tempo total de engajamento: 2-3 minutos", "Captura de leads via ranking"]
  }
];

export const PLANS = [
  {
    name: "Sprint",
    type: "Plano A",
    description: "Piloto rápido para validação ou eventos pontuais.",
    features: ["1 Template de Jogo", "Customização de Marca Básica", "Captura de Leads Simples", "Relatório em PDF", "Hospedagem por 15 dias"],
    cta: "Pedir Proposta"
  },
  {
    name: "Campanha Premium",
    type: "Plano B",
    description: "Experiência completa para lançamentos e grandes ativações.",
    features: ["Jogo Customizado", "Integração com CRM", "Dashboard em Tempo Real", "Suporte Dedicado", "Hospedagem por 3 meses", "A/B Testing com IA"],
    cta: "Pedir Proposta",
    highlight: true
  },
  {
    name: "LiveOps",
    type: "Plano C",
    description: "Recorrência e engajamento contínuo para marcas.",
    features: ["Múltiplos Jogos", "Atualizações Mensais", "Consultoria de Gamificação", "SLA Prioritário", "Contrato Anual", "Full API Access"],
    cta: "Falar com Consultor"
  }
];

export const CASES = [
  {
    client: "TechSummit 2024",
    sector: "Eventos",
    result: "3.500 Leads",
    description: "Gamificação do credenciamento aumentou a captura de dados em 240%."
  },
  {
    client: "Burger King (Exemplo)",
    sector: "Varejo",
    result: "15k Cupons",
    description: "Jogo de 'monte seu lanche' gerou 15.000 visitas às lojas em 1 semana."
  },
  {
    client: "Vila Nova Empreendimentos",
    sector: "Imobiliária",
    result: "R$ 4M em Vendas",
    description: "Tour virtual gamificado converteu 12 unidades no lançamento."
  }
];
