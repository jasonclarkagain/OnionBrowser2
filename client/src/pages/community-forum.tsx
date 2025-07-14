import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, Reply, Clock, Pin, User, Search, Plus, LogIn, LogOut } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function CommunityForum() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  const forumPosts = [
    {
      id: 1,
      title: "Best VPN for beginners in 2024?",
      content: "Looking for recommendations for a privacy-focused VPN that's easy to set up...",
      author: "PrivacySeeker",
      replies: 15,
      likes: 8,
      category: "vpn",
      isPinned: false,
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Tor Browser security best practices",
      content: "Compiled a list of essential security practices when using Tor Browser...",
      author: "TorExpert",
      replies: 23,
      likes: 45,
      category: "tor",
      isPinned: true,
      timeAgo: "1 day ago"
    },
    {
      id: 3,
      title: "Signal vs Telegram: Which is more secure?",
      content: "Comparing the security features of popular messaging apps...",
      author: "SecureComm",
      replies: 31,
      likes: 22,
      category: "messaging",
      isPinned: false,
      timeAgo: "3 days ago"
    },
    {
      id: 4,
      title: "Mobile privacy setup guide",
      content: "Step-by-step guide to configure iOS and Android for maximum privacy...",
      author: "MobileGuard",
      replies: 12,
      likes: 18,
      category: "mobile",
      isPinned: true,
      timeAgo: "1 week ago"
    },
    {
      id: 5,
      title: "Password manager recommendations",
      content: "What are your thoughts on different password managers available?",
      author: "PassSecure",
      replies: 27,
      likes: 19,
      category: "passwords",
      isPinned: false,
      timeAgo: "2 weeks ago"
    }
  ];

  const categories = [
    { id: "all", name: "All Posts", count: forumPosts.length },
    { id: "vpn", name: "VPN", count: forumPosts.filter(p => p.category === "vpn").length },
    { id: "tor", name: "Tor", count: forumPosts.filter(p => p.category === "tor").length },
    { id: "messaging", name: "Messaging", count: forumPosts.filter(p => p.category === "messaging").length },
    { id: "mobile", name: "Mobile", count: forumPosts.filter(p => p.category === "mobile").length },
    { id: "passwords", name: "Passwords", count: forumPosts.filter(p => p.category === "passwords").length }
  ];

  const filteredPosts = (category: string) => {
    let posts = category === "all" ? forumPosts : forumPosts.filter(p => p.category === category);
    if (searchTerm) {
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return posts.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  };

  const handleNewPost = () => {
    // In a real app, this would submit to the backend
    setNewPostTitle("");
    setNewPostContent("");
    setShowNewPost(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ backgroundColor: "var(--cyber-black)" }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 glow-text">
            Community <span style={{ color: "var(--matrix-green)" }}>Forum</span>
          </h1>
          <p className="text-xl mb-6" style={{ color: "var(--text-secondary)" }}>
            Connect with privacy enthusiasts, share knowledge, and get expert advice
          </p>
        </div>

        {/* Search and New Post */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  style={{ 
                    backgroundColor: "var(--cyber-black)",
                    borderColor: "var(--cyber-border)"
                  }}
                />
              </div>
              <Button 
                onClick={() => setShowNewPost(!showNewPost)}
                style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}
              >
                <Plus className="mr-2 w-4 h-4" />
                New Post
              </Button>
            </div>

            {/* New Post Form */}
            {showNewPost && (
              <div className="mt-6 space-y-4 p-4 rounded-lg" style={{ backgroundColor: "var(--cyber-black)" }}>
                <Input
                  placeholder="Post title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  style={{ 
                    backgroundColor: "var(--cyber-gray)",
                    borderColor: "var(--cyber-border)"
                  }}
                />
                <Textarea
                  placeholder="Share your thoughts, questions, or insights..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                  style={{ 
                    backgroundColor: "var(--cyber-gray)",
                    borderColor: "var(--cyber-border)"
                  }}
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleNewPost}
                    style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}
                  >
                    Post Discussion
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewPost(false)}
                    style={{ borderColor: "var(--cyber-border)", color: "var(--text-secondary)" }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Forum Stats */}
        <Card className="cyber-border mb-8" style={{ backgroundColor: "var(--cyber-gray)" }}>
          <CardHeader>
            <CardTitle>Community Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>1,247</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>523</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Discussions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>2,891</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: "var(--matrix-green)" }}>89</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Online Now</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forum Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6" style={{ backgroundColor: "var(--cyber-gray)" }}>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="space-y-4">
                {filteredPosts(category.id).map((post) => (
                  <Card 
                    key={post.id} 
                    className="cyber-border transition-all duration-300 hover:shadow-glow"
                    style={{ backgroundColor: "var(--cyber-gray)" }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--matrix-green)" }}
                        >
                          <User className="w-5 h-5" style={{ color: "var(--cyber-black)" }} />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {post.isPinned && (
                                  <Pin className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                                )}
                                <h3 className="font-semibold text-lg">{post.title}</h3>
                                <Badge style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
                                  {post.category}
                                </Badge>
                              </div>
                              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                by {post.author} • {post.timeAgo}
                              </p>
                            </div>
                          </div>
                          
                          <p style={{ color: "var(--text-secondary)" }}>
                            {post.content}
                          </p>
                          
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                {post.replies} replies
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" style={{ color: "var(--matrix-green)" }} />
                              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                                {post.likes} likes
                              </span>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}
                            >
                              <Reply className="mr-2 w-3 h-3" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredPosts(category.id).length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-lg" style={{ color: "var(--text-secondary)" }}>
                      No discussions found matching your search.
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t" style={{ borderColor: "var(--cyber-border)" }}>
          <Link href="/contact">
            <Button variant="outline" style={{ borderColor: "var(--matrix-green)", color: "var(--matrix-green)" }}>
              ← Contact & Support
            </Button>
          </Link>
          
          <Link href="/support-center">
            <Button style={{ backgroundColor: "var(--matrix-green)", color: "var(--cyber-black)" }}>
              Support Center →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}