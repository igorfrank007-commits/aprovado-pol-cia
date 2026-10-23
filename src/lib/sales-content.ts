import { BookOpen, Target, Calendar, ListChecks, Brain, Headphones, MessageCircle, Trophy, BarChart3 } from 'lucide-react';
// Destination of every "Quero ser aprovado" button: the Study Planner Pro auth page.
export const checkoutUrl = 'https://operacaoestudei.lovable.app/auth?mode=signup';
// Segunda linha dos botões de compra ("Quero ser aprovado").
export const ctaSub = 'Criar conta gratuita';
export const whatsappUrl = 'https://wa.me/5555981205146';
export const offer = { monthly: 37.00, annualInstallments: 12, annualInstallment: 19.90, guaranteeDays: 7, supportDays: 30 };
export const benefits = [
 {icon:BookOpen,title:'Curso Completo em Vídeo Aulas',desc:'Curso completo em vídeo aulas em que eu mostro meu método passo a passo.'},
 {icon:Calendar,title:'Cronograma e Planejamento Automáticos',desc:'Você vai aprender como gerar automaticamente seu cronograma de estudos e planejamento. Você anexa seu edital, informa o cronograma de aulas do curso preparatório, informa quantas horas e quais dias você vai estudar e gera automaticamente seu cronograma de estudos e planejamento'},
 {icon:ListChecks,title:'Edital Verticalizado',desc:'Aprenda a gerar automaticamente seu edital verticalizado com marcações para você acompanhar seu progresso.'},
 {icon:Target,title:'Estatísticas de Progresso',desc:'Estatísticas para você acompanhar seu progresso.'},
 {icon:Brain,title:'Flashcards e Revisão Espaçada',desc:'Aprenda a criar flashcards para revisão espaçada e memorização avançada da matéria e transforme sua mente em uma máquina de memorização.'},
 {icon:BarChart3,title:'Raio-X da Banca e Análise Estatística do Que Cai na Prova',desc:'Preveja a incidência real de cada tema e assunto na prova, com base nas estatísticas das provas anteriores'},
];
export const modules = [
 ['Mentalidade do Aprovado','Construa a base mental que separa quem passa de quem desiste.'],
 ['Como Organizar seus Estudos','Estruture seu material, seu tempo e seu ambiente de estudos.'],
 ['Ciclo de Estudos Policial','O ciclo otimizado para concursos da área policial.'],
 ['Revisões Inteligentes','Sistema de revisões espaçadas que fixam o conteúdo de verdade.'],
 ['Lei Seca Estratégica','Como ler e absorver a letra da lei sem se perder.'],
 ['Resolução de Questões','Técnica para resolver questões e aprender com cada erro.'],
 ['Controle de Desempenho','Métricas claras para saber exatamente onde melhorar.'],
 ['Planejamento Individual','Monte seu plano de estudos personalizado.'],
 ['Técnicas de Memorização','Memorize conteúdo extenso usando gatilhos comprovados.'],
 ['Estratégias de Reta Final','O que fazer nos últimos 30 dias antes da prova.'],
];
export const problems = ['Dificuldade para focar em uma área ou um cargo','Estuda sem foco e sem saber se esta estudando correto','Medo de estar perdendo tempo','Incertezas de não saber se vai passar','Não sabe revisar e acaba esquecendo a matéria','Não sabe como resolver questões e simulados'];
// Testimonials reproduced from the user-selected source, not independently verified.
// Fotos realistas (banco de imagens) usadas apenas como ilustração dos perfis.
export type Testimonial = {
  name: string;
  initial: string;
  avatar: string;
  role: string;
  time: string;
  messages: string[];
};

