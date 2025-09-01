import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, DollarSign, Ticket, Calendar, TrendingUp, AlertTriangle } from "lucide-react"
import { getDashboardStats, getSubscriptionStatus } from "@/api/dashboard"
import { useToast } from "@/hooks/useToast"
import { useNavigate } from "react-router-dom"

interface DashboardStats {
  totalClients: number
  activeSubscriptions: number
  monthlyRevenue: number
  supportTickets: number
}

interface Activity {
  id: string
  type: string
  message: string
  timestamp: string
}

interface Subscription {
  plan: string
  remainingDays: number
  status: string
  expiryDate: string
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const navigate = useNavigate()

  console.log('Dashboard: Component mounted')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Dashboard: Fetching dashboard data')
        const [statsResponse, subscriptionResponse] = await Promise.all([
          getDashboardStats(),
          getSubscriptionStatus()
        ])

        const statsData = statsResponse as any
        const subscriptionData = subscriptionResponse as any

        setStats(statsData.stats)
        setActivities(statsData.recentActivity)
        setSubscription(subscriptionData.subscription)

        console.log('Dashboard: Data loaded successfully')
      } catch (error) {
        console.error('Dashboard: Error fetching data:', error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [toast])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'client': return <Users className="h-4 w-4" />
      case 'payment': return <DollarSign className="h-4 w-4" />
      case 'support': return <Ticket className="h-4 w-4" />
      case 'subscription': return <TrendingUp className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="glass-effect animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-white/10 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Subscription Warning */}
      {subscription && subscription.remainingDays <= 30 && (
        <Card className="border-orange-500/50 bg-orange-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Your {subscription.plan} subscription expires in {subscription.remainingDays} days
                </p>
                <p className="text-xs text-muted-foreground">
                  Renew now to avoid service interruption
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => navigate('/tariffs')}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Renew Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-effect card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalClients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.supportTickets}</div>
            <p className="text-xs text-muted-foreground">
              -3 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Status */}
      {subscription && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{subscription.plan}</p>
                <p className="text-sm text-muted-foreground">
                  Expires on {new Date(subscription.expiryDate).toLocaleDateString()}
                </p>
              </div>
              <Badge variant={subscription.status === 'active' ? 'default' : 'destructive'}>
                {subscription.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Days remaining</span>
                <span>{subscription.remainingDays} days</span>
              </div>
              <Progress 
                value={(subscription.remainingDays / 30) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="mt-1 p-1 rounded-full bg-primary/20">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}