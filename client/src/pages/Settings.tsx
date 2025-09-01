import { useEffect, useState, useCallback, memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Building2, Settings as SettingsIcon, FileText, Palette } from "lucide-react"
import { getSettings, updateSettings } from "@/api/settings"
import { useToast } from "@/hooks/useToast"

interface SettingsData {
  personal: {
    name: string
    email: string
    phone: string
    timezone: string
    notifications: boolean
  }
  office: {
    companyName: string
    address: string
    workingHours: string
    ipWhitelist: string[]
    allowRemoteAccess: boolean
  }
  crm: {
    autoAssignment: boolean
    callRecording: boolean
    followUpReminders: boolean
    exportFormat: string
  }
  cabinets: {
    defaultBankTemplate: string
    clientChatEnabled: boolean
    documentRetention: number
    customBranding: boolean
  }
  pdfGenerator: {
    defaultTemplate: string
    watermark: boolean
    compression: string
    batchSize: number
  }
}

const SettingsTab = memo(({
  title,
  icon: Icon,
  children,
  onSave,
  saving
}: {
  title: string
  icon: any
  children: React.ReactNode
  onSave: () => void
  saving: boolean
}) => (
  <Card className="glass-effect">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {children}
      <Button
        onClick={onSave}
        disabled={saving}
        className="bg-primary hover:bg-primary/90 transition-colors"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </CardContent>
  </Card>
))

SettingsTab.displayName = 'SettingsTab'

