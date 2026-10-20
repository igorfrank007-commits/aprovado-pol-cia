import { BookOpen, Target, Calendar, ListChecks, Brain, Headphones, MessageCircle, Trophy } from 'lucide-react';
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
export const testimonials = [
 {name:'Lucas A.',initial:'L',time:'09:42',messages:['Professor, passei!! 🎉','Em 7 meses seguindo o método à risca consegui minha aprovação na Polícia Federal.','Eu estava completamente perdido antes. Muito obrigado, mudou minha vida 🙏']},
 {name:'Mariana S.',initial:'M',time:'14:18',messages:['Não acredito que finalmente aconteceu 😭','O cronograma e o filtro do QConcursos foram um divisor de águas pra mim.','Aprovada na Polícia Civil! Obrigada por tudo ❤️']},
 {name:'Rafael M.',initial:'R',time:'21:05',messages:['Boa noite! Só passando pra dar a notícia 👮','Conciliava trabalho e estudo e achava impossível. O método encaixou na minha rotina.','Aprovado na PRF 🚔🔥']},
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
  { question: 'O curso é só para carreiras policiais?', answer: courseScope.publicExams && courseScope.oab ? 'Não. O método aplica-se a qualquer concurso público e exame da OAB' : 'Consulte pelo WhatsApp os concursos e exames atendidos pelo método.' },
  { question: 'O curso é uma mentoria?', answer: 'Não. É um curso em vídeo aulas em que o professor ensina passo a passo o método que utilizou para passar 3x na Polícia Federal, 4x para Delegado de Polícia e 1x na ABIN.' },
  { question: 'O que vou aprender sobre planejamento de estudos?', answer: 'Você vai aprender a gerar automaticamente seu cronograma e planejamento a partir do edital, do cronograma de aulas do preparatório e das horas e dias disponíveis para estudar.' },
  { question: 'Como vou acompanhar meu progresso?', answer: 'Você vai aprender a gerar seu edital verticalizado com marcações e terá acesso a estatísticas para acompanhar seu progresso nos estudos.' },
  { question: 'O curso ensina técnicas de revisão e memorização?', answer: 'Sim. Você aprenderá a criar flashcards para revisão espaçada e memorização avançada da matéria.' },
  { question: 'Qual a diferença entre os planos mensal e anual?', answer: `Os dois planos incluem os mesmos itens da oferta. A assinatura mensal custa R$ ${offer.monthly.toFixed(2).replace('.', ',')} por mês. A assinatura anual custa ${offer.annualInstallments}x de R$ ${offer.annualInstallment.toFixed(2).replace('.', ',')} e oferece 12 meses de acesso. O acesso ao curso e aos sistemas permanece durante a assinatura.` },
  { question: 'O curso tem garantia?', answer: `Sim. A garantia é de ${offer.guaranteeDays} dias.` },
  { question: 'Como começo ou tiro outras dúvidas?', answer: 'Clique em “Quero ser aprovado” para criar sua conta gratuita. Se tiver dúvidas antes de começar, entre em contato pelo WhatsApp disponível nesta página.' },
];
