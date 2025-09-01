import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Package, Plus, Search, Filter, MessageSquare, Eye, Settings, User, UserPlus } from "lucide-react"
import { getCabinetsData, createCabinet, createUser } from "@/api/cabinets"
import { useToast } from "@/hooks/useToast"

interface Cabinet {
  id: string
  clientName: string
  bankTemplate: string
  status: 'active' | 'inactive' | 'pending'
  createdDate: string
  lastAccess: string
  documentsCount: number
  chatEnabled: boolean
}

interface BankTemplate {
  id: string
  name: string
  logo: string
  description: string
  features: string[]
}

export function Cabinets() {
  const [cabinets, setCabinets] = useState<Cabinet[]>([])
  const [templates, setTemplates] = useState<BankTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState<BankTemplate | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'client'
  })
  const { toast } = useToast()

  console.log('Cabinets: Component mounted')

  useEffect(() => {
    const fetchCabinetsData = async () => {
      try {
        console.log('Cabinets: Fetching cabinets data')
        const response = await getCabinetsData() as any
        setCabinets(response.cabinets)
        setTemplates(response.templates)
        console.log('Cabinets: Cabinets data loaded successfully')
      } catch (error) {
        console.error('Cabinets: Error fetching cabinets data:', error)
        toast({
          title: "Error",
          description: "Failed to load cabinets data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCabinetsData()
  }, [toast])

  const handleCreateCabinet = async () => {
    if (!selectedTemplate || !newClientName.trim()) {
      toast({
        title: "Error",
        description: "Please select a template and enter client name",
        variant: "destructive"
      })
      return
    }

    try {
      console.log('Cabinets: Creating cabinet for client:', newClientName)
      const response = await createCabinet({ 
        templateId: selectedTemplate.id, 
        clientName: newClientName.trim() 
      }) as any
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Cabinet created successfully",
        })
        
        // Add new cabinet to the list
        const newCabinet: Cabinet = {
          id: response.cabinetId,
          clientName: newClientName.trim(),
          bankTemplate: selectedTemplate.name,
          status: 'active',
          createdDate: new Date().toISOString(),
          lastAccess: new Date().toISOString(),
          documentsCount: 0,
          chatEnabled: true
        }
        setCabinets(prev => [newCabinet, ...prev])
        
        // Reset form
        setNewClientName('')
        setSelectedTemplate(null)
        setShowCreateDialog(false)
      }
    } catch (error) {
      console.error('Cabinets: Error creating cabinet:', error)
      toast({
        title: "Error",
        description: "Failed to create cabinet",
        variant: "destructive"
      })
    }
  }

  const handleCreateUser = async () => {
    if (!newUserData.name.trim() || !newUserData.email.trim()) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      })
      return
    }

    try {
      console.log('Cabinets: Creating user:', newUserData.name)
      const response = await createUser(newUserData) as any
      
      if (response.success) {
        toast({
          title: "Success",
          description: "User created successfully with chat access",
        })
        
        // Reset form
        setNewUserData({
          name: '',
          email: '',
          phone: '',
          role: 'client'
        })
        setShowUserDialog(false)
      }
    } catch (error) {
      console.error('Cabinets: Error creating user:', error)
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive"
      })
    }
  }

  const handlePreviewTemplate = (template: BankTemplate) => {
    setSelectedTemplate(template)
    setShowPreviewDialog(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-500/20 text-green-400">Active</Badge>
      case 'inactive': return <Badge className="bg-gray-500/20 text-gray-400">Inactive</Badge>
      case 'pending': return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredCabinets = cabinets.filter(cabinet => {
    const matchesSearch = cabinet.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cabinet.bankTemplate.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || cabinet.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Client Cabinets</h1>
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
          <h1 className="text-3xl font-bold">Client Cabinets</h1>
          <p className="text-muted-foreground">Manage client bank cabinets and templates</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Name *</Label>
                  <Input
                    id="userName"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter user name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email *</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userPhone">Phone</Label>
                  <Input
                    id="userPhone"
                    value={newUserData.phone}
                    onChange={(e) => setNewUserData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userRole">Role</Label>
                  <Select value={newUserData.role} onValueChange={(value) => setNewUserData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="operator">Operator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowUserDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateUser}>
                    Create User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Cabinet
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle>Create New Cabinet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Enter client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bank Template</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTemplate?.id === template.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span className="text-sm font-medium">{template.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateCabinet}>
                    Create Cabinet
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="cabinets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white/10">
          <TabsTrigger value="cabinets">Active Cabinets</TabsTrigger>
          <TabsTrigger value="templates">Bank Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="cabinets" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cabinets..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cabinets</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cabinets.length}</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Cabinets</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cabinets.filter(c => c.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently active
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cabinets.reduce((sum, cabinet) => sum + cabinet.documentsCount, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total documents
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chat Enabled</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cabinets.filter(c => c.chatEnabled).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  With chat support
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Client Cabinets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCabinets.map((cabinet) => (
                  <div key={cabinet.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{cabinet.clientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {cabinet.bankTemplate} • {cabinet.documentsCount} documents
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Created: {new Date(cabinet.createdDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last access: {new Date(cabinet.lastAccess).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(cabinet.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        {cabinet.chatEnabled && (
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="glass-effect card-hover">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Bank Template</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Features:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-1 w-1 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => {
                        setSelectedTemplate(template)
                        setShowCreateDialog(true)
                      }}
                    >
                      Use Template
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePreviewTemplate(template)}
                    >
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="bg-white dark:bg-gray-900 max-w-4xl">
          <DialogHeader>
            <DialogTitle>Bank Template Preview - {selectedTemplate?.name}</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedTemplate.name}</h3>
                    <p className="text-white/80">Online Banking Portal</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 p-3 rounded">
                    <p className="text-sm text-white/80">Account Balance</p>
                    <p className="text-lg font-bold">$12,345.67</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded">
                    <p className="text-sm text-white/80">Available Credit</p>
                    <p className="text-lg font-bold">$5,000.00</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded">
                    <p className="text-sm text-white/80">Rewards Points</p>
                    <p className="text-lg font-bold">2,450</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Template Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {selectedTemplate.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Navigation Menu:</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">Dashboard</div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">Accounts</div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">Transfers</div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">Bill Pay</div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">Support</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}