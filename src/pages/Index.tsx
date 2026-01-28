import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const articles = [
    {
      id: 1,
      title: 'Фриланс в холода: 10 прибыльных ниш',
      description: 'Откройте для себя самые востребованные направления удалённой работы зимой',
      category: 'Фриланс',
      readTime: '5 мин',
    },
    {
      id: 2,
      title: 'Сезонный бизнес: что продавать зимой',
      description: 'Идеи для быстрого старта локального бизнеса в зимний период',
      category: 'Бизнес',
      readTime: '7 мин',
    },
    {
      id: 3,
      title: 'Инвестиции в холодный сезон',
      description: 'Стратегии инвестирования и пассивного дохода в зимние месяцы',
      category: 'Инвестиции',
      readTime: '6 мин',
    },
  ];

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/e2e3e1ec-61af-447a-9ddd-cd4c0b2a4b15/bucket/94c5b92d-e990-460f-b35c-76dd6b7fc854.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-slate-900/85 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10">
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
          <div className="container mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Icon name="Snowflake" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Зимний Заработок</h1>
              </div>
              
              <div className="hidden md:flex items-center gap-8">
                <button
                  onClick={() => setActiveSection('home')}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === 'home' 
                      ? 'text-white' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Главная
                </button>
                <button
                  onClick={() => setActiveSection('about')}
                  className={`text-sm font-medium transition-all duration-300 ${
                    activeSection === 'about' 
                      ? 'text-white' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  О блоге
                </button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
                >
                  Подписаться
                </Button>
              </div>

              <button className="md:hidden text-white">
                <Icon name="Menu" size={24} />
              </button>
            </div>
          </div>
        </nav>

        {activeSection === 'home' && (
          <>
            <section className="container mx-auto px-6 pt-32 pb-24">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                  <Icon name="TrendingUp" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-white">Новые возможности каждый день</span>
                </div>
                
                <h2 className="text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                  Зарабатывай<br />
                  <span className="text-primary">круглый год</span>
                </h2>
                
                <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                  Практические советы, проверенные стратегии и актуальные идеи для заработка в холодный сезон
                </p>
                
                <div className="flex items-center justify-center gap-4 pt-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/40 transition-all duration-300 hover:scale-105">
                    <Icon name="BookOpen" size={20} className="mr-2" />
                    Читать статьи
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <Icon name="PlayCircle" size={20} className="mr-2" />
                    Смотреть гайды
                  </Button>
                </div>
              </div>
            </section>

            <section className="container mx-auto px-6 py-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-3">Последние статьи</h3>
                    <p className="text-white/70 text-lg">Свежие материалы для вашего успеха</p>
                  </div>
                  <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hidden md:flex">
                    Все статьи
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <Card key={article.id} className="bg-white/95 backdrop-blur-md border-0 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 group cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Icon name="Clock" size={12} />
                            {article.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          {article.description}
                        </CardDescription>
                        <div className="mt-6 flex items-center text-primary font-medium text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                          Читать далее
                          <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            <section className="container mx-auto px-6 py-24">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-xl border-white/30 shadow-2xl">
                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
                      <Icon name="Mail" size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-3xl text-white mb-3">Не пропускайте новые материалы</CardTitle>
                    <CardDescription className="text-lg text-white/80">
                      Подпишитесь на рассылку и получайте свежие статьи первыми
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Ваш email"
                        className="flex-1 px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/40 transition-all duration-300 hover:scale-105">
                        Подписаться
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </>
        )}

        {activeSection === 'about' && (
          <section className="container mx-auto px-6 py-32">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
                <CardHeader className="text-center pb-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/40">
                    <Icon name="Target" size={40} className="text-white" />
                  </div>
                  <CardTitle className="text-4xl mb-4">О блоге</CardTitle>
                  <CardDescription className="text-lg">
                    Наша миссия — помочь вам зарабатывать стабильно круглый год
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 text-lg leading-relaxed">
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">Зимний Заработок</span> — это платформа для тех, кто ищет реальные способы увеличить доход в холодное время года. Мы собираем проверенные стратегии, делимся опытом успешных предпринимателей и фрилансеров.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-6 py-8">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon name="Users" size={28} className="text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary">5000+</div>
                      <div className="text-sm text-muted-foreground">Активных читателей</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center">
                        <Icon name="FileText" size={28} className="text-secondary" />
                      </div>
                      <div className="text-3xl font-bold text-secondary">150+</div>
                      <div className="text-sm text-muted-foreground">Полезных статей</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-xl bg-accent/10 flex items-center justify-center">
                        <Icon name="TrendingUp" size={28} className="text-accent" />
                      </div>
                      <div className="text-3xl font-bold text-accent">98%</div>
                      <div className="text-sm text-muted-foreground">Положительных отзывов</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    Наша команда ежедневно анализирует рынок, тестирует новые методы заработка и публикует только работающие решения. Мы верим, что зима — это не повод замедляться, а возможность использовать сезонные преимущества.
                  </p>

                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h4 className="font-semibold text-xl mb-3 flex items-center gap-2">
                      <Icon name="Lightbulb" size={24} className="text-primary" />
                      Наши принципы
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                        <span>Только проверенная информация из реального опыта</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                        <span>Практические советы без воды и теории</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                        <span>Честность в оценке рисков и возможностей</span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center pt-6">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
                      <Icon name="Mail" size={20} className="mr-2" />
                      Связаться с нами
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        <footer className="container mx-auto px-6 py-12 mt-24 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="Snowflake" size={24} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-white">Зимний Заработок</div>
                <div className="text-sm text-white/60">Ваш гид по сезонному доходу</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              © 2026 Зимний Заработок. Все права защищены.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
