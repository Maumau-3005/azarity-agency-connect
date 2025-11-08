import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Heart, Info, Instagram, Music } from 'lucide-react';
import { formatNumber } from '@/lib/data';

interface SwipeCardProps {
  id: string;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

export const SwipeCard = ({ id, onSwipe }: SwipeCardProps) => {
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const offsetY = info.offset.y;
    const velocity = info.velocity.x;
    const velocityY = info.velocity.y;

    if (Math.abs(offsetY) > 100 && Math.abs(offsetY) > Math.abs(offset)) {
      if (offsetY < -100 || velocityY < -500) {
        setExitY(-1000);
        onSwipe('up');
      }
    } else if (Math.abs(offset) > 100) {
      if (offset > 100 || velocity > 500) {
        setExitX(1000);
        onSwipe('right');
      } else {
        setExitX(-1000);
        onSwipe('left');
      }
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ x: exitX, y: exitY }}
      transition={{ duration: 0.3 }}
      className="absolute w-full max-w-md cursor-grab active:cursor-grabbing"
      whileTap={{ scale: 0.95 }}
    >
      <Card className="glass-card border-2 shadow-2xl">
        <div className="relative h-64 overflow-hidden rounded-t-2xl gradient-primary">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h2 className="text-4xl font-bold mb-2">Julia Azarity</h2>
              <p className="text-lg opacity-90">Criadora de Conteúdo Premium</p>
            </div>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Métricas & Performance</span>
            <div className="flex gap-2">
              <Badge variant="secondary" className="gap-1">
                <Instagram className="w-3 h-3" />
                127K
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Music className="w-3 h-3" />
                215K
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Alcance Total</p>
              <p className="text-2xl font-bold gradient-text">{formatNumber(1156800)}</p>
              <p className="text-xs text-muted-foreground">50 dias (IG)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Engajamento Médio</p>
              <p className="text-2xl font-bold gradient-text">8.4%</p>
              <p className="text-xs text-muted-foreground">acima da média</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Destaques</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Conteúdo autêntico que gera conexão</li>
              <li>• Audiência engajada em lifestyle & moda</li>
              <li>• Resultados consistentes em 60+ dias</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center pt-4">
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 hover:bg-destructive hover:text-white hover:border-destructive"
              onClick={() => onSwipe('left')}
              aria-label="Negar"
            >
              <X className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 hover:bg-secondary hover:text-white hover:border-secondary"
              onClick={() => onSwipe('up')}
              aria-label="Mais informações"
            >
              <Info className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 hover:bg-primary hover:text-white hover:border-primary"
              onClick={() => onSwipe('right')}
              aria-label="Match"
            >
              <Heart className="w-6 h-6" />
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            ← Negar | ↑ Mais Info | → Match
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
