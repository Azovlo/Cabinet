import { useEffect, useState, useCallback, memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Users, Package, FileText, MessageSquare, BarChart3, Shield } from "lucide-react"
import { getModules, toggleModule } from "@/api/modules"
import { useToast } from "@/hooks/useToast"

interface Module {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
  features: string[]
  price: number
}

const ModuleCard = memo(({ module, onToggle, isToggling }: {
  module: Module
  onToggle: (id: string, enabled: boolean) => void
  isToggling: boolean
}) => {
  const getModuleIcon = useCallback((iconName: string) => {
    switch (iconName) {
      case 'users': return <Users className="h-8 w-8" />
      case 'package': return <Package className="h-8 w-8" />
      case 'file-text': return <FileText className="h-8 w-8" />
      case 'message-square': return <MessageSquare className="h-8 w-8" />
      case 'bar-chart': return <BarChart3 className="h-8 w-8" />
      case 'shield': return <Shield className="h-8 w-8" />
      default: return <Package className="h-8 w-8" />
    }
  }, [])

  const handleToggle = useCallback((checked: boolean) => {
    onToggle(module.id, checked)
  }, [module.id, onToggle])

  return (
    <Card className={`glass-effect card-hover transition-all duration-300 ${module.enabled ? 'ring-2 ring-primary/20' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg transition-colors ${module.enabled ? 'bg-primary/20' : 'bg-white/10'}`}>
              {getModuleIcon(module.icon)}
            </div>
            <div>
              <CardTitle className="text-lg">{module.name}</CardTitle>
              <Badge variant={module.enabled ? 'default' : 'secondary'} className="mt-1">
                {module.enabled ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
          <Switch
            checked={module.enabled}
            onCheckedChange={handleToggle}
            disabled={isToggling}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {module.description}
        </p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Features:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {module.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-1 w-1 bg-primary rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-lg font-bold">${module.price}/month</span>
          <Button
            size="sm"
            variant={module.enabled ? "outline" : "default"}
            disabled={isToggling}
            className="transition-all duration-200"
          >
            {module.enabled ? 'Configure' : 'Activate'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

ModuleCard.displayName = 'ModuleCard'

const Modules = memo(() => {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)
  const { toast } = useToast()

  console.log('Modules: Component mounted')

  const fetchModules = useCallback(async () => {
    try {
      console.log('Modules: Fetching modules')
      const response = await getModules() as any
      setModules(response.modules)
      console.log('Modules: Modules loaded successfully')
    } catch (error) {
      console.error('Modules: Error fetching modules:', error)
      toast({
        title: "Error",
        description: "Failed to load modules",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchModules()
  }, [fetchModules])

  const handleToggleModule = useCallback(async (moduleId: string, enabled: boolean) => {
    try {
      console.log('Modules: Toggling module:', moduleId, enabled)
      setToggling(moduleId)

      const response = await toggleModule({ moduleId, enabled }) as any

      if (response.success) {
        setModules(prev => prev.map(module =>
          module.id === moduleId ? { ...module, enabled } : module
        ))
        toast({
          title: "Success",
          description: `Module ${enabled ? 'enabled' : 'disabled'} successfully`,
        })
      }
    } catch (error) {
      console.error('Modules: Error toggling module:', error)
      toast({
        title: "Error",
        description: "Failed to update module status",
        variant: "destructive"
      })
    } finally {
      setToggling(null)
    }
  }, [toast])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded w-48 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-64"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass-effect animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-white/10 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Modules
        </h1>
        <p className="text-muted-foreground">Manage your business modules and features</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onToggle={handleToggleModule}
            isToggling={toggling === module.id}
          />
        ))}
      </div>
    </div>
  )
})

Modules.displayName = 'Modules'

export { Modules }