const Settings = memo(() => {
  const [settings, setSettings] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  console.log('Settings: Component mounted')

  const fetchSettings = useCallback(async () => {
    try {
      console.log('Settings: Fetching settings')
      const response = await getSettings() as any
      setSettings(response.settings)
      console.log('Settings: Settings loaded successfully')
    } catch (error) {
      console.error('Settings: Error fetching settings:', error)
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const handleSave = useCallback(async (section: string, data: any) => {
    try {
      console.log('Settings: Saving settings for section:', section)
      setSaving(true)

      const response = await updateSettings({ section, data }) as any

      if (response.success) {
        toast({
          title: "Success",
          description: "Settings saved successfully",
        })
      }
    } catch (error) {
      console.error('Settings: Error saving settings:', error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }, [toast])

  const updatePersonalSettings = useCallback((field: string, value: any) => {
    setSettings(prev => prev ? {
      ...prev,
      personal: { ...prev.personal, [field]: value }
    } : null)
  }, [])

  const updateOfficeSettings = useCallback((field: string, value: any) => {
    setSettings(prev => prev ? {
      ...prev,
      office: { ...prev.office, [field]: value }
    } : null)
  }, [])

  const updateCrmSettings = useCallback((field: string, value: any) => {
    setSettings(prev => prev ? {
      ...prev,
      crm: { ...prev.crm, [field]: value }
    } : null)
  }, [])

  const updateCabinetsSettings = useCallback((field: string, value: any) => {
    setSettings(prev => prev ? {
      ...prev,
      cabinets: { ...prev.cabinets, [field]: value }
    } : null)
  }, [])

  const updatePdfSettings = useCallback((field: string, value: any) => {
    setSettings(prev => prev ? {
      ...prev,
      pdfGenerator: { ...prev.pdfGenerator, [field]: value }
    } : null)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded w-48 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-64"></div>
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
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/10">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="office">Office</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
          <TabsTrigger value="cabinets">Cabinets</TabsTrigger>
          <TabsTrigger value="pdf">PDF Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <SettingsTab
            title="Personal Information"
            icon={User}
            onSave={() => handleSave('personal', settings?.personal)}
            saving={saving}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings?.personal.name || ''}
                  onChange={(e) => updatePersonalSettings('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings?.personal.email || ''}
                  onChange={(e) => updatePersonalSettings('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={settings?.personal.phone || ''}
                  onChange={(e) => updatePersonalSettings('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={settings?.personal.timezone || ''}
                  onValueChange={(value) => updatePersonalSettings('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={settings?.personal.notifications || false}
                onCheckedChange={(checked) => updatePersonalSettings('notifications', checked)}
              />
              <Label htmlFor="notifications">Enable email notifications</Label>
            </div>
          </SettingsTab>
        </TabsContent>

        <TabsContent value="office" className="space-y-6">
          <SettingsTab
            title="Office Configuration"
            icon={Building2}
            onSave={() => handleSave('office', settings?.office)}
            saving={saving}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings?.office.companyName || ''}
                  onChange={(e) => updateOfficeSettings('companyName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingHours">Working Hours</Label>
                <Input
                  id="workingHours"
                  value={settings?.office.workingHours || ''}
                  onChange={(e) => updateOfficeSettings('workingHours', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Office Address</Label>
              <Textarea
                id="address"
                value={settings?.office.address || ''}
                onChange={(e) => updateOfficeSettings('address', e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="remoteAccess"
                checked={settings?.office.allowRemoteAccess || false}
                onCheckedChange={(checked) => updateOfficeSettings('allowRemoteAccess', checked)}
              />
              <Label htmlFor="remoteAccess">Allow remote access</Label>
            </div>
          </SettingsTab>
        </TabsContent>

        <TabsContent value="crm" className="space-y-6">
          <SettingsTab
            title="CRM Settings"
            icon={SettingsIcon}
            onSave={() => handleSave('crm', settings?.crm)}
            saving={saving}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="autoAssignment"
                  checked={settings?.crm.autoAssignment || false}
                  onCheckedChange={(checked) => updateCrmSettings('autoAssignment', checked)}
                />
                <Label htmlFor="autoAssignment">Auto-assign new clients</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="callRecording"
                  checked={settings?.crm.callRecording || false}
                  onCheckedChange={(checked) => updateCrmSettings('callRecording', checked)}
                />
                <Label htmlFor="callRecording">Enable call recording</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="followUpReminders"
                  checked={settings?.crm.followUpReminders || false}
                  onCheckedChange={(checked) => updateCrmSettings('followUpReminders', checked)}
                />
                <Label htmlFor="followUpReminders">Follow-up reminders</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="exportFormat">Export Format</Label>
                <Select
                  value={settings?.crm.exportFormat || ''}
                  onValueChange={(value) => updateCrmSettings('exportFormat', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SettingsTab>
        </TabsContent>

        <TabsContent value="cabinets" className="space-y-6">
          <SettingsTab
            title="Cabinet Settings"
            icon={Palette}
            onSave={() => handleSave('cabinets', settings?.cabinets)}
            saving={saving}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankTemplate">Default Bank Template</Label>
                <Select
                  value={settings?.cabinets.defaultBankTemplate || ''}
                  onValueChange={(value) => updateCabinetsSettings('defaultBankTemplate', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chase">Chase Bank</SelectItem>
                    <SelectItem value="wells-fargo">Wells Fargo</SelectItem>
                    <SelectItem value="bank-of-america">Bank of America</SelectItem>
                    <SelectItem value="citibank">Citibank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="clientChat"
                  checked={settings?.cabinets.clientChatEnabled || false}
                  onCheckedChange={(checked) => updateCabinetsSettings('clientChatEnabled', checked)}
                />
                <Label htmlFor="clientChat">Enable client chat</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentRetention">Document Retention (days)</Label>
                <Input
                  id="documentRetention"
                  type="number"
                  value={settings?.cabinets.documentRetention || 0}
                  onChange={(e) => updateCabinetsSettings('documentRetention', parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="customBranding"
                  checked={settings?.cabinets.customBranding || false}
                  onCheckedChange={(checked) => updateCabinetsSettings('customBranding', checked)}
                />
                <Label htmlFor="customBranding">Custom branding</Label>
              </div>
            </div>
          </SettingsTab>
        </TabsContent>

        <TabsContent value="pdf" className="space-y-6">
          <SettingsTab
            title="PDF Generator Settings"
            icon={FileText}
            onSave={() => handleSave('pdfGenerator', settings?.pdfGenerator)}
            saving={saving}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultTemplate">Default Template</Label>
                <Select
                  value={settings?.pdfGenerator.defaultTemplate || ''}
                  onValueChange={(value) => updatePdfSettings('defaultTemplate', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="watermark"
                  checked={settings?.pdfGenerator.watermark || false}
                  onCheckedChange={(checked) => updatePdfSettings('watermark', checked)}
                />
                <Label htmlFor="watermark">Add watermark</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="compression">Compression Level</Label>
                <Select
                  value={settings?.pdfGenerator.compression || ''}
                  onValueChange={(value) => updatePdfSettings('compression', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select compression" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchSize">Batch Size</Label>
                <Input
                  id="batchSize"
                  type="number"
                  value={settings?.pdfGenerator.batchSize || 0}
                  onChange={(e) => updatePdfSettings('batchSize', parseInt(e.target.value))}
                />
              </div>
            </div>
          </SettingsTab>
        </TabsContent>
      </Tabs>
    </div>
  )
})

Settings.displayName = 'Settings'

export { Settings }