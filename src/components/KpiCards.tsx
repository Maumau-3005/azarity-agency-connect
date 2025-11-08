import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Eye, Heart, Target } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/data';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
}

export const KpiCard = ({ title, value, change, icon, description }: KpiCardProps) => {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50">
      <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2 gradient-text">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-2">
            <Badge variant={isPositive ? 'default' : 'destructive'} className="text-xs">
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {formatPercentage(change)}
            </Badge>
            {description && (
              <span className="text-xs text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface KpiCardsProps {
  totalReach: number;
  totalEngagement: number;
  avgEngagementRate: number;
  followerGrowth: number;
  reachChange?: number;
  engagementChange?: number;
  rateChange?: number;
  growthChange?: number;
}

export const KpiCards = ({
  totalReach,
  totalEngagement,
  avgEngagementRate,
  followerGrowth,
  reachChange,
  engagementChange,
  rateChange,
  growthChange,
}: KpiCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-slide-up">
      <KpiCard
        title="Alcance Total"
        value={formatNumber(totalReach)}
        change={reachChange}
        icon={<Target className="h-5 w-5" />}
        description="últimos 30 dias"
      />
      <KpiCard
        title="Engajamento"
        value={formatNumber(totalEngagement)}
        change={engagementChange}
        icon={<Heart className="h-5 w-5" />}
        description="curtidas + comentários"
      />
      <KpiCard
        title="Taxa de Engajamento"
        value={`${avgEngagementRate.toFixed(1)}%`}
        change={rateChange}
        icon={<Eye className="h-5 w-5" />}
        description="média do período"
      />
      <KpiCard
        title="Crescimento"
        value={`+${formatNumber(followerGrowth)}`}
        change={growthChange}
        icon={<Users className="h-5 w-5" />}
        description="novos seguidores"
      />
    </div>
  );
};
