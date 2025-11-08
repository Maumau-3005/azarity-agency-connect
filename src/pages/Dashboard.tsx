import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Filters } from '@/components/Filters';
import { KpiCards } from '@/components/KpiCards';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { useFiltersStore } from '@/lib/store';
import { Metric, calculateEngagementRate } from '@/lib/data';
import { format } from 'date-fns';

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const { dateRange, platform } = useFiltersStore();

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

  const filteredMetrics = metrics.filter((m) => {
    const date = new Date(m.date);
    const inDateRange = date >= dateRange.from && date <= dateRange.to;
    const matchesPlatform = platform === 'all' || m.platform === platform;
    return inDateRange && matchesPlatform;
  });

  const totalReach = filteredMetrics.reduce((sum, m) => sum + m.reach, 0);
  const totalEngagement = filteredMetrics.reduce((sum, m) => sum + m.likes + m.comments, 0);
  const avgEngagementRate = filteredMetrics.length > 0
    ? filteredMetrics.reduce((sum, m) => sum + calculateEngagementRate(m), 0) / filteredMetrics.length
    : 0;
  const followerGrowth = filteredMetrics.reduce((sum, m) => sum + m.new_followers, 0);

  const chartData = filteredMetrics.map((m) => ({
    date: format(new Date(m.date), 'dd/MM'),
    alcance: m.reach,
    engajamento: m.likes + m.comments,
    impressões: m.impressions,
  }));

  const typeData = [
    { name: 'Reels/Vídeos', value: filteredMetrics.filter(m => m.platform === 'instagram').reduce((sum, m) => sum + m.posts, 0) },
    { name: 'TikTok', value: filteredMetrics.filter(m => m.platform === 'tiktok').reduce((sum, m) => sum + m.posts, 0) },
  ];

  const exportCSV = () => {
    const csv = [
      ['Data', 'Plataforma', 'Alcance', 'Impressões', 'Curtidas', 'Comentários', 'Novos Seguidores'],
      ...filteredMetrics.map(m => [
        m.date,
        m.platform,
        m.reach,
        m.impressions,
        m.likes,
        m.comments,
        m.new_followers,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `julia-azarity-metrics-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
              <p className="text-muted-foreground">Análise completa de performance</p>
            </div>
          </div>
          <Button onClick={exportCSV} className="gap-2">
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>

        <Filters />

        <KpiCards
          totalReach={totalReach}
          totalEngagement={totalEngagement}
          avgEngagementRate={avgEngagementRate}
          followerGrowth={followerGrowth}
        />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
            <TabsTrigger value="growth">Crescimento</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Link to="/dashboard/instagram">
                <div className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Instagram</h3>
                    <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-sm text-muted-foreground">Ver análise detalhada</p>
                </div>
              </Link>
              <Link to="/dashboard/tiktok">
                <div className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">TikTok</h3>
                    <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-sm text-muted-foreground">Ver análise detalhada</p>
                </div>
              </Link>
            </div>

            <LineChart
              data={chartData}
              title="Alcance e Engajamento ao Longo do Tempo"
              dataKeys={[
                { key: 'alcance', color: 'hsl(var(--brand-red))', name: 'Alcance' },
                { key: 'engajamento', color: 'hsl(var(--brand-purple))', name: 'Engajamento' },
              ]}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <BarChart
                data={typeData}
                title="Posts por Plataforma"
                dataKeys={[
                  { key: 'value', color: 'hsl(var(--brand-fuchsia))', name: 'Quantidade' },
                ]}
              />
              
              <LineChart
                data={chartData.slice(-14)}
                title="Últimos 14 Dias - Detalhado"
                dataKeys={[
                  { key: 'impressões', color: 'hsl(var(--brand-rose))', name: 'Impressões' },
                ]}
              />
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <LineChart
              data={chartData}
              title="Evolução do Engajamento"
              dataKeys={[
                { key: 'engajamento', color: 'hsl(var(--brand-purple))', name: 'Engajamento Total' },
              ]}
            />
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <LineChart
              data={chartData}
              title="Crescimento de Alcance"
              dataKeys={[
                { key: 'alcance', color: 'hsl(var(--brand-red))', name: 'Alcance' },
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
