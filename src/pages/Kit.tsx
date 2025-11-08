import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Share2, Mail, Instagram, Music, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { formatNumber } from '@/lib/data';

const Kit = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Link copiado para área de transferência!');
  };

  return (
    <>
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <Button onClick={handleShare} variant="outline" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button onClick={handlePrint} className="gap-2">
          <Download className="w-4 h-4" />
          Baixar PDF
        </Button>
      </div>

      <div className="min-h-screen bg-background">
        <div className="no-print container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="kit-container max-w-5xl mx-auto p-8 space-y-16">
          {/* Hero */}
          <section className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full gradient-primary mx-auto mb-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">Julia Azarity</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Criadora de conteúdo especializada em lifestyle, moda e beleza.
              Conectando marcas com uma audiência engajada e autêntica.
            </p>
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Instagram className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <p className="text-2xl font-bold">127.5K</p>
                  <p className="text-xs text-muted-foreground">Seguidores</p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="flex items-center gap-2">
                <Music className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <p className="text-2xl font-bold">215.8K</p>
                  <p className="text-xs text-muted-foreground">Seguidores</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sobre */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Sobre</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Julia Azarity é uma criadora de conteúdo que se destaca pela autenticidade e conexão 
              genuína com sua audiência. Com foco em lifestyle, moda e beleza, ela compartilha 
              dicas, inspirações e momentos do dia a dia de forma única e envolvente.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Badge variant="secondary" className="justify-center py-3 text-sm">
                Lifestyle & Rotina
              </Badge>
              <Badge variant="secondary" className="justify-center py-3 text-sm">
                Moda & Estilo
              </Badge>
              <Badge variant="secondary" className="justify-center py-3 text-sm">
                Beleza & Bem-estar
              </Badge>
            </div>
          </section>

          {/* Métricas */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Métricas & Performance</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Instagram className="w-8 h-8 text-primary" />
                    <Badge>Últimos 50 dias</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Instagram</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Alcance Total</span>
                      <span className="font-bold gradient-text">{formatNumber(1156800)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engajamento Médio</span>
                      <span className="font-bold">8.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Crescimento</span>
                      <span className="font-bold">+18.2K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saves Médio</span>
                      <span className="font-bold">950/post</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <Music className="w-8 h-8 text-primary" />
                    <Badge>Últimos 60 dias</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-4">TikTok</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Visualizações</span>
                      <span className="font-bold gradient-text">{formatNumber(1700000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engajamento Médio</span>
                      <span className="font-bold">9.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Crescimento</span>
                      <span className="font-bold">+27.6K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shares Médio</span>
                      <span className="font-bold">1.4K/vídeo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Destaques */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Destaques & Cases</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-3 text-lg">Vídeo Viral - 234K Views</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  POV sobre descoberta de estilo pessoal atingiu mais de 230 mil visualizações 
                  em 48 horas, com taxa de compartilhamento 340% acima da média.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">TikTok</Badge>
                  <Badge variant="outline">Fashion</Badge>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold mb-3 text-lg">Série de Reels - Alto Engajamento</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Série sobre rotina matinal transformadora alcançou 89K views com taxa de 
                  salvamento 15% acima da média do setor.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Instagram</Badge>
                  <Badge variant="outline">Lifestyle</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Audiência */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Audiência</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-4xl font-bold gradient-text mb-2">75%</div>
                <p className="text-muted-foreground">Mulheres</p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-4xl font-bold gradient-text mb-2">18-34</div>
                <p className="text-muted-foreground">Faixa etária principal</p>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center">
                <div className="text-4xl font-bold gradient-text mb-2">Top 3</div>
                <p className="text-muted-foreground">SP, RJ, MG</p>
              </div>
            </div>
          </section>

          {/* Contato */}
          <section className="space-y-6 text-center">
            <h2 className="text-3xl font-bold">Vamos Conversar?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interessado em uma parceria? Entre em contato para discutir oportunidades 
              de colaboração e criar conteúdo autêntico para sua marca.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" className="gap-2">
                <Mail className="w-5 h-5" />
                contato@juliaazarity.com
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://instagram.com/juliaazarity" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Instagram className="w-5 h-5" />
                  @juliaazarity
                </a>
              </Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-muted-foreground pt-8 border-t">
            <p>© 2025 Julia Azarity. Todos os direitos reservados.</p>
            <p className="mt-2">Media Kit atualizado em Janeiro 2025</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Kit;
