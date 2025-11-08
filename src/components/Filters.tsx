import { Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useFiltersStore } from '@/lib/store';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const Filters = () => {
  const { dateRange, platform, postType, setDateRange, setPlatform, setPostType } = useFiltersStore();

  const quickRanges = [
    { label: 'Últimos 7 dias', days: 7 },
    { label: 'Últimos 30 dias', days: 30 },
    { label: 'Últimos 60 dias', days: 60 },
    { label: 'Últimos 90 dias', days: 90 },
  ];

  const setQuickRange = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    setDateRange({ from, to });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-medium">Filtros</span>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            {format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR })} - {format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {quickRanges.map((range) => (
                <Button
                  key={range.days}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickRange(range.days)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <CalendarComponent
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange({ from: range.from, to: range.to });
                }
              }}
              locale={ptBR}
            />
          </div>
        </PopoverContent>
      </Popover>

      <Select value={platform} onValueChange={(value: any) => setPlatform(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Plataforma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="instagram">Instagram</SelectItem>
          <SelectItem value="tiktok">TikTok</SelectItem>
        </SelectContent>
      </Select>

      <Select value={postType} onValueChange={(value: any) => setPostType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo de post" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="reels">Reels</SelectItem>
          <SelectItem value="video">Vídeos</SelectItem>
          <SelectItem value="photo">Fotos</SelectItem>
          <SelectItem value="carousel">Carrosséis</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
