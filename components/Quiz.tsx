import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberButton } from "./ui/CyberButton";
import { Check, ChevronRight, RefreshCw } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Qual é o seu setor de atuação?",
    options: ["Eventos / Feiras", "Varejo / Shopping", "Imobiliária", "Outro"]
  },
  {
    id: 2,
    question: "Qual seu principal objetivo?",
    options: ["Capturar Leads", "Aumentar Vendas", "Engajamento de Marca", "Educação"]
  },
  {
    id: 3,
    question: "Qual o prazo para lançamento?",
    options: ["Urgente (< 15 dias)", "Curto Prazo (1 mês)", "Médio Prazo (3 meses+)", "Indefinido"]
  }
];

export function Quiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    // Simple logic for recommendation
    const deadline = finalAnswers[2];
    
    if (deadline.includes("Urgente")) {
      setResult("Plano A: Sprint (Ideal para prazos curtos)");
    } else if (deadline.includes("Médio")) {
      setResult("Plano B: Campanha Premium (Ideal para planejamento)");
    } else {
      setResult("Plano C: LiveOps (Ideal para recorrência)");
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  if (!isOpen) {
    return (
      <div className="py-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/60 backdrop-blur border border-primary/30 p-8 rounded-2xl text-center max-w-2xl mx-4 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h3 className="text-2xl font-bold text-white mb-4">Não sabe por onde começar?</h3>
          <p className="text-muted-foreground mb-6">
            Responda 3 perguntas rápidas e descubra o plano ideal para sua estratégia.
          </p>
          <CyberButton onClick={() => setIsOpen(true)}>
            Iniciar Quiz <ChevronRight className="ml-2 w-4 h-4" />
          </CyberButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card/90 backdrop-blur-xl border border-primary/50 p-8 rounded-2xl w-full max-w-2xl mx-4 shadow-2xl relative"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white"
        >
          ✕
        </button>

        {!result ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                <span>Questão {currentStep + 1} de {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  {QUESTIONS[currentStep].question}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {QUESTIONS[currentStep].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="text-left p-4 rounded-lg border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all text-white/90 hover:text-white"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Check size={32} />
            </div>
            
            <h3 className="text-xl text-muted-foreground mb-2">Recomendação para você:</h3>
            <h2 className="text-3xl font-bold text-white mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
              {result}
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CyberButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Solicitar Proposta
              </CyberButton>
              <button 
                onClick={resetQuiz}
                className="flex items-center justify-center gap-2 text-muted-foreground hover:text-white transition-colors py-2"
              >
                <RefreshCw size={16} /> Refazer Quiz
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
