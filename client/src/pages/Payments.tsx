import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Calendar, Download, DollarSign, Clock, CheckCircle } from "lucide-react"
import { getPaymentHistory, getPaymentMethods, addPaymentMethod } from "@/api/payments"
import { useToast } from "@/hooks/useToast"

interface Payment {
  id: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'failed'
  description: string
  method: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'bank'
  last4: string
  brand: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export function Payments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  console.log('Payments: Component mounted')

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        console.log('Payments: Fetching payment data')
        const [paymentsResponse, methodsResponse] = await Promise.all([
          getPaymentHistory(),
          getPaymentMethods()
        ])

        const paymentsData = paymentsResponse as any
        const methodsData = methodsResponse as any

        setPayments(paymentsData.payments)
        setPaymentMethods(methodsData.paymentMethods)
        console.log('Payments: Payment data loaded successfully')
      } catch (error) {
        console.error('Payments: Error fetching payment data:', error)
        toast({
          title: "Error",
          description: "Failed to load payment data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentData()
  }, [toast])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed': return <CreditCard className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
      case 'pending': return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
      case 'failed': return <Badge className="bg-red-500/20 text-red-400">Failed</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Payments</h1>
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
          <h1 className="text-3xl font-bold">Payments & Billing</h1>
          <p className="text-muted-foreground">Manage your payments and billing information</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <CreditCard className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white/10">
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Lifetime payments
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$300</div>
                <p className="text-xs text-muted-foreground">
                  Current billing cycle
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Feb 15</div>
                <p className="text-xs text-muted-foreground">
                  $300 due
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Payment History</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(payment.status)}
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(payment.date).toLocaleDateString()} • {payment.method}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">${payment.amount}</span>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`glass-effect ${method.isDefault ? 'ring-2 ring-primary/20' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {method.brand} •••• {method.last4}
                        </p>
                        {method.expiryMonth && method.expiryYear && (
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                          </p>
                        )}
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge variant="default" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="glass-effect border-dashed border-white/20">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <CreditCard className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium mb-2">Add Payment Method</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Add a new card or bank account
                </p>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Add Method
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}