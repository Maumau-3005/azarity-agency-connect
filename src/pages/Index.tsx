import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { KpiCards } from '@/components/KpiCards';
import { ArrowRight, Instagram, Music, Sparkles } from 'lucide-react';
import { Metric } from '@/lib/data';

const Index = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const igResponse = await fetch('/data/instagram.json');
      const ttResponse = await fetch('/data/tiktok.json');
      const igData = await igResponse.json();
      const ttData = await ttResponse.json();
      setMetrics([...igData, ...ttData]);
    };
    loadData();
  }, []);

  const last30Days = metrics.filter((m) => {
    const date = new Date(m.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return date >= thirtyDaysAgo;
  });

  const totalReach = last30Days.reduce((sum, m) => sum + m.reach, 0);
  const totalEngagement = last30Days.reduce((sum, m) => sum + m.likes + m.comments, 0);
  const avgEngagementRate = last30Days.length > 0
    ? last30Days.reduce((sum, m) => sum + ((m.likes + m.comments) / m.reach) * 100, 0) / last30Days.length
    : 0;
  const followerGrowth = last30Days.reduce((sum, m) => sum + m.new_followers, 0);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm">Performance real para decisões rápidas</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">Julia Azarity</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Media kit & performance real para decisões rápidas. Conteúdo que conecta marcas e audiência.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 gradient-primary hover:opacity-90 transition-opacity">
                  Abrir Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/kit">
                <Button size="lg" variant="outline" className="gap-2">
                  Ver Media Kit
                </Button>
              </Link>
              <Link to="/agency">
                <Button size="lg" variant="secondary" className="gap-2">
                  Área para Agências
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-primary" />
                <span className="text-lg font-semibold">127.5K</span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-primary" />
                <span className="text-lg font-semibold">215.8K</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Performance em Destaque</h2>
        <KpiCards
          totalReach={totalReach}
          totalEngagement={totalEngagement}
          avgEngagementRate={avgEngagementRate}
          followerGrowth={followerGrowth}
          reachChange={12.5}
          engagementChange={8.3}
          rateChange={3.2}
          growthChange={15.7}
        />
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Sobre Julia Azarity</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-2 gradient-text">Nicho Premium</h3>
              <p className="text-sm text-muted-foreground">
                Lifestyle, moda e beleza com foco em autenticidade e qualidade
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-2 gradient-text">Tom Único</h3>
              <p className="text-sm text-muted-foreground">
                Comunicação próxima que gera conexão genuína com a audiência
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-bold mb-2 gradient-text">Resultados Consistentes</h3>
              <p className="text-sm text-muted-foreground">
                Métricas sólidas em 60+ dias de análise contínua
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
