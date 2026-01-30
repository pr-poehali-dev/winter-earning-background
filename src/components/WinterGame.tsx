import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const WinterGame = () => {

  const [showMap, setShowMap] = useState(false);
  const [showCityMap, setShowCityMap] = useState(false);

  const [fightMode, setFightMode] = useState(false);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);




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





  return (
    <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl overflow-hidden w-full">
      <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40">
          <Icon name="Swords" size={32} className="text-white" />
        </div>
        <CardTitle className="text-3xl mb-2">Игра приключений</CardTitle>
        <p className="text-muted-foreground">Исследуй карту и сражайся с врагами</p>
      </CardHeader>

      <CardContent className="p-6">
        {!showMap ? (
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
        ) : showMap && !showCityMap ? (
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


            </div>
            
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Выбери город на карте, чтобы начать своё путешествие!
              </p>
            </div>
          </div>
        ) : showCityMap ? (
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
        )}
      </CardContent>
    </Card>
  );
};

export default WinterGame;