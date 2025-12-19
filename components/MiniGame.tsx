import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberButton } from "./ui/CyberButton";
import { X, Target, Zap, Trophy, RefreshCw, Share2, Send, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsappShareButton, TwitterShareButton, WhatsappIcon, TwitterIcon } from "react-share";
import { toast } from "sonner";
// Removed tRPC import

interface Node {
  id: number;
  x: number;
  y: number;
  type: "normal" | "bonus" | "danger";
}

export function MiniGame({ onClose }: { onClose: () => void }) {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [combo, setCombo] = useState(0);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const spawnerRef = useRef<NodeJS.Timeout | null>(null);

  // Real Leaderboard Data from backend
  const [topScores, setTopScores] = useState<Array<{name: string; score: number}>>([]);
  
  // Fetch leaderboard on mount
  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => setTopScores(data.leaderboard || []))
      .catch(err => console.error('Failed to fetch leaderboard:', err));
  }, []);

  const leaderboard = [
    ...(topScores || []).map(s => ({ name: s.name || "Anônimo", score: s.score })),
    { name: "VOCÊ", score: score },
  ].sort((a, b) => b.score - a.score).slice(0, 10);

  // Game Loop
  useEffect(() => {
    if (gameState === "playing") {
      // Timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Spawner
      spawnerRef.current = setInterval(() => {
        spawnNode();
      }, 800);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (spawnerRef.current) clearInterval(spawnerRef.current);
      };
    }
  }, [gameState]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(30);
    setNodes([]);
    setCombo(0);
    setLeadSubmitted(false);
    setLeadEmail("");
    setLeadName("");
    spawnNode(); // Spawn first node immediately
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadName || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // Submit to leaderboard
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: leadEmail,
          name: leadName,
          score: score,
        }),
      });
      
      // Create lead
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: leadEmail,
          source: "game",
          score: score,
        }),
      });
      
      setLeadSubmitted(true);
      toast.success("Pontuação salva com sucesso!");
    } catch (error) {
      console.error("Failed to submit score:", error);
      toast.error("Erro ao salvar pontuação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const endGame = () => {
    setGameState("gameover");
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnerRef.current) clearInterval(spawnerRef.current);
  };

  const spawnNode = () => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const padding = 60;
    const x = Math.random() * (width - padding * 2) + padding;
    const y = Math.random() * (height - padding * 2) + padding;
    
    const typeRoll = Math.random();
    let type: "normal" | "bonus" | "danger" = "normal";
    if (typeRoll > 0.9) type = "bonus";
    else if (typeRoll > 0.8) type = "danger";

    const newNode: Node = {
      id: Date.now(),
      x,
      y,
      type
    };

    setNodes((prev) => [...prev, newNode]);

    // Auto remove after delay
    setTimeout(() => {
      setNodes((prev) => prev.filter((n) => n.id !== newNode.id));
    }, 2000);
  };

  const handleNodeClick = (node: Node) => {
    if (node.type === "danger") {
      setScore((prev) => Math.max(0, prev - 500));
      setCombo(0);
      // Shake effect or visual feedback could be added here
    } else {
      const points = node.type === "bonus" ? 500 : 100;
      const comboMultiplier = 1 + (combo * 0.1);
      setScore((prev) => Math.round(prev + (points * comboMultiplier)));
      setCombo((prev) => prev + 1);
    }
    
    setNodes((prev) => prev.filter((n) => n.id !== node.id));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl h-[80vh] md:aspect-video md:h-auto bg-black border border-primary/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,106,0,0.2)] flex flex-col">
        
        {/* Header / HUD */}
        <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start z-20 pointer-events-none">
          <div>
            <div className="text-xs text-primary font-mono uppercase tracking-widest mb-1">Neural Link Status</div>
            <div className="text-2xl md:text-4xl font-display font-bold text-white tabular-nums">
              {score.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">PTS</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
             <div className="text-xs text-primary font-mono uppercase tracking-widest mb-1">Time Remaining</div>
             <div className={cn("text-2xl md:text-4xl font-display font-bold tabular-nums", timeLeft < 10 ? "text-red-500 animate-pulse" : "text-white")}>
               00:{timeLeft.toString().padStart(2, '0')}
             </div>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-muted-foreground hover:text-white bg-black/50 p-2 rounded-full hover:bg-primary/20 transition-all"
        >
          <X size={24} />
        </button>

        {/* Game Area */}
        <div ref={containerRef} className="relative flex-grow cursor-crosshair overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,106,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,106,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
          
          {/* Start Screen */}
          {gameState === "start" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30">
              <Target className="w-20 h-20 text-primary mb-6 animate-pulse" />
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2 text-center">NEURAL LINK CALIBRATION</h2>
              <p className="text-muted-foreground mb-8 max-w-md text-center">
                Clique nos nós de dados para calibrar o sistema. Evite os nós vermelhos instáveis.
                <br />
                <span className="text-primary text-sm mt-2 block">Nós Laranjas: +100pts | Nós Azuis: +500pts | Nós Vermelhos: -500pts</span>
              </p>
              <CyberButton size="lg" onClick={startGame}>
                INICIAR CALIBRAÇÃO
              </CyberButton>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === "gameover" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-30 p-4 overflow-y-auto">
              <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Left Column: Score & Actions */}
                <div className="flex flex-col items-center text-center">
                  <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                  <h2 className="text-2xl font-display font-bold text-white mb-1">CALIBRAÇÃO COMPLETA</h2>
                  <div className="text-5xl font-bold text-primary mb-2 tabular-nums">{score.toLocaleString()}</div>
                  <p className="text-muted-foreground mb-6">Pontuação Final</p>
                  
                  {/* Social Share */}
                  <div className="flex gap-4 mb-8">
                    <WhatsappShareButton url={window.location.href} title={`Fiz ${score} pontos no Neural Link da Lumina Studios! Consegue me superar?`}>
                      <div className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full transition-colors cursor-pointer font-bold text-sm">
                        <WhatsappIcon size={20} round /> Compartilhar
                      </div>
                    </WhatsappShareButton>
                    <TwitterShareButton url={window.location.href} title={`Fiz ${score} pontos no Neural Link da Lumina Studios! 🚀 #LuminaStudios #Advergames`}>
                      <div className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white px-4 py-2 rounded-full transition-colors cursor-pointer font-bold text-sm">
                        <TwitterIcon size={20} round /> Tweetar
                      </div>
                    </TwitterShareButton>
                  </div>

                  <div className="flex gap-3 w-full">
                    <CyberButton onClick={startGame} variant="outline" className="flex-1">
                      <RefreshCw className="mr-2 w-4 h-4" /> Replay
                    </CyberButton>
                    <CyberButton onClick={onClose} className="flex-1">
                      Fechar
                    </CyberButton>
                  </div>
                </div>

                {/* Right Column: Leaderboard & Lead Gen */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 w-full">
                  
                  {/* Lead Capture Form */}
                  {!leadSubmitted ? (
                    <div className="mb-6 pb-6 border-b border-white/10">
                      <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                        <Medal className="text-primary w-4 h-4" /> Salvar no Ranking
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Digite seu nome e e-mail para registrar sua pontuação e receber novidades.
                      </p>
                      <form onSubmit={handleLeadSubmit} className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="Seu nome"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                        />
                        <div className="flex gap-2">
                          <input 
                            type="email" 
                            placeholder="seu@email.com"
                            required
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            className="flex-1 bg-black/50 border border-white/20 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none"
                          />
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="bg-primary text-black p-2 rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <RefreshCw size={16} className="animate-spin" />
                            ) : (
                              <Send size={16} />
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="mb-6 pb-6 border-b border-white/10 text-center">
                      <div className="text-green-500 font-bold mb-1">Pontuação Salva!</div>
                      <p className="text-xs text-muted-foreground">Você receberá um e-mail com seu ranking em breve.</p>
                    </div>
                  )}

                  {/* Mini Leaderboard */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Top Players Global</h3>
                    <div className="space-y-2">
                      {leaderboard.slice(0, 4).map((player, index) => (
                        <div key={index} className={cn(
                          "flex justify-between items-center p-2 rounded text-sm",
                          player.name === "VOCÊ" ? "bg-primary/20 border border-primary/30" : "bg-black/30"
                        )}>
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold",
                              index === 0 ? "bg-yellow-500 text-black" : 
                              index === 1 ? "bg-gray-400 text-black" :
                              index === 2 ? "bg-orange-700 text-white" : "bg-white/10 text-white"
                            )}>
                              {index + 1}
                            </span>
                            <span className={player.name === "VOCÊ" ? "text-primary font-bold" : "text-white"}>
                              {player.name}
                            </span>
                          </div>
                          <span className="font-mono text-white/70">{player.score.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map((node) => (
              <motion.button
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className={cn(
                  "absolute w-16 h-16 -ml-8 -mt-8 rounded-full flex items-center justify-center border-2 shadow-[0_0_20px_currentColor] transition-transform active:scale-90",
                  node.type === "normal" && "border-primary text-primary bg-primary/10",
                  node.type === "bonus" && "border-cyan-400 text-cyan-400 bg-cyan-400/10",
                  node.type === "danger" && "border-red-500 text-red-500 bg-red-500/10"
                )}
                style={{ left: node.x, top: node.y }}
                onClick={() => handleNodeClick(node)}
              >
                {node.type === "normal" && <Target size={24} />}
                {node.type === "bonus" && <Zap size={24} />}
                {node.type === "danger" && <X size={24} />}
                
                {/* Ring Animation */}
                <div className="absolute inset-0 rounded-full border border-current animate-ping opacity-50" />
              </motion.button>
            ))}
          </AnimatePresence>
          
          {/* Combo Indicator */}
          {combo > 1 && (
            <div className="absolute bottom-8 left-8 text-2xl font-bold text-primary/50 font-mono pointer-events-none">
              COMBO x{combo}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
