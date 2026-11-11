import { BookOpen, Target, Calendar, ListChecks, Scale, BarChart3 } from 'lucide-react';
// Todos os botões levam ao cadastro gratuito do Lei Seca em Questões. O anual é o padrão (plano em destaque).
export const lawSecaSignupUrl = 'https://lei-seca-em-questoes.netlify.app/#/entrar?aba=cadastrar';
export const checkoutUrl = lawSecaSignupUrl;
export const monthlyCheckoutUrl = lawSecaSignupUrl;
export const signupUrl = lawSecaSignupUrl;
// Segunda linha dos botões de compra ("Quero ser aprovado").
export const ctaSub = 'Plano anual · 12x de R$ 19,80';
export const monthlyCtaSub = 'Plano mensal · R$ 29,90';
export const whatsappUrl = 'https://wa.me/5555981205146';
// Preços do Lei Seca em Questões (conferidos em src/acesso.ts do site).
export const offer = { monthly: 29.90, annualInstallments: 12, annualInstallment: 19.80, annualTotal: 237.60, guaranteeDays: 7 };

// Ferramentas do Lei Seca em Questões, na ordem da página.
export const benefits = [
 {icon:Scale,title:'Vade Mecum de Questões da Lei Seca',desc:'Resolva questões de certo ou errado artigo por artigo. Cada gabarito vem com o trecho da lei que o fundamenta, e você pode ler a lei completa.'},
 {icon:BookOpen,title:'2,7 milhões de questões de concursos',desc:'Provas de mais de 500 bancas, de todas as matérias: Português, Matemática, Raciocínio Lógico, Informática e Direito. Filtre por disciplina, banca, cargo, órgão, ano e dificuldade, e veja o gabarito oficial e um comentário depois de responder.'},
 {icon:Calendar,title:'Cronograma individual',desc:'Informe o concurso, os dias e as horas que você vai estudar. O site monta o cronograma com revisões de 24 horas, revisão semanal e simulados a cada 14 dias, e um cronômetro registra o tempo de cada sessão.'},
 {icon:ListChecks,title:'Edital verticalizado',desc:'Cada tópico do seu edital com as cinco etapas de estudo e o avanço por matéria. Envie o PDF do edital para a leitura por IA (assinantes) ou cadastre as matérias à mão.'},
 {icon:BarChart3,title:'Raio-X das provas',desc:'Veja quais assuntos a sua banca mais cobra, do mais ao menos cobrado, com os artigos de lei mais citados. Dá para baixar o relatório em PDF.'},
 {icon:Target,title:'Cadernos, anotações e estatísticas',desc:'Separe as questões que você errou em cadernos, escreva a sua observação em cada questão e acompanhe o seu desempenho por lei e por semana.'},
];
export const modules = [
 ['Vade Mecum da Lei Seca','Questões de certo ou errado artigo por artigo, com o trecho da lei que fundamenta o gabarito.'],
 ['Questões de concursos','Mais de 2,7 milhões de questões de provas, com gabarito oficial e filtros completos.'],
 ['Cronograma individual','Cronograma gerado a partir das suas horas e dias de estudo, com cronômetro.'],
 ['Edital verticalizado','Cada tópico do edital com as cinco etapas de estudo.'],
 ['Raio-X das provas','Os assuntos que a sua banca mais cobra, em PDF.'],
 ['Cadernos e estatísticas','Questões erradas separadas em cadernos e desempenho acompanhado.'],
];
export const problems = ['Não sabe por onde começar o edital','Estuda sem saber o que a banca mais cobra','Lê a lei seca e não consegue fixar o artigo','Não sabe quando revisar','Não sabe se está evoluindo','Resolve questões de várias fontes e perde o controle'];
// Depoimentos do Operação Estudei: não são usados no Lei Seca em Questões até haver depoimentos do próprio site.
export type Testimonial = {
  name: string;
  initial: string;
  avatar: string;
  role: string;
  time: string;
  messages: string[];
};
export const testimonials: Testimonial[] = [];
// Seção "Isso é um curso em vídeo?": resposta sobre o formato do produto.
export const mentorship = {
  question: 'Isso é um curso em vídeo?',
  answerLead: 'Não. É um site de estudo. Você resolve questões, monta o seu cronograma e acompanha o seu edital no navegador, no seu ritmo. O que você vai usar:',
  features: [
    {icon:Scale,title:'Vade Mecum de Questões da Lei Seca',desc:'treino artigo por artigo, com o trecho da lei que fundamenta o gabarito.'},
    {icon:Calendar,title:'Cronograma individual',desc:'gerado a partir das suas horas e dias de estudo, com cronômetro para cada sessão.'},
    {icon:ListChecks,title:'Edital verticalizado',desc:'cada tópico com as cinco etapas de estudo e o avanço por matéria.'},
    {icon:BarChart3,title:'Raio-X das provas',desc:'os assuntos que a sua banca mais cobra, em PDF.'},
  ],
};
// Lista "O que está incluído" nos dois planos. O item que começa com "Raio-X" recebe o destaque.
export const included = [
  'Vade Mecum de Questões da Lei Seca',
  'Questões de concursos com gabarito oficial',
  'Cronograma individual com cronômetro',
  'Edital verticalizado',
  'Raio-X das provas (PDF)',
  'Legislação estratégica com comentário e mapa mental',
  'Cadernos, anotações e estatísticas',
  'Progresso salvo na sua conta',
];

