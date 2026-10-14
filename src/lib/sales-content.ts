import { BookOpen, Target, Calendar, ListChecks, Brain, Headphones, MessageCircle, Trophy } from 'lucide-react';
// Destination of every "Quero ser aprovado" button: the Study Planner Pro auth page.
export const checkoutUrl = 'https://operacaoestudei.lovable.app/auth?mode=signup';
// Segunda linha dos botões de compra ("Quero ser aprovado").
export const ctaSub = 'Criar conta gratuita';
export const whatsappUrl = 'https://wa.me/5555981205146';
export const offer = { monthly: 39.90, annualInstallments: 12, annualInstallment: 29.90, guaranteeDays: 7, supportDays: 30 };
export const benefits = [
 {icon:BookOpen,title:'Curso Completo em Vídeo Aulas',desc:'Curso completo em vídeo aulas em que eu mostro meu método passo a passo.'},
 {icon:Calendar,title:'Cronograma e Planejamento Automáticos',desc:'Sistema que gera automaticamente seu cronograma de estudos e planejamento. Você anexa seu edital, informa o cronograma de aulas do curso preparatório, informa quantas horas e quais dias você vai estudar e o sistema gera automaticamente seu cronograma de estudos e planejamento.'},
 {icon:ListChecks,title:'Edital Verticalizado',desc:'Sistema que gera automaticamente seu edital verticalizado com marcações para você acompanhar seu progresso.'},
 {icon:Target,title:'Estatísticas de Progresso',desc:'Estatísticas para você acompanhar seu progresso.'},
 {icon:Brain,title:'Flashcards e Revisão Espaçada',desc:'Sistema de criação de flashcards para revisão espaçada e memorização avançada da matéria.'},
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
  answerLead: 'Não! É um curso em vídeo aulas em que eu ensino passo a passo o método que me fez passar 3x na Polícia Federal, 4x para Delegado de Polícia e 1x na ABIN. E uma plataforma para o aluno gerar automaticamente:',
  features: [
    {icon:Calendar,title:'Cronograma e Planejamento Automáticos',desc:'Sistema que gera automaticamente seu cronograma de estudos e planejamento.'},
    {icon:ListChecks,title:'Edital Verticalizado',desc:'Sistema que gera automaticamente seu edital verticalizado com marcações para você acompanhar seu progresso.'},
    {icon:Target,title:'Estatísticas de Progresso',desc:'Estatísticas para você acompanhar seu progresso.'},
    {icon:Brain,title:'Flashcards e Revisão Espaçada',desc:'Sistema de criação de flashcards para revisão espaçada e memorização avançada da matéria.'},
  ],
};
// Lista da oferta, mantida explicitamente: continua com os sete itens pedidos antes,
// mesmo após "Diário de Estudos" e "Questões sobre a Lei Seca" saírem das seções da página.
export const included = ['Curso Completo em Vídeo Aulas','Cronograma e Planejamento Automáticos','Edital Verticalizado','Estatísticas de Progresso','Diário de Estudos','Questões sobre a Lei Seca','Flashcards e Revisão Espaçada'];
