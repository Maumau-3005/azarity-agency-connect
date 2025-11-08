import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SwipeCard } from '@/components/SwipeCard';
import { useSwipeStore } from '@/lib/store';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const Agency = () => {
  const [currentCardId] = useState('card-1');
  const [showResult, setShowResult] = useState<'match' | 'deny' | 'info' | null>(null);
  const { actions, addAction, getMatches } = useSwipeStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleSwipe('left');
      } else if (e.key === 'ArrowRight') {
        handleSwipe('right');
      } else if (e.key === 'ArrowUp') {
        handleSwipe('up');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCardId]);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    const actionMap = {
      left: 'deny' as const,
      right: 'match' as const,
      up: 'info' as const,
    };

    const action = actionMap[direction];
    addAction(currentCardId, action);
    setShowResult(action);

    setTimeout(() => {
      setShowResult(null);
      if (action === 'info') {
        window.open('/kit', '_blank');
      }
    }, 1500);
  };

  const exportMatches = () => {
    const matches = getMatches();
    const csv = [
      ['Timestamp', 'ID', 'Ação'],
      ...matches.map(m => [
        format(new Date(m.timestamp), 'dd/MM/yyyy HH:mm:ss'),
        m.cardId,
        m.action,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `julia-azarity-matches-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const matches = getMatches();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Área para Agências</h1>
              <p className="text-muted-foreground">Deslize para avaliar a parceria</p>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <List className="w-4 h-4" />
                Matches ({matches.length})
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Matches Salvos</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {matches.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Nenhum match ainda. Deslize para a direita para fazer match!
                  </p>
                ) : (
                  <>
                    {matches.map((match) => (
                      <div
                        key={match.timestamp}
                        className="p-4 rounded-lg border border-border/50 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="default">Match</Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(match.timestamp), 'dd/MM HH:mm')}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{match.cardId}</p>
                      </div>
                    ))}
                    <Button onClick={exportMatches} className="w-full gap-2">
                      <Download className="w-4 h-4" />
                      Exportar Matches
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-4">
              Use as setas do teclado ou arraste o card
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <kbd className="px-3 py-1 rounded bg-muted text-sm">←</kbd>
                <span className="text-sm">Negar</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-3 py-1 rounded bg-muted text-sm">↑</kbd>
                <span className="text-sm">Ver Kit</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-3 py-1 rounded bg-muted text-sm">→</kbd>
                <span className="text-sm">Match</span>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
            {!showResult && <SwipeCard id={currentCardId} onSwipe={handleSwipe} />}
          </div>

          {showResult && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-slide-up">
              <div
                className={`text-6xl font-bold px-8 py-4 rounded-2xl ${
                  showResult === 'match'
                    ? 'bg-primary/20 text-primary'
                    : showResult === 'deny'
                    ? 'bg-destructive/20 text-destructive'
                    : 'bg-secondary/20 text-secondary'
                }`}
              >
                {showResult === 'match' && '❤️ Match!'}
                {showResult === 'deny' && '✗ Negado'}
                {showResult === 'info' && 'ℹ️ Abrindo...'}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 glass-card rounded-2xl">
              <div className="text-4xl mb-4">👈</div>
              <h3 className="font-bold mb-2">Negar</h3>
              <p className="text-sm text-muted-foreground">
                Não é o perfil que você procura no momento
              </p>
            </div>
            <div className="text-center p-6 glass-card rounded-2xl">
              <div className="text-4xl mb-4">👆</div>
              <h3 className="font-bold mb-2">Ver Mais</h3>
              <p className="text-sm text-muted-foreground">
                Abrir media kit completo com todos os detalhes
              </p>
            </div>
            <div className="text-center p-6 glass-card rounded-2xl">
              <div className="text-4xl mb-4">👉</div>
              <h3 className="font-bold mb-2">Match</h3>
              <p className="text-sm text-muted-foreground">
                Interesse em parceria! Salve para exportar depois
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agency;
