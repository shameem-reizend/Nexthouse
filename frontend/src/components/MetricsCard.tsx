import React from 'react'

interface MetricscardPropType {
    heading: string,
    value: number
}

export const MetricsCard: React.FC <MetricscardPropType> = ({heading, value}) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md dark:bg-gray-800 
    transition-transform duration-300 ease-in-out  hover:shadow-lg">
        <div className="text-base text-gray-400 dark:text-gray-300">
            {heading}
        </div>
        <div className="flex items-center pt-1">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
        </div>
        </div>
    </div>
  )
}
