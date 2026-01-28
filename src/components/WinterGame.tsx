import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const WinterGame = () => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [clickedIds, setClickedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const newSnowflake = {
        id: Date.now(),
        x: Math.random() * 90,
        y: -10,
        size: 30 + Math.random() * 30,
      };
      setSnowflakes((prev) => [...prev, newSnowflake]);
    }, 800);

    return () => clearInterval(interval);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;

    const moveInterval = setInterval(() => {
      setSnowflakes((prev) =>
        prev
          .map((snowflake) => ({
            ...snowflake,
            y: snowflake.y + 2,
          }))
          .filter((snowflake) => snowflake.y < 100)
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setSnowflakes([]);
    setClickedIds(new Set());
  };

  const catchSnowflake = (id: number) => {
    if (clickedIds.has(id)) return;
    
    setClickedIds((prev) => new Set([...prev, id]));
    setScore((prev) => prev + 10);
    setSnowflakes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
      <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40">
          <Icon name="Gamepad2" size={32} className="text-white" />
        </div>
        <CardTitle className="text-3xl mb-2">Ловим снежинки!</CardTitle>
        <p className="text-muted-foreground">Кликай на снежинки и зарабатывай очки</p>
      </CardHeader>

      <CardContent className="p-6">
        {!gameActive && timeLeft === 30 ? (
          <div
            className="relative text-center space-y-6 py-12 rounded-xl overflow-hidden"
            style={{
              backgroundImage: 'url(https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/bucket/dd9153f5-53a5-44a3-817b-5eb1e9cc0124.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '400px',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 backdrop-blur-sm" />
            
            <div className="relative z-10 space-y-6">
              <Icon name="Snowflake" size={80} className="text-yellow-400 mx-auto animate-spin drop-shadow-2xl" style={{ animationDuration: '10s' }} />
              <p className="text-xl text-white font-medium drop-shadow-lg px-4">
                Нажми на кнопку, чтобы начать игру.<br />
                У тебя будет 30 секунд, чтобы поймать как можно больше снежинок!
              </p>
            </div>
            
            <div className="relative z-10">
              <Button
                size="lg"
                onClick={startGame}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-xl shadow-yellow-500/40 border-2 border-yellow-300 text-lg px-8 py-6"
              >
                <Icon name="Play" size={24} className="mr-2" />
                Начать игру
              </Button>
            </div>
          </div>
        ) : gameActive ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl">
              <div className="flex items-center gap-3">
                <Icon name="Trophy" size={24} className="text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Очки</div>
                  <div className="text-2xl font-bold text-primary">{score}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Timer" size={24} className="text-secondary" />
                <div>
                  <div className="text-sm text-muted-foreground">Время</div>
                  <div className="text-2xl font-bold text-secondary">{timeLeft}с</div>
                </div>
              </div>
            </div>

            <div
              className="relative w-full h-96 bg-gradient-to-b from-sky-100 to-sky-50 rounded-xl border-2 border-primary/20 overflow-hidden"
              style={{ cursor: 'crosshair' }}
            >
              {snowflakes.map((snowflake) => (
                <button
                  key={snowflake.id}
                  onClick={() => catchSnowflake(snowflake.id)}
                  className="absolute transition-all hover:scale-125 active:scale-90"
                  style={{
                    left: `${snowflake.x}%`,
                    top: `${snowflake.y}%`,
                    fontSize: `${snowflake.size}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Icon name="Snowflake" size={snowflake.size} className="text-primary/70 hover:text-primary animate-spin" style={{ animationDuration: '3s' }} />
                </button>
              ))}

              {snowflakes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <Icon name="Wind" size={48} className="opacity-30" />
                </div>
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground">
              💡 Совет: кликай быстро, снежинки падают всё быстрее!
            </p>
          </div>
        ) : (
          <div
            className="relative text-center space-y-6 py-8 rounded-xl overflow-hidden"
            style={{
              backgroundImage: 'url(https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/bucket/125585aa-b27c-4481-8d25-dfe6fca08c4e.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '400px',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 backdrop-blur-sm" />
            
            <div className="relative z-10 space-y-4">
              <Icon name="Award" size={64} className="text-yellow-400 mx-auto drop-shadow-lg" />
              <div>
                <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">Игра окончена!</h3>
                <p className="text-5xl font-bold text-yellow-400 mb-2 drop-shadow-lg">{score} очков</p>
                <p className="text-white/90 text-lg drop-shadow-md">
                  {score >= 200 ? '🏆 Невероятный результат!' : score >= 100 ? '🎯 Отличная работа!' : '❄️ Попробуй ещё раз!'}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={startGame}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold shadow-xl shadow-yellow-500/40 border-2 border-yellow-300"
              >
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Играть снова
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WinterGame;