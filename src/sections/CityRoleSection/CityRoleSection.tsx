const roles = [
  { label: "Enable jobs/innovation spaces", percentage: 94 },
  { label: "Promote SUMS locally", percentage: 86 },
  { label: "Celebrate innovation", percentage: 91 },
  { label: "Convene stakeholders", percentage: 90 },
]

export function CityRoleSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">City's Role</h2>

        <div className="max-w-3xl mx-auto space-y-8">
          {roles.map((role, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">{role.label}</span>
                <span className="text-orange-500 font-semibold">{role.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${role.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
