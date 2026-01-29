import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const WinterGame = () => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showCityMap, setShowCityMap] = useState(false);
  const [fightMode, setFightMode] = useState(false);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
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

  const startFight = () => {
    setFightMode(true);
    setPlayerHP(100);
    setEnemyHP(100);
    setBattleLog(['Бой начался!']);
  };

  const playerAttack = () => {
    if (playerAttacking || enemyHP <= 0 || playerHP <= 0) return;
    
    setPlayerAttacking(true);
    const damage = Math.floor(Math.random() * 20) + 10;
    setEnemyHP(prev => Math.max(0, prev - damage));
    setBattleLog(prev => [...prev, `⚔️ Ты нанёс ${damage} урона!`]);
    
    setTimeout(() => {
      setPlayerAttacking(false);
      if (enemyHP - damage > 0) {
        enemyAttackBack();
      }
    }, 500);
  };

  const enemyAttackBack = () => {
    setEnemyAttacking(true);
    const damage = Math.floor(Math.random() * 15) + 8;
    setPlayerHP(prev => Math.max(0, prev - damage));
    setBattleLog(prev => [...prev, `💀 Противник нанёс ${damage} урона!`]);
    
    setTimeout(() => setEnemyAttacking(false), 500);
  };

  const catchSnowflake = (id: number) => {
    if (clickedIds.has(id)) return;
    
    setClickedIds((prev) => new Set([...prev, id]));
    setScore((prev) => prev + 10);
    setSnowflakes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl overflow-hidden w-full">
      <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40">
          <Icon name="Gamepad2" size={32} className="text-white" />
        </div>
        <CardTitle className="text-3xl mb-2">Ловим снежинки!</CardTitle>
        <p className="text-muted-foreground">Кликай на снежинки и зарабатывай очки</p>
      </CardHeader>

      <CardContent className="p-6">
        {!showMap && !gameActive && timeLeft === 30 ? (
          <div className="space-y-4">
            <div
              className="relative rounded-xl overflow-hidden mx-auto group"
              style={{
                backgroundImage: 'url(https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/bucket/dc4e28a8-04c4-4add-962f-549eddc8150f.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '500px',
                perspective: '1000px',
              }}
            >
              <div 
                className="absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:scale-105"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(0deg)',
                }}
              >
                <img
                  src="https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/bucket/632c26b7-81bb-42db-87df-1ed3246f1abc.png"
                  alt="Character"
                  className="h-[85%] object-contain drop-shadow-2xl transition-all duration-500 group-hover:translate-y-[-10px]"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                    transform: 'translateZ(50px)',
                  }}
                />
              </div>
            </div>
            
            <div className="text-center space-y-6 py-4">
              <Button
                size="lg"
                onClick={() => setShowMap(true)}
                className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-400 text-black font-bold shadow-2xl shadow-yellow-500/50 border-2 border-yellow-300 px-12 py-6 text-xl transition-all duration-300 hover:scale-110"
              >
                <Icon name="Play" size={24} className="mr-2" />
                Начать
              </Button>
            </div>
          </div>
        ) : showMap && !showCityMap && !gameActive ? (
          <div className="space-y-4">
            <Button
              onClick={() => setShowMap(false)}
              variant="outline"
              className="border-2 mb-4"
              size="lg"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            
            <div
              className="relative rounded-xl overflow-hidden mx-auto"
              style={{
                backgroundImage: 'url(https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/files/6178d06f-fd0d-44df-84ea-77414b3f9025.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '600px',
              }}
            >
              {/* Первый круг - центр */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative group cursor-pointer" onClick={() => setShowCityMap(true)}>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 flex items-center justify-center shadow-2xl border-4 border-yellow-600 transition-all duration-300 hover:scale-110 animate-pulse">
                    <img
                      src="https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/bucket/632c26b7-81bb-42db-87df-1ed3246f1abc.png"
                      alt="Character"
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold animate-bounce">
                    !
                  </div>
                </div>
              </div>

              {/* Второй круг - справа вверху */}
              <div className="absolute top-1/4 right-1/4">
                <div className="relative group cursor-pointer" onClick={() => setShowCityMap(true)}>
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 via-purple-300 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-purple-600 transition-all duration-300 hover:scale-110 animate-pulse" style={{ animationDuration: '2.5s' }}>
                    <img
                      src="https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/bucket/e749d721-b83b-47e4-9326-7e832ade1259.png"
                      alt="Character 2"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold animate-bounce">
                    2
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Выбери город на карте, чтобы начать своё путешествие!
              </p>
            </div>
          </div>
        ) : showCityMap && !gameActive ? (
          <div className="space-y-4">
            <Button
              onClick={() => setShowCityMap(false)}
              variant="outline"
              className="border-2 mb-4"
              size="lg"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад к карте
            </Button>

            <div
              className="relative rounded-xl overflow-hidden mx-auto"
              style={{
                backgroundImage: 'url(https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/bucket/66181963-522e-4d18-9427-a9c7079daf83.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '600px',
              }}
            >
              {/* Тень игрока (слева) - управляемая */}
              <div className={`absolute bottom-4 left-12 transition-all duration-300 ${playerAttacking ? 'translate-x-8 scale-110' : ''}`}>
                <div className="relative">
                  {/* Силуэт тени с эффектом дыма */}
                  <div className="relative w-32 h-48">
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-blue-950/90 to-transparent opacity-95 transition-all ${playerAttacking ? 'shadow-2xl shadow-cyan-500' : ''}`}
                         style={{ 
                           clipPath: 'polygon(30% 0%, 70% 0%, 85% 40%, 90% 100%, 10% 100%, 15% 40%)',
                           filter: 'blur(3px) drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))'
                         }}>
                    </div>
                    {/* Глаза */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                      <div className={`w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/80 ${playerAttacking ? 'scale-150' : ''}`}></div>
                      <div className={`w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-400/80 ${playerAttacking ? 'scale-150' : ''}`}></div>
                    </div>
                    {/* Аура */}
                    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
                    {playerAttacking && (
                      <div className="absolute top-1/2 -right-8 text-4xl animate-ping">⚔️</div>
                    )}
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-xs text-white font-bold shadow-lg border border-cyan-300">
                    ⚔️ ИГРОК
                  </div>
                </div>
              </div>

              {/* Тень противника (справа) - AI */}
              <div className={`absolute bottom-4 right-12 transition-all duration-300 ${enemyAttacking ? '-translate-x-8 scale-110' : ''}`}>
                <div className="relative">
                  {/* Силуэт тени с эффектом огня */}
                  <div className="relative w-32 h-48">
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-red-950/90 to-transparent opacity-95 transition-all ${enemyAttacking ? 'shadow-2xl shadow-red-500' : ''}`}
                         style={{ 
                           clipPath: 'polygon(25% 0%, 75% 0%, 90% 35%, 95% 100%, 5% 100%, 10% 35%)',
                           filter: 'blur(3px) drop-shadow(0 0 20px rgba(239, 68, 68, 0.7))'
                         }}>
                    </div>
                    {/* Глаза */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                      <div className={`w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/80 ${enemyAttacking ? 'scale-150' : ''}`} style={{ animationDuration: '1s' }}></div>
                      <div className={`w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/80 ${enemyAttacking ? 'scale-150' : ''}`} style={{ animationDuration: '1s' }}></div>
                    </div>
                    {/* Рога */}
                    <div className="absolute -top-2 left-4 w-4 h-6 bg-red-900 opacity-80" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                    <div className="absolute -top-2 right-4 w-4 h-6 bg-red-900 opacity-80" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                    {/* Аура */}
                    <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '1.2s' }}></div>
                    {enemyAttacking && (
                      <div className="absolute top-1/2 -left-8 text-4xl animate-ping">💥</div>
                    )}
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full text-xs text-white font-bold shadow-lg border border-red-300 animate-bounce">
                    👹 AI
                  </div>
                </div>
              </div>
            </div>
            
            {!fightMode ? (
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Древний город</h3>
                <p className="text-muted-foreground">
                  Ты попал в загадочный восточный город. Готов к приключению?
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    size="lg"
                    onClick={startFight}
                    className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 hover:from-red-500 hover:via-orange-400 hover:to-red-500 text-white font-bold shadow-2xl shadow-red-500/50 border-2 border-red-300"
                  >
                    <Icon name="Swords" size={20} className="mr-2" />
                    Вступить в бой
                  </Button>
                  <Button
                    size="lg"
                    onClick={startGame}
                    className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:via-yellow-300 hover:to-yellow-400 text-black font-bold shadow-2xl shadow-yellow-500/50 border-2 border-yellow-300"
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Играть в снежинки
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Панель здоровья */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-400">
                    <div className="text-sm text-blue-300 font-bold mb-2">⚔️ ТВОЁ ЗДОРОВЬЕ</div>
                    <div className="w-full bg-gray-700 rounded-full h-6">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-white text-xs font-bold"
                        style={{ width: `${playerHP}%` }}
                      >
                        {playerHP} HP
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 border-2 border-red-400">
                    <div className="text-sm text-red-300 font-bold mb-2">👹 ЗДОРОВЬЕ AI</div>
                    <div className="w-full bg-gray-700 rounded-full h-6">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-white text-xs font-bold"
                        style={{ width: `${enemyHP}%` }}
                      >
                        {enemyHP} HP
                      </div>
                    </div>
                  </div>
                </div>

                {/* Кнопки управления */}
                {playerHP > 0 && enemyHP > 0 ? (
                  <div className="flex gap-3 justify-center">
                    <Button
                      size="lg"
                      onClick={playerAttack}
                      disabled={playerAttacking || enemyAttacking}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold shadow-xl disabled:opacity-50"
                    >
                      <Icon name="Sword" size={20} className="mr-2" />
                      Атаковать
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border-2 border-yellow-400">
                    <h3 className="text-3xl font-bold">
                      {playerHP > 0 ? '🏆 Победа!' : '💀 Поражение'}
                    </h3>
                    <p className="text-lg">
                      {playerHP > 0 ? 'Ты победил теневого противника!' : 'Тень оказалась сильнее...'}
                    </p>
                    <Button
                      size="lg"
                      onClick={() => { setFightMode(false); setShowCityMap(false); }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold"
                    >
                      <Icon name="Home" size={20} className="mr-2" />
                      Вернуться
                    </Button>
                  </div>
                )}

                {/* Лог боя */}
                <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 max-h-32 overflow-y-auto border border-white/20">
                  <div className="space-y-1 text-sm">
                    {battleLog.slice(-5).map((log, i) => (
                      <div key={i} className="text-white/80">{log}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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