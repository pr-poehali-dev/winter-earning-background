import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const WinterGame = () => {

  const [showMap, setShowMap] = useState(false);
  const [showCityMap, setShowCityMap] = useState(false);
  const [showMountainMap, setShowMountainMap] = useState(false);

  const [fightMode, setFightMode] = useState(false);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  // Зомби Ферма
  const [isNight, setIsNight] = useState(false);
  const [zombiePosition, setZombiePosition] = useState({ x: 30, y: 50 });

  // Смена дня и ночи каждые 10 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Движение зомби
  useEffect(() => {
    const interval = setInterval(() => {
      setZombiePosition(prev => ({
        x: Math.max(5, Math.min(90, prev.x + (Math.random() - 0.5) * 10)),
        y: Math.max(20, Math.min(70, prev.y + (Math.random() - 0.5) * 10))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);




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

              {/* Второй круг - справа сверху */}
              <div className="absolute top-20 right-24">
                <div className="relative group cursor-pointer" onClick={() => setShowMountainMap(true)}>
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 via-emerald-300 to-green-500 flex items-center justify-center shadow-2xl border-4 border-green-600 transition-all duration-300 hover:scale-110 animate-pulse">
                    <Icon name="Mountain" size={48} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold animate-bounce">
                    ?
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
        ) : showMountainMap ? (
          <div className="space-y-4">
            <Button
              onClick={() => setShowMountainMap(false)}
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
                width: '100%',
                height: '600px',
                background: 'linear-gradient(to bottom, #87CEEB 0%, #B4E4FF 50%, #0077BE 100%)',
              }}
            >
              {/* Облака - улучшенные */}
              <div className="absolute top-8 left-12">
                <div className="relative">
                  <div className="absolute w-20 h-20 bg-white rounded-full"></div>
                  <div className="absolute left-12 top-4 w-28 h-28 bg-white rounded-full"></div>
                  <div className="absolute left-28 top-2 w-24 h-24 bg-white rounded-full"></div>
                  <div className="absolute left-40 top-6 w-16 h-16 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-24 right-20">
                <div className="relative">
                  <div className="absolute w-16 h-16 bg-white rounded-full"></div>
                  <div className="absolute left-10 top-3 w-24 h-24 bg-white rounded-full"></div>
                  <div className="absolute left-24 top-1 w-20 h-20 bg-white rounded-full"></div>
                  <div className="absolute left-36 top-5 w-14 h-14 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-16 left-1/3">
                <div className="relative">
                  <div className="absolute w-18 h-18 bg-white rounded-full"></div>
                  <div className="absolute left-8 top-2 w-22 h-22 bg-white rounded-full"></div>
                  <div className="absolute left-20 top-0 w-18 h-18 bg-white rounded-full"></div>
                </div>
              </div>

              {/* ЗОМБИ ФЕРМА - Изометрический вид */}
              <div className={`absolute inset-0 transition-all duration-3000 overflow-hidden ${
                isNight 
                  ? 'bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800' 
                  : 'bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-100'
              }`}
                   style={{
                     perspective: '2000px',
                     transformStyle: 'preserve-3d',
                   }}>
                {/* Солнце/Луна */}
                <div className={`absolute top-8 right-16 transition-all duration-3000 z-10 ${
                  isNight ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
                }`}>
                  <div className="w-20 h-20 bg-yellow-400 rounded-full shadow-2xl shadow-yellow-500/70" 
                       style={{
                         boxShadow: isNight ? 'none' : '0 0 60px rgba(250, 204, 21, 0.8)'
                       }}></div>
                </div>
                <div className={`absolute top-8 right-16 transition-all duration-3000 z-10 ${
                  isNight ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}>
                  <div className="w-16 h-16 bg-slate-200 rounded-full shadow-2xl shadow-slate-300/50">
                    <div className="absolute w-3 h-3 bg-slate-300 rounded-full top-3 left-2"></div>
                    <div className="absolute w-2 h-2 bg-slate-300 rounded-full top-7 left-8"></div>
                  </div>
                </div>

                {/* Звезды ночью */}
                {isNight && (
                  <div className="absolute inset-0 z-0">
                    {[...Array(80)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{ 
                          left: `${Math.random() * 100}%`, 
                          top: `${Math.random() * 70}%`,
                          width: `${1 + Math.random() * 2}px`,
                          height: `${1 + Math.random() * 2}px`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Изометрическая сетка земли */}
                <div className="absolute inset-0 flex items-center justify-center"
                     style={{
                       transform: 'rotateX(60deg) rotateZ(45deg)',
                       transformStyle: 'preserve-3d',
                     }}>
                  
                  {/* МОРЕ - изометрия */}
                  <div className="absolute" style={{
                    width: '400px',
                    height: '400px',
                    bottom: '-100px',
                    left: '-200px',
                    background: isNight 
                      ? 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                    transform: 'translateZ(-50px)',
                  }}>
                    {/* Волны на море */}
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute h-1 opacity-30"
                        style={{
                          width: '100%',
                          top: `${i * 12}%`,
                          background: 'rgba(255,255,255,0.3)',
                          transform: `skewY(-45deg)`,
                        }}
                      />
                    ))}
                  </div>

                  {/* ПЕСОК - изометрия */}
                  <div className="absolute" style={{
                    width: '500px',
                    height: '200px',
                    bottom: '-50px',
                    left: '-100px',
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde047 50%, #facc15 100%)',
                    transform: 'translateZ(-20px)',
                  }}>
                    {/* Песчинки */}
                    {[...Array(50)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute rounded-full bg-amber-600/20"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          width: `${2 + Math.random() * 3}px`,
                          height: `${2 + Math.random() * 3}px`,
                        }}
                      />
                    ))}
                  </div>

                  {/* ТРАВА - изометрия */}
                  <div className="absolute" style={{
                    width: '600px',
                    height: '600px',
                    bottom: '50px',
                    left: '0px',
                    background: isNight
                      ? 'linear-gradient(135deg, #15803d 0%, #166534 50%, #14532d 100%)'
                      : 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                    transform: 'translateZ(0px)',
                  }}>
                    {/* Травинки */}
                    {[...Array(100)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          width: '2px',
                          height: `${4 + Math.random() * 6}px`,
                          background: isNight ? '#15803d' : '#4ade80',
                          transform: `rotate(${Math.random() * 40 - 20}deg)`,
                        }}
                      />
                    ))}

                    {/* Камни на траве */}
                    {[...Array(25)].map((_, i) => (
                      <div 
                        key={`stone-${i}`}
                        className="absolute rounded-sm"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          width: `${8 + Math.random() * 12}px`,
                          height: `${6 + Math.random() * 10}px`,
                          background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%)',
                          transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                      />
                    ))}

                    {/* Деревья изометрические */}
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={`tree-${i}`}
                        className="absolute"
                        style={{
                          left: `${10 + (i * 8)}%`,
                          top: `${10 + ((i % 3) * 30)}%`,
                          transform: 'translateZ(20px)',
                        }}
                      >
                        {/* Ствол */}
                        <div style={{
                          width: '8px',
                          height: '40px',
                          background: 'linear-gradient(to right, #92400e 0%, #78350f 100%)',
                          margin: '0 auto',
                        }}></div>
                        {/* Крона изометрическая */}
                        <div style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '-12px',
                          width: '32px',
                          height: '32px',
                          background: isNight ? '#15803d' : '#22c55e',
                          clipPath: 'polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)',
                        }}></div>
                      </div>
                    ))}
                  </div>

                  {/* ГОРА - изометрия */}
                  <div className="absolute" style={{
                    width: '250px',
                    height: '300px',
                    bottom: '250px',
                    right: '100px',
                    clipPath: 'polygon(50% 0%, 100% 70%, 80% 100%, 20% 100%, 0% 70%)',
                    background: 'linear-gradient(135deg, #78716c 0%, #57534e 50%, #44403c 100%)',
                    transform: 'translateZ(50px)',
                  }}>
                    {/* Трава на горе */}
                    <div className="absolute bottom-0 left-0 right-0 h-24">
                      {[...Array(40)].map((_, i) => (
                        <div 
                          key={i}
                          className="absolute"
                          style={{
                            left: `${10 + (i * 2)}%`,
                            bottom: '0',
                            width: '2px',
                            height: `${3 + Math.random() * 5}px`,
                            background: isNight ? '#15803d' : '#4ade80',
                            transform: `rotate(${Math.random() * 30 - 15}deg)`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Камни на горе */}
                    {[...Array(30)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute rounded-sm"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${Math.random() * 90}%`,
                          width: `${6 + Math.random() * 16}px`,
                          height: `${5 + Math.random() * 12}px`,
                          background: 'linear-gradient(135deg, #a8a29e 0%, #78716c 50%, #57534e 100%)',
                          transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                      />
                    ))}

                    {/* Деревья на горе */}
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute"
                        style={{
                          left: `${30 + (i * 10)}%`,
                          top: `${50 + (i * 7)}%`,
                        }}
                      >
                        <div style={{
                          width: '6px',
                          height: '30px',
                          background: '#78350f',
                          margin: '0 auto',
                        }}></div>
                        <div style={{
                          position: 'absolute',
                          top: '-15px',
                          left: '-10px',
                          width: '26px',
                          height: '26px',
                          background: isNight ? '#166534' : '#16a34a',
                          clipPath: 'polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)',
                        }}></div>
                      </div>
                    ))}
                  </div>

                  {/* ЗОМБИ изометрический */}
                  <div 
                    className="absolute transition-all duration-2000 ease-in-out"
                    style={{
                      left: `${zombiePosition.x}%`,
                      top: `${zombiePosition.y}%`,
                      transform: `translateZ(${30}px)`,
                      zIndex: 100,
                    }}
                  >
                    <div className="relative">
                      {/* Тело зомби изометрия */}
                      <div style={{
                        width: '24px',
                        height: '36px',
                        background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
                        position: 'relative',
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        boxShadow: isNight ? '0 0 20px rgba(74, 222, 128, 0.8)' : 'none',
                      }}>
                        {/* Голова */}
                        <div style={{
                          position: 'absolute',
                          top: '-16px',
                          left: '2px',
                          width: '20px',
                          height: '20px',
                          background: '#16a34a',
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        }}>
                          {/* Глаза */}
                          <div className="absolute top-1 left-1 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          <div className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        </div>
                        
                        {/* Руки */}
                        <div className="absolute top-2 -left-2 w-2 h-8 bg-green-600 transform -rotate-12"></div>
                        <div className="absolute top-2 -right-2 w-2 h-8 bg-green-600 transform rotate-12"></div>
                      </div>
                      
                      {/* Тень */}
                      <div className="absolute -bottom-1 left-0 right-0 h-2 bg-black/40 rounded-full blur-sm"
                           style={{ transform: 'scaleX(1.5)' }}></div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            
            <div className="text-center space-y-4 p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border-2 border-green-400">
              <h3 className="text-3xl font-bold text-white">⛰️ Заснеженные горы</h3>
              <p className="text-lg text-white/90">
                Ты нашёл легендарное сокровище в горах! Здесь скрыты древние артефакты и сила природы.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 hover:from-green-500 hover:via-emerald-400 hover:to-green-500 text-white font-bold shadow-2xl shadow-green-500/50 border-2 border-green-300"
                >
                  <Icon name="Gift" size={20} className="mr-2" />
                  Забрать награду
                </Button>
              </div>
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
              {/* 3D игрок */}
              <div 
                className={`absolute bottom-8 left-16 transition-all duration-300 ${playerAttacking ? 'translate-x-12 scale-110' : ''}`}
                style={{ 
                  perspective: '1200px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div 
                  className="relative group cursor-pointer hover:scale-105 transition-all duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateY(-20deg)',
                  }}
                >
                  {/* 3D человечек */}
                  <div 
                    className="relative w-20 h-40"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(0px)',
                    }}
                  >
                    {/* Голова */}
                    <div 
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-cyan-300 via-cyan-400 to-cyan-500 rounded-full border-2 border-cyan-200 shadow-lg"
                      style={{ 
                        transform: 'translateX(-50%) translateZ(25px)',
                        boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
                      }}
                    >
                      {/* Глаза */}
                      <div className="absolute top-3 left-2 w-2 h-2 bg-white rounded-full shadow-sm">
                        <div className="w-1 h-1 bg-blue-900 rounded-full ml-0.5 mt-0.5"></div>
                      </div>
                      <div className="absolute top-3 right-2 w-2 h-2 bg-white rounded-full shadow-sm">
                        <div className="w-1 h-1 bg-blue-900 rounded-full ml-0.5 mt-0.5"></div>
                      </div>
                      {/* Улыбка */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-2 border-b-2 border-white rounded-b-full"></div>
                    </div>

                    {/* Тело */}
                    <div 
                      className="absolute top-11 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-2xl border-2 border-blue-300 shadow-xl"
                      style={{ 
                        transform: 'translateX(-50%) translateZ(20px)',
                        boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)',
                      }}
                    >
                      {/* Детали костюма */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-cyan-300 rounded-full"></div>
                      <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-cyan-300 rounded-full"></div>
                      <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-cyan-300 rounded-full"></div>
                    </div>

                    {/* Левая рука */}
                    <div 
                      className={`absolute top-13 left-1 w-3 h-12 bg-gradient-to-b from-blue-400 to-blue-500 rounded-lg border border-blue-300 shadow-md transition-all duration-300 ${playerAttacking ? 'rotate-45' : ''}`}
                      style={{ 
                        transform: 'translateZ(18px)',
                        transformOrigin: 'top center',
                      }}
                    />

                    {/* Правая рука */}
                    <div 
                      className={`absolute top-13 right-1 w-3 h-12 bg-gradient-to-b from-blue-400 to-blue-500 rounded-lg border border-blue-300 shadow-md transition-all duration-300 ${playerAttacking ? '-rotate-45 scale-110' : ''}`}
                      style={{ 
                        transform: 'translateZ(18px)',
                        transformOrigin: 'top center',
                      }}
                    />

                    {/* Левая нога */}
                    <div 
                      className="absolute bottom-0 left-4 w-3 h-14 bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg border border-blue-400 shadow-md"
                      style={{ 
                        transform: 'translateZ(15px)',
                      }}
                    >
                      {/* Ботинок */}
                      <div className="absolute -bottom-1 -left-1 w-5 h-3 bg-cyan-600 rounded-full"></div>
                    </div>

                    {/* Правая нога */}
                    <div 
                      className="absolute bottom-0 right-4 w-3 h-14 bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg border border-blue-400 shadow-md"
                      style={{ 
                        transform: 'translateZ(15px)',
                      }}
                    >
                      {/* Ботинок */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-3 bg-cyan-600 rounded-full"></div>
                    </div>

                    {/* 3D глубина - боковые части */}
                    <div 
                      className="absolute top-11 left-1/2 transform -translate-x-1/2 w-10 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-r-2xl opacity-60"
                      style={{ 
                        transform: 'translateX(-50%) rotateY(90deg) translateZ(6px)',
                        transformOrigin: 'left center',
                      }}
                    />

                    {/* Светящаяся аура */}
                    <div 
                      className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl animate-pulse"
                      style={{ 
                        transform: 'translateZ(-10px) scale(1.5)',
                      }}
                    />

                    {/* Эффект атаки */}
                    {playerAttacking && (
                      <>
                        <div 
                          className="absolute -right-10 top-16 text-4xl animate-ping"
                          style={{ transform: 'translateZ(50px)' }}
                        >⚔️</div>
                        <div 
                          className="absolute top-11 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-yellow-400/40 rounded-2xl animate-pulse"
                          style={{ transform: 'translateX(-50%) translateZ(25px)' }}
                        />
                        <div className="absolute top-13 right-0 w-4 h-1 bg-yellow-300 rounded-full animate-ping" style={{ transform: 'translateZ(30px)' }}></div>
                        <div className="absolute top-16 right-1 w-3 h-1 bg-yellow-400 rounded-full animate-ping" style={{ transform: 'translateZ(32px)', animationDelay: '0.1s' }}></div>
                      </>
                    )}
                  </div>

                  {/* Метка игрока */}
                  <div 
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs text-white font-bold shadow-xl border-2 border-cyan-300"
                    style={{ transform: 'translateX(-50%) translateZ(80px)' }}
                  >
                    ⚔️ ИГРОК
                  </div>

                  {/* Тень под персонажем */}
                  <div 
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-black/40 rounded-full blur-sm"
                    style={{ transform: 'translateX(-50%) translateZ(-20px)' }}
                  />
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
        ) : null}
      </CardContent>
    </Card>
  );
};

export default WinterGame;