export const courseScope = { publicExams: true, oab: false };
export const faqs = [
  { question: 'O que é o Lei Seca em Questões?', answer: 'É um site de estudo para concursos. Você treina a lei seca artigo por artigo, resolve questões de concursos de todas as matérias e organiza a preparação com cronograma e edital verticalizado.' },
  { question: 'Isso é um curso em vídeo?', answer: 'Não. É um site de questões e planejamento. Não há aulas gravadas: você estuda no seu ritmo, no navegador ou no celular.' },
  { question: 'O que eu consigo fazer de graça?', answer: 'Na conta grátis você resolve até 10 questões novas de lei seca por dia, lê a lei seca completa e tem o seu progresso salvo na conta.' },
  { question: 'Qual a diferença entre o plano mensal e o anual?', answer: `Os dois liberam o mesmo conteúdo. O mensal custa R$ ${offer.monthly.toFixed(2).replace('.', ',')} e é cobrado todo mês. O anual sai por ${offer.annualInstallments}x de R$ ${offer.annualInstallment.toFixed(2).replace('.', ',')}, o que soma R$ ${offer.annualTotal.toFixed(2).replace('.', ',')} por ano.` },
  { question: 'O curso tem garantia?', answer: `Sim. A garantia é de ${offer.guaranteeDays} dias. Se não for para você, peça o reembolso dentro desse prazo e o valor é devolvido integralmente.` },
  { question: 'Posso cancelar quando quiser?', answer: 'Sim. Você cancela a renovação pelo botão "Gerenciar assinatura" que a Kiwify envia no e-mail de confirmação do pagamento. O acesso continua até o fim do período já pago.' },
  { question: 'Como funciona o pagamento?', answer: 'O pagamento é feito pela Kiwify, com cartão, Pix ou boleto. Assim que o pagamento é aprovado, a sua conta é liberada automaticamente.' },
  { question: 'Como funciona o cronograma individual?', answer: 'Você informa o concurso, os dias e as horas que vai estudar. O site monta o cronograma com as matérias por peso, revisões de 24 horas, revisão semanal e mensal e simulados a cada 14 dias. Você pode baixar o cronograma em PDF.' },
  { question: 'Como funciona o edital verticalizado?', answer: 'Você cadastra as matérias e os tópicos à mão ou envia o edital em PDF, Word, imagem ou texto para a leitura por IA, que é exclusiva para assinantes. Depois marque as cinco etapas de cada tópico e acompanhe o avanço por matéria.' },
  { question: 'As questões de concursos são reais e atualizadas?', answer: 'Sim. São questões de provas aplicadas por mais de 500 bancas, como Cebraspe, FGV, FCC e Vunesp, com o gabarito oficial, incluindo provas de 2026. Você filtra por ano e pode treinar só com as mais recentes.' },
  { question: 'Como funciona o comentário das questões?', answer: 'Depois que você responde uma questão de concurso, aparecem o gabarito oficial da banca e um comentário curto explicando o porquê. O comentário é gerado por inteligência artificial a partir do gabarito oficial e pode conter imprecisões; o gabarito é sempre o da banca.' },
  { question: 'O Raio-X é uma previsão da prova?', answer: 'Não. É uma estatística das questões que já caíram: mostra onde a banca costuma colocar mais peso, para você priorizar o estudo. Ele analisa uma amostra de até 200 questões do filtro escolhido.' },
  { question: 'Funciona no celular?', answer: 'Sim. O site funciona no navegador do celular, do tablet e do computador, e o seu progresso acompanha a sua conta em todos eles.' },
];
