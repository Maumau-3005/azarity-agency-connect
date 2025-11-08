import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Eye, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Post, formatNumber } from '@/lib/data';

interface PostGridProps {
  posts: Post[];
}

export const PostGrid = ({ posts }: PostGridProps) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold line-clamp-2">{post.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {formatNumber(post.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {formatNumber(post.likes)}
                    </span>
                  </div>
                </div>
              </div>
              <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm">
                {post.type}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedPost?.title}
              {selectedPost?.url && (
                <a
                  href={selectedPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedPost?.platform === 'instagram' ? 'Instagram' : 'TikTok'} • {new Date(selectedPost?.date || '').toLocaleDateString('pt-BR')}
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-6">
              <img
                src={selectedPost.thumbnail}
                alt={selectedPost.title}
                className="w-full aspect-square object-cover rounded-lg"
              />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{formatNumber(selectedPost.views)}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{formatNumber(selectedPost.likes)}</p>
                    <p className="text-xs text-muted-foreground">Curtidas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{formatNumber(selectedPost.comments)}</p>
                    <p className="text-xs text-muted-foreground">Comentários</p>
                  </div>
                </div>
                {selectedPost.shares && (
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{formatNumber(selectedPost.shares)}</p>
                      <p className="text-xs text-muted-foreground">Compartilhamentos</p>
                    </div>
                  </div>
                )}
                {selectedPost.saves && (
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{formatNumber(selectedPost.saves)}</p>
                      <p className="text-xs text-muted-foreground">Salvamentos</p>
                    </div>
                  </div>
                )}
                {selectedPost.reach && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{formatNumber(selectedPost.reach)}</p>
                      <p className="text-xs text-muted-foreground">Alcance</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedPost.topic && (
                <div>
                  <Badge variant="secondary">{selectedPost.topic}</Badge>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
