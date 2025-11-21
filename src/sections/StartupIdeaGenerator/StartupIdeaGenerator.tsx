import React from 'react'
import { Button } from '../../components'
import { Search } from 'lucide-react'

const StartupIdeaGenerator = () => {
  return (
    <>
    
      {/* Startup Idea Generator Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Startup Idea Generator</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate innovative business ideas with AI and get instant feedback on their potential.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-border">
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Describe your interests or industry..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <Button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                  <Search className="w-5 h-5" />
                  
                </Button>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">J</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your AI-powered startup idea will appear here after you submit your interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section></>
  )
}

export default StartupIdeaGenerator