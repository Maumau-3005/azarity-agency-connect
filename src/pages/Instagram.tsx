import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Instagram as InstagramIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KpiCards } from '@/components/KpiCards';
import { PostGrid } from '@/components/PostGrid';
import { Metric, Post, calculateEngagementRate } from '@/lib/data';

const Instagram = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const metricsResponse = await fetch('/data/instagram.json');
      const postsResponse = await fetch('/data/top_posts.json');
      const metricsData = await metricsResponse.json();
      const postsData = await postsResponse.json();
      setMetrics(metricsData);
      setPosts(postsData.filter((p: Post) => p.platform === 'instagram'));
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
              <InstagramIcon className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold gradient-text">Instagram</h1>
            </div>
            <p className="text-muted-foreground">Análise detalhada - últimos 50 dias</p>
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
                  <li>• Alcance total: 1.156.800 impressões</li>
                  <li>• Taxa de engajamento: 8.4% (acima da média)</li>
                  <li>• Crescimento: +18.2K seguidores</li>
                  <li>• Melhor formato: Reels com média de 67K visualizações</li>
                </ul>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Insights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Pico de engajamento: Terças e Quintas</li>
                  <li>• Melhor horário: 19h-21h</li>
                  <li>• Saves: 15% acima da média do setor</li>
                  <li>• Compartilhamentos: +340% vs mês anterior</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Top Posts</h2>
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
                    <span className="font-semibold">78%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Homens</span>
                    <span className="font-semibold">22%</span>
                  </li>
                </ul>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Faixa Etária</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">18-24</span>
                    <span className="font-semibold">45%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">25-34</span>
                    <span className="font-semibold">38%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">35+</span>
                    <span className="font-semibold">17%</span>
                  </li>
                </ul>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-4">Top Cidades</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">São Paulo</span>
                    <span className="font-semibold">32%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Rio de Janeiro</span>
                    <span className="font-semibold">18%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Outros</span>
                    <span className="font-semibold">50%</span>
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

export default Instagram;
