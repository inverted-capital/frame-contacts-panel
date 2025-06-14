import { ChevronDown, SortAsc, Clock, Users } from 'lucide-react'
import { useState } from 'react'

export type SortOption = 'name' | 'lastSeen' | 'online'

interface SortDropdownProps {
  value: SortOption
  onChange: (option: SortOption) => void
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const sortOptions = [
    { value: 'name' as const, label: 'Name', icon: SortAsc },
    { value: 'lastSeen' as const, label: 'Last Seen', icon: Clock },
    { value: 'online' as const, label: 'Online First', icon: Users }
  ]
  
  const currentOption = sortOptions.find(option => option.value === value)
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {currentOption && <currentOption.icon className="w-4 h-4" />}
        Sort by {currentOption?.label}
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  value === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SortDropdown