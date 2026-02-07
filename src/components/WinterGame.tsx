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

  // Смена дня и ночи каждые 10 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight(prev => !prev);
    }, 10000);
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
        <CardTitle className="text-3xl mb-2">Зомби Ферма</CardTitle>
        <p className="text-muted-foreground">Изометрическая игра с 3D фермой</p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div
            className="relative rounded-xl overflow-hidden mx-auto"
            style={{
              width: '100%',
              height: '600px',
            }}
          >
            {/* ФОН */}
            <div className={`absolute inset-0 transition-all duration-3000 ${
              isNight 
                ? 'bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800' 
                : 'bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200'
            }`}>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WinterGame;
