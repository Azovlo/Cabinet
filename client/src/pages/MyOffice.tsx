import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, Building2, Shield, Clock } from "lucide-react"
import { getOfficeData } from "@/api/office"
import { useToast } from "@/hooks/useToast"

interface Employee {
  id: string
  name: string
  email: string
  position: string
  group: string
  status: 'active' | 'inactive'
  lastLogin: string
}

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
}

interface Position {
  id: string
  title: string
  permissions: string[]
  employeeCount: number
}

export function MyOffice() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  console.log('MyOffice: Component mounted')

  useEffect(() => {
    const fetchOfficeData = async () => {
      try {
        console.log('MyOffice: Fetching office data')
        const response = await getOfficeData() as any
        setEmployees(response.employees)
        setGroups(response.groups)
        setPositions(response.positions)
        console.log('MyOffice: Office data loaded successfully')
      } catch (error) {
        console.error('MyOffice: Error fetching office data:', error)
        toast({
          title: "Error",
          description: "Failed to load office data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchOfficeData()
  }, [toast])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Office</h1>
        </div>
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
          <h1 className="text-3xl font-bold">My Office</h1>
          <p className="text-muted-foreground">Manage your team, groups, and positions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/10">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <div className="grid gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="glass-effect">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{employee.position}</p>
                        <p className="text-xs text-muted-foreground">{employee.group}</p>
                      </div>
                      <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                        {employee.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {new Date(employee.lastLogin).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="glass-effect card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {group.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {group.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {group.memberCount} members
                    </span>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <div className="grid gap-4">
            {positions.map((position) => (
              <Card key={position.id} className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {position.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {position.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {position.employeeCount} employees
                      </span>
                      <Button size="sm" variant="outline">
                        Edit Permissions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}