import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Music } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KpiCards } from '@/components/KpiCards';
import { PostGrid } from '@/components/PostGrid';
import { Metric, Post, calculateEngagementRate } from '@/lib/data';

const TikTok = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const metricsResponse = await fetch('/data/tiktok.json');
      const postsResponse = await fetch('/data/top_posts.json');
      const metricsData = await metricsResponse.json();
      const postsData = await postsResponse.json();
      setMetrics(metricsData);
      setPosts(postsData.filter((p: Post) => p.platform === 'tiktok'));
    };
    loadData();
  }, []);

  const totalReach = metrics.reduce((sum, m) => sum + m.reach, 0);
  const totalEngagement = metrics.reduce((sum, m) => sum + m.likes + m.comments, 0);
  const avgEngagementRate = metrics.length > 0
    ? metrics.reduce((sum, m) => sum + calculateEngagementRate(m), 0) / metrics.length
    : 0;
  const followerGrowth = metrics.reduce((sum, m) => sum + m.new_followers, 0);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Music className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">TikTok</h1>
            </div>
            <p className="text-muted-foreground">Análise detalhada - últimos 60 dias</p>
          </div>
        </div>

        <KpiCards
          totalReach={totalReach}
          totalEngagement={totalEngagement}
          avgEngagementRate={avgEngagementRate}
          followerGrowth={followerGrowth}
        />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="audience">Audiência</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Destaques do Período</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Visualizações totais: 1.7M+ views</li>
                  <li>• Taxa de engajamento: 9.2% (excelente)</li>
                  <li>• Crescimento: +27.6K seguidores</li>
                  <li>• Vídeo viral: 234K views em 48h</li>
                </ul>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Insights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Melhor formato: POVs e transformações</li>
                  <li>• Duração ideal: 15-30 segundos</li>
                  <li>• Compartilhamentos: +1,480 em média</li>
                  <li>• Watch time: 87% (muito alto)</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Top Vídeos</h2>
              <p className="text-muted-foreground">Conteúdos com melhor performance</p>
            </div>
            <PostGrid posts={posts} />
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Demografia</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Mulheres</span>
                    <span className="font-semibold">72%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Homens</span>
                    <span className="font-semibold">28%</span>
                  </li>
                </ul>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Faixa Etária</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">18-24</span>
                    <span className="font-semibold">52%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">25-34</span>
                    <span className="font-semibold">35%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">35+</span>
                    <span className="font-semibold">13%</span>
                  </li>
                </ul>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Top Regiões</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Sudeste</span>
                    <span className="font-semibold">48%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Sul</span>
                    <span className="font-semibold">22%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Outros</span>
                    <span className="font-semibold">30%</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TikTok;
