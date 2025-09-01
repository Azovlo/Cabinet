import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Phone, Upload, Download, Search, Filter, Plus, Clock } from "lucide-react"
import { getCRMData, uploadDatabase, exportClients } from "@/api/crm"
import { useToast } from "@/hooks/useToast"

interface Client {
  id: string
  name: string
  phone: string
  email: string
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'closed'
  assignedTo: string
  lastContact: string
  source: string
}

interface Call {
  id: string
  clientId: string
  clientName: string
  duration: number
  outcome: string
  date: string
  notes: string
}

export function CRM() {
  const [clients, setClients] = useState<Client[]>([])
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const { toast } = useToast()

  console.log('CRM: Component mounted')

  useEffect(() => {
    const fetchCRMData = async () => {
      try {
        console.log('CRM: Fetching CRM data')
        const response = await getCRMData() as any
        setClients(response.clients)
        setCalls(response.calls)
        console.log('CRM: CRM data loaded successfully')
      } catch (error) {
        console.error('CRM: Error fetching CRM data:', error)
        toast({
          title: "Error",
          description: "Failed to load CRM data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCRMData()
  }, [toast])

  const handleUploadDatabase = async () => {
    try {
      console.log('CRM: Uploading database')
      const response = await uploadDatabase({ file: 'mock-file' }) as any
      if (response.success) {
        toast({
          title: "Success",
          description: "Database uploaded successfully",
        })
      }
    } catch (error) {
      console.error('CRM: Error uploading database:', error)
      toast({
        title: "Error",
        description: "Failed to upload database",
        variant: "destructive"
      })
    }
  }

  const handleExportClients = async () => {
    try {
      console.log('CRM: Exporting clients')
      const response = await exportClients({ format: 'csv' }) as any
      if (response.success) {
        toast({
          title: "Success",
          description: "Clients exported successfully",
        })
      }
    } catch (error) {
      console.error('CRM: Error exporting clients:', error)
      toast({
        title: "Error",
        description: "Failed to export clients",
        variant: "destructive"
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge className="bg-blue-500/20 text-blue-400">New</Badge>
      case 'contacted': return <Badge className="bg-yellow-500/20 text-yellow-400">Contacted</Badge>
      case 'interested': return <Badge className="bg-green-500/20 text-green-400">Interested</Badge>
      case 'converted': return <Badge className="bg-purple-500/20 text-purple-400">Converted</Badge>
      case 'closed': return <Badge className="bg-gray-500/20 text-gray-400">Closed</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">CRM System</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-white/10 rounded w-full"></div>
          <div className="h-64 bg-white/10 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">CRM System</h1>
          <p className="text-muted-foreground">Manage your clients and track interactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUploadDatabase}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Database
          </Button>
          <Button variant="outline" onClick={handleExportClients}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      <Tabs defaultValue="clients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white/10">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="calls">Call History</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clients.length}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clients.filter(c => c.status === 'new').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  This week
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {clients.filter(c => c.status === 'converted').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((clients.filter(c => c.status === 'converted').length / clients.length) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Overall rate
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Client Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {client.phone} • {client.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{client.assignedTo}</p>
                        <p className="text-xs text-muted-foreground">
                          Last contact: {new Date(client.lastContact).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(client.status)}
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="space-y-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">{call.clientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {call.notes}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{call.outcome}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {call.duration}m • {new Date(call.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}