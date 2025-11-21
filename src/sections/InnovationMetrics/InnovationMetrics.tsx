import { Calendar, CheckCircle, Rocket, Users } from 'lucide-react'


const InnovationMetrics = () => {
  return (
   <>
     {/* Innovation Metrics */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Our Innovation Metrics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track our progress in driving innovation and successful project
              development. Each metric reflects our commitment to excellence and
              innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Rocket,
                number: "12",
                label: "Active Projects",
                description: "Ideas in development",
                color: "text-blue-600",
                bgColor: "bg-blue-50",
              },
              {
                icon: Users,
                number: "45+",
                label: "New Members",
                description: "Joined this quarter",
                color: "text-green-600",
                bgColor: "bg-green-50",
              },
              {
                icon: Calendar,
                number: "3-6",
                label: "Avg. Timeline",
                description: "Months to launch",
                color: "text-purple-600",
                bgColor: "bg-purple-50",
              },
              {
                icon: CheckCircle,
                number: "85%",
                label: "Success Rate",
                description: "Project completion",
                color: "text-orange-600",
                bgColor: "bg-orange-50",
              },
            ].map((metric, index) => (
              <div
                key={index}
                className={`${metric.bgColor} rounded-xl p-6 text-center`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-lg bg-white ${metric.color} flex items-center justify-center mb-4`}
                >
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {metric.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
   </>
  )
}

export default InnovationMetrics