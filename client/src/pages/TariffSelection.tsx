import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap } from "lucide-react"
import { getTariffs, subscribeToPlan } from "@/api/tariffs"
import { useToast } from "@/hooks/useToast"

interface Tariff {
  id: string
  name: string
  price: number
  description: string
  popular: boolean
  features: string[]
}

export function TariffSelection() {
  const [tariffs, setTariffs] = useState<Tariff[]>([])
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState<string | null>(null)
  const { toast } = useToast()

  console.log('TariffSelection: Component mounted')

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        console.log('TariffSelection: Fetching tariffs')
        const response = await getTariffs() as any
        setTariffs(response.tariffs)
        console.log('TariffSelection: Tariffs loaded successfully')
      } catch (error) {
        console.error('TariffSelection: Error fetching tariffs:', error)
        toast({
          title: "Error",
          description: "Failed to load tariff plans",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTariffs()
  }, [toast])

  const handleSubscribe = async (tariffId: string) => {
    try {
      console.log('TariffSelection: Subscribing to plan:', tariffId)
      setSubscribing(tariffId)
      
      const response = await subscribeToPlan({
        tariffId,
        paymentMethod: 'card'
      }) as any

      if (response.success) {
        toast({
          title: "Success",
          description: "Successfully subscribed to plan!",
        })
      }
    } catch (error) {
      console.error('TariffSelection: Error subscribing:', error)
      toast({
        title: "Error",
        description: "Failed to subscribe to plan",
        variant: "destructive"
      })
    } finally {
      setSubscribing(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
          <p className="text-muted-foreground mt-2">Select the perfect plan for your business needs</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="glass-effect animate-pulse">
              <CardContent className="p-6">
                <div className="h-64 bg-white/10 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Select the perfect plan for your business needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tariffs.map((tariff) => (
          <Card 
            key={tariff.id} 
            className={`glass-effect card-hover relative ${
              tariff.popular ? 'border-primary/50 ring-2 ring-primary/20' : ''
            }`}
          >
            {tariff.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-bold">{tariff.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">${tariff.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {tariff.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {tariff.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tariff.popular 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                onClick={() => handleSubscribe(tariff.id)}
                disabled={subscribing === tariff.id}
              >
                {subscribing === tariff.id ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Get Started
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          All plans include 24/7 support and 30-day money-back guarantee
        </p>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>✓ No setup fees</span>
          <span>✓ Cancel anytime</span>
          <span>✓ Secure payments</span>
        </div>
      </div>
    </div>
  )
}