export const testimonials: Testimonial[] = [
 {name:'Lucas A.',initial:'L',avatar:'/uploads/aluno-lucas.jpg',role:'Aprovado — Polícia Federal',time:'09:42',messages:['Professor, passei!! 🎉','Em 7 meses seguindo o método à risca consegui minha aprovação na Polícia Federal.','Eu estava completamente perdido antes. Muito obrigado, mudou minha vida 🙏']},
 {name:'Mariana S.',initial:'M',avatar:'/uploads/aluna-mariana.jpg',role:'Aprovada — Polícia Civil',time:'14:18',messages:['Não acredito que finalmente aconteceu 😭','O cronograma e o filtro do QConcursos foram um divisor de águas pra mim.','Aprovada na Polícia Civil! Obrigada por tudo ❤️']},
 {name:'Rafael M.',initial:'R',avatar:'/uploads/aluno-rafael.jpg',role:'Aprovado — PRF',time:'21:05',messages:['Boa noite! Só passando pra dar a notícia 👮','Conciliava trabalho e estudo e achava impossível. O método encaixou na minha rotina.','Aprovado na PRF 🚔🔥']},
 {name:'Juliana P.',initial:'J',avatar:'/uploads/aluna-juliana.jpg',role:'Aprovada — Polícia Federal',time:'08:12',messages:['Bom dia, professor! 🙏','Fiz o edital verticalizado exatamente como você ensinou e foi o que virou o jogo pra mim.','Aprovada na PF na primeira tentativa depois de 2 reprovações ❤️']},
 {name:'Diego F.',initial:'D',avatar:'/uploads/aluno-diego.jpg',role:'Aprovado — Polícia Penal',time:'23:47',messages:['Passando aqui antes de dormir 🎯','As revisões espaçadas e os flashcards me fizeram lembrar de coisas que eu achava impossível.','Aprovado na Polícia Penal! Se eu consegui, você também consegue 💪']},
 {name:'Carla M.',initial:'C',avatar:'/uploads/aluna-carla.jpg',role:'Aprovada — Polícia Civil',time:'17:33',messages:['Gente, saiu o resultado!! 😭😭','Estudava 2h por dia depois do trabalho e o cronograma automático me mostrou que era possível.','Nome na lista da Polícia Civil. Obrigada, professor! 🚓']},
];
// Seção "Não é mentoria": pergunta do aluno e resposta do professor.
export const mentorship = {
  question: 'Prof. é uma mentoria?',
  answerLead: 'Não! É um curso em vídeo aulas em que eu ensino passo a passo o método que me fez passar 3x na Polícia Federal, 4x para Delegado de Polícia e 1x na ABIN. O aluno vai aprender:',
  features: [
    {icon:Calendar,title:'Como criar Cronograma e Planejamento Automáticos',desc:''},
    {icon:ListChecks,title:'Como gerar o Edital Verticalizado',desc:'com estatísticas para você acompanhar seu progresso.'},
    {icon:Target,title:'Terá acesso a Estatísticas de Progresso',desc:'Estatísticas para você acompanhar seu progresso.'},
    {icon:Brain,title:'Aprenderá como criar Flashcards e Revisão Espaçada',desc:''},
  ],
};
// Lista da oferta, mantida explicitamente: continua com os itens pedidos antes,
// mesmo após "Diário de Estudos" e "Questões sobre a Lei Seca" saírem das seções da página,
// e agora inclui o "Raio-X da banca" com análise estatística do que cai na prova.
export const included = ['Curso Completo em Vídeo Aulas','Cronograma e Planejamento Automáticos','Edital Verticalizado','Estatísticas de Progresso','Diário de Estudos','Questões sobre a Lei Seca','Flashcards e Revisão Espaçada','Raio-X da Banca e Análise Estatística do Que Cai na Prova'];

export const courseScope = { publicExams: true, oab: true };
export const faqs = [
  { question: 'É para concurseiros ou estudantes de qual área?', answer: 'O Estudei pode ser usado por qualquer estudante. Ele é 100% personalizável. Você pode tanto usar editais e assuntos já registrados como criar planos de estudos completamente novos e de acordo com as suas necessidades.' },
  { question: 'O curso é uma mentoria?', answer: 'Não. É um curso em vídeo aulas em que o professor ensina passo a passo o método que utilizou para passar 3x na Polícia Federal, 4x para Delegado de Polícia e 1x na ABIN.' },
  { question: 'O que vou aprender sobre planejamento de estudos?', answer: 'Você vai aprender a gerar automaticamente seu cronograma e planejamento a partir do edital, do cronograma de aulas do preparatório e das horas e dias disponíveis para estudar.' },
  { question: 'Como vou acompanhar meu progresso?', answer: 'Você vai aprender a gerar seu edital verticalizado com marcações e terá acesso a estatísticas para acompanhar seu progresso nos estudos.' },
  { question: 'O curso ensina técnicas de revisão e memorização?', answer: 'Sim. Você aprenderá a criar flashcards para revisão espaçada e memorização avançada da matéria.' },
  { question: 'Qual a diferença entre os planos mensal e anual?', answer: `Os dois planos incluem os mesmos itens da oferta. A assinatura mensal custa R$ ${offer.monthly.toFixed(2).replace('.', ',')} por mês. A assinatura anual custa ${offer.annualInstallments}x de R$ ${offer.annualInstallment.toFixed(2).replace('.', ',')} e oferece 12 meses de acesso. O acesso ao curso e aos sistemas permanece durante a assinatura.` },
  { question: 'O curso tem garantia?', answer: `Sim. A garantia é de ${offer.guaranteeDays} dias.` },
  { question: 'Como começo ou tiro outras dúvidas?', answer: 'Clique em “Quero ser aprovado” para criar sua conta gratuita. Se tiver dúvidas antes de começar, entre em contato pelo WhatsApp disponível nesta página.' },
];
