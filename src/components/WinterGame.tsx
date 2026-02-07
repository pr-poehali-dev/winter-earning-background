import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const WinterGame = () => {
  // Зомби Ферма
  const [isNight, setIsNight] = useState(false);

  // Смена дня и ночи каждые 10 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);





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
              {/* Солнце */}
              <div className={`absolute top-12 right-16 transition-all duration-3000 ${
                isNight ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
              }`}>
                <div className="w-24 h-24 bg-yellow-400 rounded-full"
                     style={{
                       boxShadow: '0 0 60px rgba(250, 204, 21, 0.8), 0 0 100px rgba(250, 204, 21, 0.5)'
                     }}></div>
              </div>

              {/* Луна */}
              <div className={`absolute top-12 right-16 transition-all duration-3000 ${
                isNight ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}>
                <div className="w-20 h-20 bg-slate-200 rounded-full shadow-2xl"
                     style={{
                       boxShadow: '0 0 40px rgba(226, 232, 240, 0.6)'
                     }}>
                  {/* Кратеры на луне */}
                  <div className="absolute w-4 h-4 bg-slate-300 rounded-full top-4 left-3 opacity-40"></div>
                  <div className="absolute w-3 h-3 bg-slate-300 rounded-full top-10 left-8 opacity-30"></div>
                  <div className="absolute w-2 h-2 bg-slate-300 rounded-full top-6 right-4 opacity-50"></div>
                </div>
              </div>

              {/* Звёзды */}
              {isNight && (
                <div className="absolute inset-0">
                  {[...Array(100)].map((_, i) => (
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

              {/* Облака днём */}
              {!isNight && (
                <>
                  <div className="absolute top-20 left-10 animate-float">
                    <div className="relative">
                      <div className="absolute w-16 h-16 bg-white/80 rounded-full"></div>
                      <div className="absolute left-10 top-2 w-20 h-20 bg-white/80 rounded-full"></div>
                      <div className="absolute left-22 top-4 w-16 h-16 bg-white/80 rounded-full"></div>
                    </div>
                  </div>

                  <div className="absolute top-32 right-24 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="relative">
                      <div className="absolute w-14 h-14 bg-white/70 rounded-full"></div>
                      <div className="absolute left-8 top-1 w-18 h-18 bg-white/70 rounded-full"></div>
                      <div className="absolute left-18 top-3 w-14 h-14 bg-white/70 rounded-full"></div>
                    </div>
                  </div>

                  <div className="absolute top-48 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
                    <div className="relative">
                      <div className="absolute w-12 h-12 bg-white/60 rounded-full"></div>
                      <div className="absolute left-6 top-1 w-16 h-16 bg-white/60 rounded-full"></div>
                      <div className="absolute left-16 top-2 w-12 h-12 bg-white/60 rounded-full"></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WinterGame;